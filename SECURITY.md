# KHALIDAI Genesis

KHALIDAI هو تطبيق تجاري ذكي مبني على FastAPI، SQLite، وقوالب ويب عربية RTL. الهدف هو توفير منصة صغيرة لكنها عملية لإدارة المشاريع، العملاء، الخدمات، الطلبات، والمهام التشغيلية.

## الحالة الحالية

تم تنفيذ نسخة عمل أولية موجهة إلى الإنتاج من حيث الهيكل، API، قواعد البيانات، واجهة العميل، ولوحة التحكم الداخلية. التطبيق لا يطلب أي مفاتيح سرية في المحادثة ولا يحاكي أي خدمة خارجية.

## المكونات الأساسية

- FastAPI app
- SQLAlchemy models
- SQLite database stored locally
- Arabic RTL landing page
- Business dashboard
- Customer support page
- Lead and order APIs
- Chat endpoint with business-safe responses
- Automated tests for critical endpoints

## التشغيل

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

ثم افتح:

- http://localhost:8000/
- http://localhost:8000/dashboard
- http://localhost:8000/support
- http://localhost:8000/docs

## النهاية الرئيسية

- GET /health
- GET /api/services
- POST /api/leads
- GET /api/stats
- POST /api/chat

## المتغيرات البيئية

راجع `.env.example`.

## الأمان

- لا تتم كتابة الأسرار داخل التعليمات البرمجية.
- المدخلات محققة من خلال Pydantic.
- التخزين الإفتراضي SQLite مناسب للتطوير؛ في الإنتاج يستحسن استخدام PostgreSQL.
- يلزم اعتماد بشرية لكل قرار مالي أو تعويض أو عقد أو إطلاق عام.

## الاختبارات

```bash
pytest -q
```

## ملاحظات

هذا تنفيذ أولي عملي ومفترض على أنه نقطة بداية لواجهة أعمال كاملة. لا يوجد نشر فعلي أو اتصال خارجي حقيقي في هذه النسخة.
