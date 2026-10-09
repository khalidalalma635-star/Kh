"""Updated main app with JBT chat integration."""

from __future__ import annotations

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.config import settings
from app.database import SessionLocal, get_db, init_db
from app.models import AuditLog, Customer, Lead, Order, Service, Task
from app.schemas import (
    ChatRequest,
    ChatResponse,
    CustomerCreate,
    LeadCreate,
    OrderCreate,
    ServiceCreate,
    TaskCreate,
)

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="KHALIDAI - Business AI Platform with JBT Integration",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.on_event("startup")
def startup_event() -> None:
    init_db()
    seed_data()


def seed_data() -> None:
    db = SessionLocal()
    try:
        if db.query(Service).count() == 0:
            db.add_all(
                [
                    Service(
                        name="تطوير موقع إلكتروني",
                        price=1500.0,
                        description="مواقع احترافية ومتجاوبة مع الهاتف",
                        category="web",
                    ),
                    Service(
                        name="أتمتة الأعمال",
                        price=2200.0,
                        description="أتمتة سير العمل والعمليات الدورية",
                        category="automation",
                    ),
                    Service(
                        name="دعم عملاء ذكي",
                        price=1200.0,
                        description="مساعد AI لخدمة العملاء والاستفسارات",
                        category="support",
                    ),
                    Service(
                        name="سيو ومحتوى",
                        price=900.0,
                        description="تحسين محركات البحث والمحتوى التسويقي",
                        category="marketing",
                    ),
                ]
            )
        if db.query(Task).count() == 0:
            db.add_all(
                [
                    Task(
                        title="مراجعة عرض العميل الجديد",
                        assignee="sales",
                        status="open",
                        priority="high",
                        due_date="2026-10-12",
                    ),
                    Task(
                        title="تحديث صفحة الخدمات",
                        assignee="marketing",
                        status="in_progress",
                        priority="medium",
                        due_date="2026-10-13",
                    ),
                ]
            )
        db.commit()
    finally:
        db.close()


@app.get("/", response_class=HTMLResponse)
async def landing_page(request: Request):
    return templates.TemplateResponse(
        "landing.html", {"request": request, "app_name": settings.app_name}
    )


@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard_page(request: Request, db: Session = Depends(get_db)):
    stats = {
        "leads": db.query(Lead).count(),
        "customers": db.query(Customer).count(),
        "orders": db.query(Order).count(),
        "services": db.query(Service).count(),
    }
    return templates.TemplateResponse(
        "dashboard.html",
        {"request": request, "stats": stats, "app_name": settings.app_name},
    )


@app.get("/support", response_class=HTMLResponse)
async def support_page(request: Request):
    return templates.TemplateResponse(
        "support.html", {"request": request, "app_name": settings.app_name}
    )


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": settings.app_name,
        "environment": settings.environment,
        "ai_integration": "jbt-v1",
    }


@app.get("/api/services")
async def list_services(db: Session = Depends(get_db)):
    results = db.query(Service).order_by(Service.created_at.desc()).all()
    return [
        {
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "description": item.description,
            "category": item.category,
            "is_active": item.is_active,
        }
        for item in results
    ]


@app.post("/api/services", status_code=201)
async def create_service(payload: ServiceCreate, db: Session = Depends(get_db)):
    service = Service(**payload.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    db.add(
        AuditLog(
            actor="system",
            action="service_created",
            details=f"Created service: {service.name}",
        )
    )
    db.commit()
    return {"id": service.id, "name": service.name, "status": "created"}


@app.post("/api/leads", status_code=201)
async def create_lead(payload: LeadCreate, db: Session = Depends(get_db)):
    existing = db.query(Lead).filter(Lead.email == str(payload.email)).first()
    if existing:
        raise HTTPException(status_code=409, detail="Lead already exists")

    lead = Lead(**payload.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    db.add(
        AuditLog(
            actor="system",
            action="lead_created",
            details=f"Created lead {lead.full_name} from {lead.source}",
        )
    )
    db.commit()
    return {
        "id": lead.id,
        "status": lead.status,
        "message": "Lead received and queued for follow-up.",
    }


@app.get("/api/leads")
async def list_leads(db: Session = Depends(get_db)):
    return [
        {
            "id": lead.id,
            "full_name": lead.full_name,
            "email": lead.email,
            "phone": lead.phone,
            "company": lead.company,
            "source": lead.source,
            "status": lead.status,
            "project_type": lead.project_type,
            "created_at": lead.created_at.isoformat(),
        }
        for lead in db.query(Lead).order_by(Lead.created_at.desc()).all()
    ]


@app.post("/api/customers", status_code=201)
async def create_customer(payload: CustomerCreate, db: Session = Depends(get_db)):
    customer = Customer(**payload.model_dump())
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return {"id": customer.id, "status": "created", "full_name": customer.full_name}


@app.get("/api/customers")
async def list_customers(db: Session = Depends(get_db)):
    return [
        {
            "id": customer.id,
            "full_name": customer.full_name,
            "company_name": customer.company_name,
            "email": customer.email,
            "phone": customer.phone,
            "segment": customer.segment,
            "status": customer.status,
            "created_at": customer.created_at.isoformat(),
        }
        for customer in db.query(Customer).order_by(Customer.created_at.desc()).all()
    ]


@app.post("/api/orders", status_code=201)
async def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == payload.customer_id).first()
    service = db.query(Service).filter(Service.id == payload.service_id).first()
    if not customer or not service:
        raise HTTPException(status_code=404, detail="Customer or service not found")

    order = Order(
        customer_id=payload.customer_id,
        service_id=payload.service_id,
        amount=payload.amount or service.price,
        notes=payload.notes,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return {"id": order.id, "status": order.status, "amount": order.amount}


@app.get("/api/stats")
async def stats(db: Session = Depends(get_db)):
    return {
        "leads": db.query(Lead).count(),
        "customers": db.query(Customer).count(),
        "orders": db.query(Order).count(),
        "revenue": round(sum(item.amount for item in db.query(Order).all()), 2),
        "services": db.query(Service).count(),
        "tasks": db.query(Task).count(),
    }


@app.get("/api/tasks")
async def list_tasks(db: Session = Depends(get_db)):
    return [
        {
            "id": item.id,
            "title": item.title,
            "assignee": item.assignee,
            "status": item.status,
            "priority": item.priority,
            "due_date": item.due_date,
            "notes": item.notes,
        }
        for item in db.query(Task).order_by(Task.created_at.desc()).all()
    ]


@app.post("/api/tasks", status_code=201)
async def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    task = Task(**payload.model_dump())
    db.add(task)
    db.commit()
    db.refresh(task)
    return {"id": task.id, "title": task.title, "status": task.status}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    """Chat endpoint - responds with predefined business responses.
    
    Note: JBT integration requires API key. Without it, fallback to template responses.
    """
    message = payload.message.strip().lower()
    api_key = os.getenv("JBT_API_KEY")

    if api_key:
        # Use real JBT if API key available
        try:
            from app.jbt_client import chat_with_jbt

            reply = await chat_with_jbt(
                message=payload.message,
                api_key=api_key,
                business_context="You are KHALIDAI, a business operations AI. Respond professionally in Arabic and English.",
            )
        except Exception:
            reply = fallback_response(message, payload.customer_name)
    else:
        # Fallback to template responses
        reply = fallback_response(message, payload.customer_name)

    suggestions = generate_chat_suggestions(message)
    return ChatResponse(reply=reply, suggestions=suggestions, model_used="jbt-v1")


def fallback_response(message: str, customer_name: str) -> str:
    """Generate fallback response when JBT API unavailable."""
    if any(word in message for word in ["سعر", "price", "pricing"]):
        return (
            "أسعار خدماتنا تبدأ من 900 دولار أمريكي حسب نوع الخدمة والمدة المطلوبة. "
            "أستطيع إعداد عرض سعر مخصص بعد معرفة تفاصيل مشروعك."
        )
    elif any(word in message for word in ["مساعدة", "help", "استفسار", "question"]):
        return (
            "أنا مساعد KHALIDAI للتشغيل التجاري. أستطيع مساعدتك في إدارة الخدمات والطلبات "
            "والمهام والعملاء. كيف يمكنني مساعدتك اليوم؟"
        )
    elif any(word in message for word in ["خدمة", "service"]):
        return (
            "خدماتنا تشمل: تطوير المواقع، الأتمتة، دعم العملاء، التسويق الرقمي، واستشارات الأعمال. "
            "يمكنني مساعدتك في اختيار الحل المناسب لاحتياجاتك."
        )
    else:
        return (
            f"مرحبًا {customer_name}، تم استلام رسالتك. سأقوم بمراجعتها مع فريق التشغيل "
            "وإبلاغك بالخطوة المناسبة. ملاحظة: القرارات المالية تتطلب موافقة بشرية صريحة."
        )


def generate_chat_suggestions(message: str) -> list[str]:
    """Generate contextual suggestions."""
    if any(word in message for word in ["سعر", "price", "cost"]):
        return ["طلب عرض سعر", "مقارنة الخدمات", "تحديد موعد"]
    elif any(word in message for word in ["خدمة", "service"]):
        return ["عرض الخدمات", "الاستشارة المجانية", "اطلب عرضًا"]
    else:
        return ["استعرض الخدمات", "تحدث مع الدعم", "اطلب عرضًا"]


import os


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
