from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    save_state = relationship("SaveState", back_populates="user", uselist=False, cascade="all, delete-orphan")

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    origin = Column(String(50), default="Scholar of Delphi")
    pantheon = Column(String(50), default="greek")
    title = Column(String(50), default="Mythwalker")
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    coins = Column(Integer, default=200)
    divine_essence = Column(Integer, default=0)
    oracle_tokens = Column(Integer, default=5)
    daily_streak = Column(Integer, default=0)
    attributes = Column(JSON, default={
        "strength": 10, "wisdom": 10, "insight": 10, "endurance": 10,
        "agility": 10, "spirit": 10, "luck": 10, "mythicAffinity": 10
    })

    user = relationship("User", back_populates="profile")

class SaveState(Base):
    __tablename__ = "save_states"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    save_version = Column(Integer, default=1)
    game_state = Column(JSON, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="save_state")
