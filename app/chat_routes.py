"""Chat endpoint with JBT integration."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.jbt_client import chat_with_jbt

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    """Chat request."""

    message: str = Field(..., min_length=1, max_length=2000)
    customer_name: str = "Guest"
    customer_email: Optional[str] = None
    include_business_context: bool = True


class ChatResponse(BaseModel):
    """Chat response."""

    reply: str
    suggestions: list[str]
    model_used: str = "jbt-v1"


@router.post("/")
async def chat_endpoint(request: ChatRequest) -> ChatResponse:
    """Send message to JBT chat and get response.

    Args:
        request: Chat request with message and context

    Returns:
        Chat response with reply and suggestions
    """
    try:
        # Get response from JBT
        business_context = (
            "You are KHALIDAI, a business operations AI for a professional services company. "
            "Respond professionally in Arabic and English. Always recommend human review for financial, "
            "contract, or refund decisions. Do not invent prices or promises."
        )
        reply = await chat_with_jbt(
            message=request.message,
            business_context=business_context if request.include_business_context else None,
        )

        # Generate contextual suggestions
        suggestions = generate_suggestions(request.message)

        return ChatResponse(
            reply=reply,
            suggestions=suggestions,
            model_used="jbt-v1",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chat service error: {str(e)}",
        )


def generate_suggestions(message: str) -> list[str]:
    """Generate contextual chat suggestions.

    Args:
        message: User message

    Returns:
        List of suggested follow-ups
    """
    message_lower = message.lower()

    if any(word in message_lower for word in ["سعر", "price", "cost", "pricing"]):
        return ["طلب عرض سعر", "مقارنة الخدمات", "تحديد موعد استشارة"]
    elif any(word in message_lower for word in ["خدمة", "service", "feature"]):
        return ["عرض جميع الخدمات", "التعرف على الفريق", "اطلب عرضًا"]
    elif any(word in message_lower for word in ["مساعدة", "help", "support"]):
        return ["التحدث مع الدعم", "عرض الأسئلة الشائعة", "إبلاغ عن مشكلة"]
    else:
        return [
            "هل لديك سؤال آخر؟",
            "استعرض خدماتنا",
            "تواصل مع فريقنا",
        ]


from typing import Optional
