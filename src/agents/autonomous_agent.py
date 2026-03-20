from src.core.memory import MemoryStore
import random

class IdentificationAgent:
    def __init__(self):
        self.memory = MemoryStore()
        # Simulated threshold config
        self.confidence_threshold = 0.80

    def process_image(self, file_bytes=None, filename=None):
        # 1. Ask memory for matches (simulated Vector Search)
        matches = self.memory.search_image()
        
        if not matches:
            return {"status": "NO_MATCH", "message": "No match found in local database."}
        
        best_match = matches[0]
        if best_match["confidence"] >= self.confidence_threshold:
            return {"status": "MATCH_FOUND", "data": best_match["record"], "confidence": best_match["confidence"]}
        else:
            return {"status": "LOW_CONFIDENCE", "data": best_match["record"], "confidence": best_match["confidence"]}

class WebSearchAgent:
    def __init__(self):
        pass

    def search_live_web(self, image_data=None):
        """
        Simulates searching Google Custom Search or similar for an image.
        """
        # For hackathon simulation: randomly find something on web
        if random.random() > 0.5:
            return {
                "status": "WEB_MATCH_FOUND",
                "source": "News website / Social Media",
                "link": "https://example-news.com/missing-person-found",
                "extracted_info": "Possible match spotted near Sector 14"
            }
        return {"status": "NO_WEB_MATCH", "message": "No real-time web info found."}

class RegistrationAgent:
    def __init__(self):
        self.memory = MemoryStore()

    def register_person(self, details: dict):
        new_record = self.memory.add_record(details)
        return {"status": "REGISTERED", "data": new_record}

class AutonomousAgent:
    """
    Orchestrates the pipeline based on user rules.
    1. Search local DB (Vector Store)
    2. If found, return.
    3. Else, search Web.
    4. If Web found, return.
    5. Else, prompt for registration.
    """
    def __init__(self):
        self.id_agent = IdentificationAgent()
        self.web_agent = WebSearchAgent()
        self.reg_agent = RegistrationAgent()

    def handle_search_request(self, file_bytes=None):
        db_result = self.id_agent.process_image()
        
        if db_result["status"] == "MATCH_FOUND":
            return {"workflow": "db_search", "result": db_result}
            
        # Fall back to web search
        web_result = self.web_agent.search_live_web()
        if web_result["status"] == "WEB_MATCH_FOUND":
            return {"workflow": "web_search", "result": web_result, "db_near_match": db_result.get("data", None)}
            
        # Require registration
        return {
            "workflow": "registration_required", 
            "message": "Person not found in Database or Web. Please register this person.",
            "db_near_match": db_result.get("data", None)
        }
