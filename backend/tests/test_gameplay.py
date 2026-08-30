import sys
import os
import uuid
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_full_gameplay_flow():
    uid = str(uuid.uuid4())[:8]
    email = f"alpha_{uid}@mythverse.com"
    username = f"alpha_{uid}"

    # 1. Register User
    reg_res = client.post("/api/v1/auth/register", json={
        "username": username,
        "email": email,
        "password": "my-worldos-password-123"
    })
    assert reg_res.status_code == 200
    token = reg_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Get User Profile
    me_res = client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["username"] == username

    # 3. Synchronize Save State
    sync_res = client.post("/api/v1/auth/sync-save", headers=headers, json={
        "save_version": 1,
        "game_state": {
            "username": username,
            "level": 5,
            "xp": 1250,
            "coins": 450,
            "unlockedCodexIds": ["char_athena", "pantheon_sentinel"],
            "characterAffinities": {"char_athena": {"level": "Ally", "xp": 120}}
        }
    })
    assert sync_res.status_code == 200

    # 4. Load Save State
    load_res = client.get("/api/v1/auth/load-save", headers=headers)
    assert load_res.status_code == 200
    save_data = load_res.json()["game_state"]
    assert save_data["level"] == 5
    assert "char_athena" in save_data["unlockedCodexIds"]

    # 5. Combat Action Resolution
    combat_res = client.post("/api/v1/combat/action", json={
        "battleId": "b_101",
        "creatureId": "typhon",
        "actionType": "exploit_weakness"
    })
    assert combat_res.status_code == 200
    c_data = combat_res.json()
    assert c_data["playerDamage"] > 0

    # 6. External Lore Fetch
    lore_res = client.get("/api/v1/lore/external/Athena")
    assert lore_res.status_code == 200
    assert "Athena" in lore_res.json()["name"]
