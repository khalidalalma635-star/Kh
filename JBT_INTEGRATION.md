# KHALIDAI with JBT Chat Integration

KHALIDAI is now integrated with **JBT (Jailbreak-free Business Thinking)** for intelligent customer support and business operations automation.

## What's New

✅ **JBT Chat Integration**
- Real-time chat with JBT AI model
- Arabic and English support
- Business-safe responses
- Context-aware suggestions

✅ **Fallback Responses**
- Template-based responses when JBT API unavailable
- No errors - seamless degradation
- Professional business communication

## Quick Start

### 1. Get JBT API Key

```bash
# Sign up for JBT at https://jbt.ai
# Get your API key from dashboard
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add:
JBT_API_KEY="your-api-key-here"
JBT_BASE_URL="https://api.jbt.ai/v1"
```

### 3. Run Application

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 4. Test Chat

```bash
# Send a message via API
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "أحتاج إلى عرض سعر لموقع تجاري",
    "customer_name": "أحمد"
  }'
```

## Features

### API Endpoints

- `POST /api/chat` - Send message to JBT (with fallback)
- `GET /api/services` - List services
- `POST /api/leads` - Create lead
- `GET /api/customers` - List customers
- `POST /api/orders` - Create order
- `GET /api/stats` - Business metrics

### User Interfaces

- `/` - Landing page
- `/dashboard` - Business metrics
- `/support` - Customer support chat
- `/docs` - API documentation

## How JBT Chat Works

1. **User sends message** via `/api/chat`
2. **System checks for JBT API key**
3. **If available:** Send to JBT and get intelligent response
4. **If unavailable:** Return professional template response
5. **Generate suggestions** based on message content
6. **Return response** with reply and suggestions

## Example Chat Flow

```
User: "أحتاج عرض سعر لموقع إلكتروني"

System (with JBT):
- Sends to JBT API
- Receives intelligent, contextual response
- Returns professional business reply

Suggestions:
- "طلب عرض سعر"
- "مقارنة الخدمات"
- "تحديد موعد استشارة"
```

## Architecture

```
User Request
    ↓
Chat Endpoint (/api/chat)
    ↓
Check JBT API Key
    ↓
Yes → Call JBT API → Get Intelligent Response
    ↓
No → Use Template Response
    ↓
Generate Suggestions
    ↓
Return ChatResponse
```

## Error Handling

- JBT API unavailable → Use template responses
- Invalid message → Validation error
- Database error → 500 error with details
- Missing fields → 422 validation error

## Security & Compliance

✅ **Environment-based secrets**
- API keys never in code
- JBT_API_KEY from .env only

✅ **Input validation**
- Pydantic schemas on all inputs
- Message length limits (1-2000 chars)

✅ **Business rules**
- Financial decisions require human approval
- No contracts without human review
- No refunds without explicit approval

## Project Structure

```
app/
├── main.py              # FastAPI app with JBT chat
├── jbt_client.py        # JBT API client
├── chat_routes.py       # Chat endpoint (optional modular)
├── config.py            # Settings
├── database.py          # SQLAlchemy
├── models.py            # ORM models
└── schemas.py           # Pydantic schemas

templates/
├── landing.html
├── dashboard.html
└── support.html

static/
└── styles.css

requirements.txt
.env.example
STATUS.md
SECURITY.md
```

## Next Steps

1. ✅ Get JBT API key
2. ✅ Set environment variable
3. ✅ Run application
4. ✅ Test chat endpoint
5. ✅ Deploy to production

## Support

- **JBT Docs:** https://docs.jbt.ai
- **API Status:** `/health` endpoint
- **Chat Logs:** Console output

---

**Repository:** https://github.com/khalidalalma635-star/Kh  
**Branch:** `build/khalidai-core`  
**Status:** ✅ Ready with JBT Integration  

*Built with FastAPI, SQLAlchemy, and JBT AI for business operations.*
