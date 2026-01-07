from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.ai_analysis_controller import router as ai_router
from controllers.generatepdf_controller import router as pdf_router
from controllers.health_controller import router as health_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 👈 your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/lg")
app.include_router(pdf_router, prefix="/lg")
app.include_router(health_router, prefix="/api")