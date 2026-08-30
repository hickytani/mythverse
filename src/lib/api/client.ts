const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export class ApiClient {
  private static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('mythverse_token');
  }

  public static setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mythverse_token', token);
    }
  }

  public static clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mythverse_token');
    }
  }

  public static async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'API Error' }));
        throw new Error(errorData.detail || `Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.warn(`[ApiClient] Endpoint ${endpoint} unreachable or failed: ${message}. Using fallback.`);
      throw err;
    }
  }

  // --- AUTH METHODS ---
  public static async register(username: string, email: string, password: string): Promise<{ access_token: string }> {
    const res = await this.fetchApi<{ access_token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    this.setToken(res.access_token);
    return res;
  }

  public static async login(email: string, password: string): Promise<{ access_token: string }> {
    const res = await this.fetchApi<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(res.access_token);
    return res;
  }

  // --- SAVE SYNC METHODS ---
  public static async syncSave(gameState: Record<string, unknown>) {
    try {
      return await this.fetchApi('/auth/sync-save', {
        method: 'POST',
        body: JSON.stringify({ save_version: 1, game_state: gameState }),
      });
    } catch {
      return null;
    }
  }

  // --- LORE REFERENCE METHOD ---
  public static async getExternalLore(entityName: string) {
    try {
      return await this.fetchApi(`/lore/external/${encodeURIComponent(entityName)}`);
    } catch {
      return {
        name: entityName,
        description: `Lore entry for ${entityName} stored in ancient archives.`,
        source: 'MythVerse Local Fallback',
      };
    }
  }
}
