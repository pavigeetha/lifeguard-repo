from fastapi import APIRouter
from services.health_service import HealthService

router = APIRouter()

@router.get("/health-signals")
def get_health_signals():
    """
    Returns simulated wearable health data
    """
    return HealthService.realtime_snapshot()

@router.get("/historical-dashboard")
def get_historical_dashboard():
    """
    Used by Historical Dashboard page (6 factors)
    """
    return HealthService.historical_snapshot()