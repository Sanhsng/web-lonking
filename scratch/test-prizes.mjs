async function fetchFromUpstash(key) {
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  const res = await fetch(`${REDIS_URL}/get/${key}`, {
    headers: { "Authorization": `Bearer ${REDIS_TOKEN}` }
  });
  const data = await res.json();
  if (data.result) {
    return JSON.parse(data.result);
  }
  return null;
}

async function main() {
  const data = await fetchFromUpstash('wp_lucky_prizes_cache');
  console.log("Prizes Data:", JSON.stringify(data, null, 2));
}

main();
