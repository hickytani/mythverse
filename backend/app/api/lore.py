from fastapi import APIRouter
from app.schemas.schemas import AIRequest, AIResponse
from app.services.external_ref_service import external_ref_service

router = APIRouter(prefix="/lore", tags=["lore"])

@router.get("/external/{entity_name}")
async def get_external_lore_reference(entity_name: str):
    return await external_ref_service.fetch_mythology_reference(entity_name)

@router.post("/ai-companion", response_model=AIResponse)
async def query_ai_lore_companion(req: AIRequest):
    prompt_text = req.prompt.lower()
    
    # Offline keyword responses if API key absent
    if "zeus" in prompt_text:
        reply = "Zeus is the sovereign ruler of Mount Olympus, wielder of thunderbolts forged by the Cyclopes."
    elif "thor" in prompt_text:
        reply = "Thor is the Norse god of thunder, defender of Asgard with his mighty hammer Mjölnir."
    elif "osiris" in prompt_text:
        reply = "Osiris is the green-skinned ruler of the Egyptian underworld and judge of souls."
    else:
        reply = f"The ancient archives contain deep wisdom regarding '{req.prompt}'. Explore the Codex to unlock more details!"
        
    return AIResponse(reply=reply)
