const html = `
<p>
Trong bối cảnh ngành xây dựng đang ngày càng hướng tới các giải pháp vận hành xanh và tiết kiệm chi phí, 
Lonking chính thức giới thiệu dòng máy xúc lật điện thế hệ mới LG866T-E. 
Sản phẩm được phát triển nhằm đáp ứng nhu cầu làm việc liên tục trong các môi trường công nghiệp, 
khu khai thác, kho bãi và các dự án xây dựng hiện đại.
</p>

<h2>Công nghệ pin mới</h2>

<p>
Lonking LG866T-E được trang bị hệ thống pin Lithium LFP thế hệ mới với độ an toàn cao, 
</p>

<h2>Ưu điểm vận hành</h2>
`;
const regex = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
let match;
const toc = [];
const processedHtml = html.replace(regex, (m, levelStr, attrs, content) => {
  console.log("MATCHED", levelStr, attrs, content);
  toc.push(content);
  return m;
});
console.log("TOC:", toc);
