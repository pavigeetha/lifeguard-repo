from google import genai
from datetime import datetime
import time
from schemas.usermessage import user_message

client = genai.Client(api_key = "")

def generate_response(query : user_message):

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents= '''You are an AI health explanation assistant for a system called LifeGuard.
You do NOT diagnose medical conditions. 
Your job is to clearly explain health risk trends in simple language and suggest safe, general actions.

{
  "heartRateTrend": "gradually increasing over the last 4 hours",
  "hrvTrend": "decreasing, showing stress buildup",
  "sleepTrend": "sleep duration reduced for 2 days",
  "activityTrend": "lower than usual",
  "stressTrend": "moderate and fluctuating",
  "riskScore": 68,
  "state": "Pre-Anomaly"
}
Give it to me as a paragraph with consistent font''' +query.text,
    )

    ai_response = user_message(id=str(int(time.time() * 1000) + 1),
        type="ai",
        text=response.text,   # Gemini response
        timestamp=datetime.now())
    
    return ai_response
