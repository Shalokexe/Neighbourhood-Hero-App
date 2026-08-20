import math
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from services.credit_engine import calculate_completion_reward, get_hero_level
from services.ai_matcher import auto_categorize_mission

app = FastAPI(
    title="NEIGHBORHOOD HERO Python API",
    description="Python Microservice for Credit Engine, AI Task Categorization & Geospatial Intelligence",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CreditCalcRequest(BaseModel):
    base_reward: int
    urgency: str
    rating: float = 5.0
    is_first_gig: bool = False
    streak_count: int = 0

class AICategorizeRequest(BaseModel):
    title: str
    description: str

class GeoDistanceRequest(BaseModel):
    lat1: float
    lon1: float
    lat2: float
    lon2: float

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "NEIGHBORHOOD HERO Python Microservice",
        "region": "Kharar - Mohali - Chandigarh - Panchkula"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Python FastAPI"}

@app.post("/api/credit/calculate")
def calculate_credit(req: CreditCalcRequest):
    return calculate_completion_reward(
        base_reward=req.base_reward,
        urgency=req.urgency,
        rating=req.rating,
        is_first_gig=req.is_first_gig,
        streak_count=req.streak_count
    )

@app.post("/api/gigs/ai-categorize")
def categorize_gig(req: AICategorizeRequest):
    return auto_categorize_mission(req.title, req.description)

@app.post("/api/geo/distance")
def calculate_haversine_distance(req: GeoDistanceRequest):
    R = 6371  # Earth radius in km
    d_lat = math.radians(req.lat2 - req.lat1)
    d_lon = math.radians(req.lon2 - req.lon1)

    a = (math.sin(d_lat / 2) ** 2 +
         math.cos(math.radians(req.lat1)) * math.cos(math.radians(req.lat2)) *
         math.sin(d_lon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance_km = round(R * c, 2)

    return {"distance_km": distance_km}

@app.get("/api/leaderboard")
def get_tricity_leaderboard():
    return {
        "region": "Tricity (Kharar - Mohali - Chandigarh - Panchkula)",
        "leaderboard": [
            {"rank": 1, "name": "Arjun Mehta", "city": "Chandigarh", "level": 6, "credits": 2800},
            {"rank": 2, "name": "Simran Kaur", "city": "Mohali", "level": 5, "credits": 1450},
            {"rank": 3, "name": "Shalok Dadhwal", "city": "Kharar", "level": 4, "credits": 720}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
