from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ServiceCreate(BaseModel):
    name: str
    price: float = 0.0
    description: str = ""
    category: str = "general"
    is_active: bool = True


class ServiceRead(ServiceCreate):
    id: int
    created_at: datetime


class LeadCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=40)
    company: str = Field(default="", max_length=160)
    project_type: str = Field(default="general", max_length=80)
    notes: str = Field(default="", max_length=1000)
    source: str = Field(default="website", max_length=80)


class LeadRead(LeadCreate):
    id: int
    status: str
    created_at: datetime


class CustomerCreate(BaseModel):
    full_name: str
    company_name: str = ""
    email: EmailStr
    phone: str = ""
    segment: str = "new"
    status: str = "active"


class CustomerRead(CustomerCreate):
    id: int
    created_at: datetime


class OrderCreate(BaseModel):
    customer_id: int
    service_id: int
    amount: float = 0.0
    notes: str = ""


class OrderRead(OrderCreate):
    id: int
    status: str
    created_at: datetime


class TaskCreate(BaseModel):
    title: str
    assignee: str = "agent"
    status: str = "open"
    priority: str = "medium"
    due_date: str = ""
    notes: str = ""


class TaskRead(TaskCreate):
    id: int
    created_at: datetime


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    customer_name: str = "Customer"


class ChatResponse(BaseModel):
    reply: str
    suggestions: list[str]
