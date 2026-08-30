from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User, UserProfile, SaveState
from app.schemas.schemas import UserRegister, UserLogin, TokenResponse, UserProfileSchema, SaveSyncRequest
from app.services.auth_service import verify_password, get_password_hash, create_access_token, decode_access_token

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token"
        )
    user = db.query(User).filter(User.email == payload["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/register", response_model=TokenResponse)
def register_user(req: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter((User.email == req.email) | (User.username == req.username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    hashed_pw = get_password_hash(req.password)
    user = User(username=req.username, email=req.email, hashed_password=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)

    # Initial profile
    profile = UserProfile(user_id=user.id, origin="Scholar of Delphi", pantheon="greek")
    db.add(profile)
    db.commit()

    token = create_access_token({"sub": user.email, "username": user.username})
    return TokenResponse(access_token=token, username=user.username, email=user.email)

@router.post("/login", response_model=TokenResponse)
def login_user(req: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": user.email, "username": user.username})
    return TokenResponse(access_token=token, username=user.username, email=user.email)

@router.get("/me")
def get_user_profile(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == user.id).first()
    return {
        "username": user.username,
        "email": user.email,
        "profile": profile
    }

@router.post("/sync-save")
def sync_save_state(req: SaveSyncRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    save = db.query(SaveState).filter(SaveState.user_id == user.id).first()
    if not save:
        save = SaveState(user_id=user.id, save_version=req.save_version, game_state=req.game_state)
        db.add(save)
    else:
        save.save_version = req.save_version
        save.game_state = req.game_state
    db.commit()
    return {"status": "success", "message": "Save state synchronized"}

@router.get("/load-save")
def load_save_state(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    save = db.query(SaveState).filter(SaveState.user_id == user.id).first()
    if not save:
        return {"status": "empty", "game_state": None}
    return {"status": "success", "save_version": save.save_version, "game_state": save.game_state}
