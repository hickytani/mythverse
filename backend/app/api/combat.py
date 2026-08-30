from fastapi import APIRouter
from app.schemas.schemas import BattleActionRequest, BattleActionResponse
import random

router = APIRouter(prefix="/combat", tags=["combat"])

# Data-driven creature base stat lookup
CREATURE_STATS = {
    "pantheon_sentinel": {"name": "Pantheon Sentinel", "hp": 180, "atk": 18, "def": 5},
    "frost_draugr": {"name": "Barrow Draugr", "hp": 220, "atk": 24, "def": 8},
    "desert_serpent": {"name": "Desert Serpent", "hp": 150, "atk": 16, "def": 4},
    "typhon": {"name": "Typhon, Father of Monsters", "hp": 850, "atk": 65, "def": 25},
    "surtr": {"name": "Surtr, Lord of Muspelheim", "hp": 950, "atk": 75, "def": 30},
    "apophis_serpent": {"name": "Apophis, Chaos Serpent", "hp": 900, "atk": 70, "def": 28}
}

@router.post("/action", response_model=BattleActionResponse)
def execute_combat_turn(req: BattleActionRequest):
    c_stats = CREATURE_STATS.get(req.creatureId, {"name": "Mythic Beast", "hp": 200, "atk": 20, "def": 5})
    
    player_dmg = 25
    enemy_dmg = max(5, c_stats["atk"] - random.randint(2, 6))
    battle_log = []

    if req.actionType == "exploit_weakness":
        # Trivia challenge multiplier
        player_dmg = int(player_dmg * 1.6)
        enemy_dmg = 0 # Stuns enemy turn on correct trivia
        battle_log.append(f"Exploited mythic weakness! Dealt {player_dmg} critical damage and stunned {c_stats['name']}!")
    elif req.actionType == "defend":
        enemy_dmg = int(enemy_dmg * 0.4)
        player_dmg = 10
        battle_log.append(f"Took defensive stance! Reduced incoming damage to {enemy_dmg}.")
    else:
        battle_log.append(f"Struck {c_stats['name']} for {player_dmg} physical damage!")

    battle_log.append(f"{c_stats['name']} counter-attacked for {enemy_dmg} damage.")

    return BattleActionResponse(
        playerDamage=player_dmg,
        enemyDamage=enemy_dmg,
        playerHpRemaining=max(0, 100 - enemy_dmg),
        enemyHpRemaining=max(0, c_stats["hp"] - player_dmg),
        battleLog=battle_log,
        isFinished=False,
        victory=False,
        rewards={"xp": 50, "coins": 25}
    )
