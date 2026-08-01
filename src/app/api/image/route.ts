import { NextResponse } from 'next/server';
import { fetchFromUpstash } from '@/lib/redis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    // Lấy cookie __test và User-Agent từ Redis
    const testCookie = await fetchFromUpstash<string>('wp_cookie_cache');
    const userAgent = await fetchFromUpstash<string>('wp_user_agent_cache');
    
    const headers: HeadersInit = {
      'User-Agent': userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    };

    if (testCookie) {
      headers['Cookie'] = `__test=${testCookie}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 86400 } // Cache images for 24 hours in Next.js cache
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.status}`, { status: response.status });
    }

    // Lấy nội dung ảnh dưới dạng ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    
    // Khởi tạo headers cho response trả về client
    const responseHeaders = new Headers();
    
    // Copy content-type từ response gốc
    const contentType = response.headers.get('content-type');
    if (contentType) {
      responseHeaders.set('Content-Type', contentType);
    }
    
    // Thêm Cache-Control để browser cache ảnh này lâu dài
    responseHeaders.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');

    return new NextResponse(arrayBuffer, {
      headers: responseHeaders,
      status: 200,
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
