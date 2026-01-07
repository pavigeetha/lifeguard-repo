import math
import random
from datetime import datetime

def clamp(v, min_v, max_v):
    return max(min_v, min(max_v, v))


class HealthService:

    # ---------- Realtime (24h) ----------
    @staticmethod
    def heart_rate_24h():
        return [
            {
                "time": f"{h:02d}:00",
                "value": round(clamp(70 + math.sin(h / 24 * 2 * math.pi) * 10 + random.uniform(-3, 3), 55, 95))
            }
            for h in range(24)
        ]

    @staticmethod
    def activity_24h():
        return [
            {
                "time": f"{h:02d}:00",
                "value": round(random.uniform(40, 80) if 6 <= h <= 22 else random.uniform(5, 15))
            }
            for h in range(24)
        ]

    @staticmethod
    def blood_pressure_12h():
        return [
            {
                "time": f"{h:02d}:00",
                "systolic": round(clamp(120 + random.uniform(-10, 10), 100, 140)),
                "diastolic": round(clamp(78 + random.uniform(-6, 6), 65, 90))
            }
            for h in range(0, 24, 2)
        ]

    @staticmethod
    def sleep_quality():
        return {
            "deep": round(random.uniform(1.5, 2.5), 1),
            "light": round(random.uniform(3.5, 4.5), 1),
            "rem": round(random.uniform(1.0, 2.0), 1),
            "awake": round(random.uniform(0.2, 0.6), 1),
            "total": 9.0
        }

    # ---------- Historical (7 days) ----------
    @staticmethod
    def spo2_24h():
        return [
            {
                "time": f"{h:02d}:00",
                "value": round(clamp(97 + math.sin(h / 24 * 2 * math.pi) * 2 + random.uniform(-0.5, 0.5), 93, 100), 1)
            }
            for h in range(24)
        ]

    @staticmethod
    def daily_steps():
        days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        return [
            {
                "day": d,
                "steps": round(random.uniform(6500, 11500))
            }
            for d in days
        ]

    @staticmethod
    def stress_24h():
        return [
            {
                "time": f"{h:02d}:00",
                "value": round(clamp(40 + math.sin(h / 24 * 2 * math.pi) * 20 + random.uniform(-5, 5), 10, 90))
            }
            for h in range(24)

        ]

    @staticmethod
    def calculate_risk_score(heart_rate, sleep):
        avg_hr = sum(h["value"] for h in heart_rate) / len(heart_rate)
        sleep_quality = (
        sleep["deep"] * 1.5 +
        sleep["light"] * 1.0 +
        sleep["rem"] * 1.2
    )

    # Normalize sleep quality to ~100
        sleep_score = min((sleep_quality / 8.5) * 100, 100)

        risk = (avg_hr - 60) * 2 + (85 - sleep_score) * 1.5
        return max(0, min(100, round(risk)))

    # ---------- Snapshots ----------
    @staticmethod
    def realtime_snapshot():
        heart_rate = HealthService.heart_rate_24h()
        activity = HealthService.activity_24h()
        blood_pressure = HealthService.blood_pressure_12h()
        sleep = HealthService.sleep_quality()

        return {
                "heartRate": heart_rate,
                "activity": activity,
                "bloodPressure": blood_pressure,
                "sleep": sleep,
                "riskScore": HealthService.calculate_risk_score(
                    heart_rate,
                    sleep
                )
            }


    @staticmethod
    def historical_snapshot():
        return {
            "heartRate": HealthService.heart_rate_24h(),
            "spo2": HealthService.spo2_24h(),
            "sleep": HealthService.sleep_quality(),
            "steps": HealthService.daily_steps(),
            "bloodPressure": HealthService.blood_pressure_12h(),
            "stress": HealthService.stress_24h(),
            "timestamp": datetime.utcnow().isoformat()
        }
