import sys
import os
import uuid
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_register_and_login():
    uid = str(uuid.uuid4())[:8]
    email = f"test_{uid}@mythverse.com"
    username = f"walker_{uid}"

    # Register
    reg_res = client.post("/api/v1/auth/register", json={
        "username": username,
        "email": email,
        "password": "my-worldos-password-123"
    })
    assert reg_res.status_code == 200
    token = reg_res.json()["access_token"]
    assert token is not None

    # Login
    log_res = client.post("/api/v1/auth/login", json={
        "email": email,
        "password": "my-worldos-password-123"
    })
    assert log_res.status_code == 200
    assert "access_token" in log_res.json()

def test_combat_action():
    res = client.post("/api/v1/combat/action", json={
        "battleId": "test_b1",
        "creatureId": "pantheon_sentinel",
        "actionType": "attack"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["playerDamage"] > 0
    assert len(data["battleLog"]) > 0
