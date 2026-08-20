from typing import Dict, Any

CATEGORY_KEYWORDS = {
    "Groceries": ["groceries", "market", "vegetables", "milk", "food", "supermarket", "store"],
    "Tutoring": ["tutor", "python", "math", "physics", "teach", "study", "exam", "books", "class"],
    "Pets": ["dog", "cat", "pet", "walking", "puppy", "litter", "animal"],
    "Tech Help": ["wifi", "laptop", "pc", "software", "printer", "xcode", "code", "install", "macbook"],
    "Repairs": ["fix", "door", "mirror", "screw", "repair", "assemble", "ikea", "desk"],
    "Moving/Carrying": ["heavy", "carry", "luggage", "boxes", "sofa", "furniture", "move", "shift"],
    "Delivery/Pickup": ["pickup", "deliver", "document", "package", "parcel", "cake", "bring"],
    "Household": ["water", "plants", "clean", "fold", "dishes", "house", "バルコニー"],
    "Local Business": ["flyers", "photography", "photos", "store", "boutique", "inventory", "packaging"]
}

def auto_categorize_mission(title: str, description: str) -> Dict[str, Any]:
    """
    AI Smart Categorizer & Credit Estimator in Python
    """
    text = (title + " " + description).lower()
    suggested_category = "Other"
    max_matches = 0

    for cat, keywords in CATEGORY_KEYWORDS.items():
        matches = sum(1 for kw in keywords if kw in text)
        if matches > max_matches:
            max_matches = matches
            suggested_category = cat

    # Estimate Credits based on length and keywords
    suggested_credits = 25
    if any(w in text for w in ["quick", "small", "10 min", "15 min"]):
        suggested_credits = 10
    elif any(w in text for w in ["heavy", "tutor", "code", "1 hour", "assemble"]):
        suggested_credits = 35
    elif any(w in text for w in ["2 hours", "photograph", "large"]):
        suggested_credits = 50

    return {
        "suggested_category": suggested_category,
        "suggested_credits": suggested_credits,
        "confidence_score": min(0.5 + (max_matches * 0.15), 0.98)
    }
