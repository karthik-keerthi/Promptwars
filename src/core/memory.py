import json
import os
import random

class MemoryStore:
    """
    Simulates a Vector Store (like Google Vertex AI Vector Search) 
    using the local JSON dataset for the hackathon.
    """
    def __init__(self, data_path="data/knowledge_base/missing_persons.json"):
        self.data_path = data_path
        self.records = []
        self._load_data()

    def _load_data(self):
        if os.path.exists(self.data_path):
            with open(self.data_path, 'r') as f:
                self.records = json.load(f)
        else:
            print(f"Warning: {self.data_path} not found.")

    def add_record(self, record: dict):
        # Assign a registration number if needed
        if "Registration Number" not in record or not record["Registration Number"]:
            max_reg = max([int(r.get("Registration Number", 0)) for r in self.records]) if self.records else 10000
            record["Registration Number"] = str(max_reg + 1)
            
        self.records.append(record)
        with open(self.data_path, 'w') as f:
            json.dump(self.records, f, indent=4)
        return record

    def search_image(self, image_data=None, image_url=None):
        """
        Simulate an image embedding search.
        In reality, this would embed the image and do a cosine similarity search in FAISS/Pinecone/Vertex.
        For demonstration, we randomly determine if there's a match.
        """
        # Hackathon Sim: 50% chance a high confidence match is found from DB if no specific logic
        # If we had real face encodings, we'd compare the distance.
        if not self.records:
            return []

        match_chance = random.random()
        if match_chance > 0.5:
            # Found a good match
            match = random.choice(self.records)
            return [{"record": match, "confidence": round(random.uniform(0.85, 0.99), 2)}]
        elif match_chance > 0.2:
            # Low confidence match
            match = random.choice(self.records)
            return [{"record": match, "confidence": round(random.uniform(0.40, 0.75), 2)}]
        else:
            return []
