from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import os
from src.agents.autonomous_agent import AutonomousAgent

app = FastAPI(title="Missing Persons AI Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent_orchestrator = AutonomousAgent()

class RegistrationRequest(BaseModel):
    name: str
    relation: str = "Unknown"
    date_missing: str = ""
    last_seen: str = ""
    mobile: str = ""
    age: str = ""
    languages: str = ""
    district: str = ""
    police_station: str = ""
    mental_health: str = "Normal"
    image_url: str = ""

@app.post("/api/search")
async def search_person(file: UploadFile = File(...)):
    contents = await file.read()
    result = agent_orchestrator.handle_search_request(file_bytes=contents)
    return result

@app.post("/api/register")
async def register_person(details: RegistrationRequest):
    result = agent_orchestrator.reg_agent.register_person({
        "Name": details.name,
        "Relation": details.relation,
        "Date Missing From": details.date_missing,
        "Last seen": details.last_seen,
        "mobile numbers": details.mobile,
        "age": details.age,
        "Languages Known": details.languages,
        "District": details.district,
        "Police Station AreaArea": details.police_station,
        "Mental Health Status": details.mental_health,
        "Case Registered": "Pending",
        "Person Image web Link": details.image_url
    })
    return result

# IMPORTANT: Mount static files AFTER all API routes
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("src.main:app", host="0.0.0.0", port=port, reload=True)
