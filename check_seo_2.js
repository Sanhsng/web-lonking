const http = require('http');

const urls = [
  'http://localhost:3000/products?category=may-xuc-dao',
  'http://localhost:3000/products?category=may-xuc-lat-dien'
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

async function checkSeo() {
  for (const url of urls) {
    try {
      const html = await fetchHtml(url);
      const isIntroPresent = html.includes('MÁY XÚC ĐÀO LOVOL là dòng thiết bị công trình của Tập đoàn Lovol') || html.includes('MÁY XÚC LẬT ĐIỆN LOVOL là dòng thiết bị công trình sử dụng năng lượng điện');
      console.log(`${url} - Intro Present: ${isIntroPresent}`);
      
      const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*>/i);
      console.log(`Canonical tag raw: ${canonicalMatch ? canonicalMatch[0] : null}`);
    } catch (e) {
      console.error(e);
    }
  }
}

checkSeo();
