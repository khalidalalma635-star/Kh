"""Chat integration with JBT (Jailbreak-free Business Thinking) AI model."""

import os
from typing import Optional

import httpx
from pydantic import BaseModel, Field


class JBTMessage(BaseModel):
    """Message for JBT API."""

    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class JBTRequest(BaseModel):
    """Request payload for JBT."""

    messages: list[JBTMessage]
    model: str = "jbt-v1"
    temperature: float = 0.7
    max_tokens: int = 500


class JBTResponse(BaseModel):
    """Response from JBT API."""

    id: str
    choices: list[dict]
    usage: dict


class JBTChatClient:
    """Client for JBT Chat API."""

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        """Initialize JBT client.

        Args:
            api_key: JBT API key (defaults to JBT_API_KEY env var)
            base_url: JBT API base URL (defaults to JBT_BASE_URL env var)
        """
        self.api_key = api_key or os.getenv("JBT_API_KEY", "")
        self.base_url = base_url or os.getenv("JBT_BASE_URL", "https://api.jbt.ai/v1")
        self.client = httpx.AsyncClient(
            headers={"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
        )

    async def send_message(
        self,
        message: str,
        context: Optional[list[dict]] = None,
        temperature: float = 0.7,
        max_tokens: int = 500,
    ) -> str:
        """Send message to JBT and get response.

        Args:
            message: User message
            context: Optional conversation history
            temperature: Response creativity (0-1)
            max_tokens: Max response length

        Returns:
            Assistant response text
        """
        messages = context or []
        messages.append({"role": "user", "content": message})

        payload = {
            "messages": messages,
            "model": "jbt-v1",
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        try:
            response = await self.client.post(f"{self.base_url}/chat/completions", json=payload)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"] if data["choices"] else "No response"
        except httpx.HTTPError as e:
            return f"Error communicating with JBT: {str(e)}"

    async def close(self):
        """Close HTTP client."""
        await self.client.aclose()


async def chat_with_jbt(
    message: str,
    api_key: Optional[str] = None,
    business_context: Optional[str] = None,
) -> str:
    """Helper function to chat with JBT.

    Args:
        message: User message
        api_key: Optional JBT API key
        business_context: Optional business info to inject into prompt

    Returns:
        JBT response
    """
    client = JBTChatClient(api_key=api_key)
    try:
        # Inject business context if provided
        if business_context:
            full_message = f"Business Context: {business_context}\n\nUser Question: {message}"
        else:
            full_message = message

        response = await client.send_message(full_message)
        return response
    finally:
        await client.close()
