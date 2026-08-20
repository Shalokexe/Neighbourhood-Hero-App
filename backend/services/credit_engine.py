import math
from typing import Dict, List, Any

HERO_LEVELS = [
    {"level": 1, "name": "New Hero", "min_credits": 0},
    {"level": 2, "name": "Local Helper", "min_credits": 100},
    {"level": 3, "name": "Neighborhood Hero", "min_credits": 250},
    {"level": 4, "name": "Active Hero", "min_credits": 500},
    {"level": 5, "name": "Super Helper", "min_credits": 1000},
    {"level": 6, "name": "Community Star", "min_credits": 2000},
    {"level": 7, "name": "Area Champion", "min_credits": 3500},
    {"level": 8, "name": "City Hero", "min_credits": 5000},
    {"level": 9, "name": "Community Legend", "min_credits": 7500},
    {"level": 10, "name": "Neighborhood Guardian", "min_credits": 10000},
]

def calculate_completion_reward(base_reward: int, urgency: str, rating: float, is_first_gig: bool = False, streak_count: int = 0) -> Dict[str, Any]:
    """
    Python Deterministic Credit Calculation Engine
    """
    base_credits = max(base_reward or 20, 10)
    bonus_credits = 0
    breakdown = []

    if urgency == "URGENT":
        bonus_credits += 5
        breakdown.append({"reason": "Urgent Mission Bonus", "amount": 5})

    if rating >= 5.0:
        bonus_credits += 5
        breakdown.append({"reason": "5-Star Review Bonus", "amount": 5})

    if is_first_gig:
        bonus_credits += 10
        breakdown.append({"reason": "First Mission Completion Bonus", "amount": 10})

    if streak_count > 0 and streak_count % 3 == 0:
        bonus_credits += 5
        breakdown.append({"reason": "3-Mission Streak Bonus 🔥", "amount": 5})

    total = base_credits + bonus_credits
    return {
        "base_credits": base_credits,
        "bonus_credits": bonus_credits,
        "total_awarded": total,
        "breakdown": breakdown
    }

def get_hero_level(lifetime_credits: int) -> Dict[str, Any]:
    """
    Determines Hero Level from lifetime credits
    """
    current_level = HERO_LEVELS[0]
    next_level = HERO_LEVELS[1]

    for lvl in reversed(HERO_LEVELS):
        if lifetime_credits >= lvl["min_credits"]:
            current_level = lvl
            idx = HERO_LEVELS.index(lvl)
            next_level = HERO_LEVELS[idx + 1] if idx + 1 < len(HERO_LEVELS) else lvl
            break

    is_max = current_level["level"] == HERO_LEVELS[-1]["level"]
    current_min = current_level["min_credits"]
    next_min = next_level["min_credits"]

    range_diff = next_min - current_min
    progress = 100 if range_diff <= 0 else min(max(round(((lifetime_credits - current_min) / range_diff) * 100), 0), 100)

    return {
        "level": current_level["level"],
        "level_name": current_level["name"],
        "current_xp": lifetime_credits,
        "next_level_xp": lifetime_credits if is_max else next_min,
        "progress_percent": 100 if is_max else progress
    }
