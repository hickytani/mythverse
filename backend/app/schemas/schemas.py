from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any, List

# --- AUTH SCHEMAS ---

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    email: str

class UserProfileSchema(BaseModel):
    username: str
    origin: str
    pantheon: str
    title: str
    level: int
    xp: int
    coins: int
    divineEssence: int
    oracleTokens: int
    dailyStreak: int
    attributes: Dict[str, int]

# --- GAME ENGINE SCHEMAS ---

class SaveSyncRequest(BaseModel):
    save_version: int = 1
    game_state: Dict[str, Any]

class BattleActionRequest(BaseModel):
    battleId: str
    creatureId: str
    actionType: str # 'attack' | 'defend' | 'ability' | 'exploit_weakness'
    answerGiven: Optional[str] = None

class BattleActionResponse(BaseModel):
    playerDamage: int
    enemyDamage: int
    playerHpRemaining: int
    enemyHpRemaining: int
    battleLog: List[str]
    isFinished: bool
    victory: bool
    rewards: Optional[Dict[str, Any]] = None

class AIRequest(BaseModel):
    prompt: str
    history: Optional[List[Dict[str, Any]]] = None
    playerContext: Optional[Dict[str, Any]] = None

class AIResponse(BaseModel):
    reply: str
