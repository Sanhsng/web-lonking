export function transformWithProxy(data: any): any {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(item => transformWithProxy(item));
  }

  if (typeof data === 'object') {
    const transformed: any = {};
    for (const key in data) {
      if (key === 'sourceUrl' && typeof data[key] === 'string' && data[key].includes('infinityfreeapp.com')) {
        // Chỉ thêm proxy nếu chưa có proxy (tránh lặp 2 lần)
        if (!data[key].startsWith('/api/image?url=')) {
          transformed[key] = `/api/image?url=${encodeURIComponent(data[key])}`;
        } else {
          transformed[key] = data[key];
        }
      } else {
        transformed[key] = transformWithProxy(data[key]);
      }
    }
    return transformed;
  }

  return data;
}
