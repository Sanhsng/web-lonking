async function testImage(url) {
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  const redisRes = await fetch(`${REDIS_URL}/get/wp_cookie_cache`, {
    headers: { "Authorization": `Bearer ${REDIS_TOKEN}` }
  });
  const data = await redisRes.json();
  const testCookie = JSON.parse(data.result);

  const res = await fetch(url, {
    headers: {
      "Cookie": `__test=${testCookie}`,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
    }
  });

  console.log(`URL: ${url}`);
  console.log(`Status: ${res.status}`);
  console.log(`Content-Type: ${res.headers.get("content-type")}`);
}

async function main() {
  await testImage("https://lonkingsanh365.infinityfreeapp.com/wp-content/uploads/2026/07/heineken330.jpg");
  await testImage("https://lonkingsanh365.infinityfreeapp.com/wp-content/uploads/2026/07/kenbac250.webp");
}
main();
