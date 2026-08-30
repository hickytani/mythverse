import httpx
from typing import Dict, Any, Optional

# Static in-memory cache for Wikipedia myth summaries
CACHE: Dict[str, Dict[str, Any]] = {}

class ExternalReferenceService:
    @staticmethod
    async def fetch_mythology_reference(entity_name: str) -> Dict[str, Any]:
        key = entity_name.lower().strip()
        if key in CACHE:
            return CACHE[key]

        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{entity_name.replace(' ', '_')}"
        
        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    data = res.json()
                    result = {
                        "name": entity_name,
                        "description": data.get("extract", ""),
                        "wikiUrl": data.get("content_urls", {}).get("desktop", {}).get("page", ""),
                        "thumbnail": data.get("thumbnail", {}).get("source", ""),
                        "source": "Wikipedia API"
                    }
                    CACHE[key] = result
                    return result
        except Exception:
            pass

        # Fallback if offline or API limit reached
        fallback = {
            "name": entity_name,
            "description": f"Historical mythology entry for {entity_name} retrieved from MythVerse ancient archives.",
            "wikiUrl": f"https://en.wikipedia.org/wiki/{entity_name.replace(' ', '_')}",
            "thumbnail": "",
            "source": "MythVerse Archive Fallback"
        }
        CACHE[key] = fallback
        return fallback

external_ref_service = ExternalReferenceService()
