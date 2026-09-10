const http = require('http');

const urls = [
  'http://localhost:3000/products?category=may-xuc-dao',
  'http://localhost:3000/products?category=may-xuc-lat',
  'http://localhost:3000/products?category=may-xuc-lat-dien',
  'http://localhost:3000/products?category=may-ui',
  'http://localhost:3000/products?category=xe-ben',
  'http://localhost:3000/products?category=xe-nang',
];

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : null;
}

async function checkSeo() {
  for (const url of urls) {
    console.log(`\n================================`);
    console.log(`Checking URL: ${url}`);
    
    try {
      const html = await fetchHtml(url);
      
      const title = extractTag(html, /<title[^>]*>([^<]+)<\/title>/i);
      const description = extractTag(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/i) 
                       || extractTag(html, /<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
      const h1 = extractTag(html, /<h1[^>]*>([^<]+)<\/h1>/i);
      const canonical = extractTag(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)
                     || extractTag(html, /<link[^>]*href="([^"]*)"[^>]*rel="canonical"/i);
      const robots = extractTag(html, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/i)
                  || extractTag(html, /<meta[^>]*content="([^"]*)"[^>]*name="robots"/i);
      
      console.log(`Title: ${title}`);
      console.log(`Meta Description: ${description}`);
      console.log(`H1: ${h1 ? h1.trim() : null}`);
      console.log(`Canonical: ${canonical}`);
      console.log(`Robots: ${robots}`);
      
      // Check if FR360D description is bleeding into the meta description
      if (description && description.includes('FR360D')) {
        console.log(`WARNING: First product description (FR360D) found in Meta Description!`);
      }
      
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
    }
  }
}

checkSeo();
