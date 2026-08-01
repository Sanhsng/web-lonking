export async function fetchFromUpstash<T>(key: string): Promise<T | null> {
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!REDIS_URL || !REDIS_TOKEN) {
    console.warn(`[Redis Cache] Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN for key: ${key}`);
    return null;
  }

  try {
    const res = await fetch(`${REDIS_URL}/get/${key}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${REDIS_TOKEN}`,
      },
      // Next.js Cache Options: Revalidate every 5 minutes (300 seconds)
      // to reduce Upstash API calls for high traffic.
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      console.warn(`[Redis Cache] Failed to fetch key ${key} from Upstash (HTTP ${res.status})`);
      return null;
    }

    const data = await res.json();
    
    if (data.error) {
      console.warn(`[Redis Cache] Upstash error for key ${key}: ${data.error}`);
      return null;
    }

    if (!data.result) {
      console.warn(`[Redis Cache] Key ${key} is empty or not found in Redis (return null)`);
      return null;
    }

    // The data stored in Redis is stringified JSON, so we parse it.
    try {
      const parsed = JSON.parse(data.result) as T;
      return parsed;
    } catch (parseError) {
      console.warn(`[Redis Cache] Failed to parse JSON for key ${key}`);
      return null;
    }
  } catch (error: any) {
    console.warn(`[Redis Cache] Network or unexpected error when fetching key ${key}: ${error.message}`);
    return null;
  }
}
