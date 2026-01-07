import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from fastapi import APIRouter
from schemas.usermessage import user_message
from services.ai_service import generate_response

router = APIRouter()

@router.post("/user-message")
def return_reply(query : user_message):

    response = generate_response(query)
    return response
