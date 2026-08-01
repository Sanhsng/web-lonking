import { NextResponse } from "next/server";
import { fetchFromUpstash } from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập mã dự thưởng" },
        { status: 400 }
      );
    }

    const testCookie = await fetchFromUpstash<string>('wp_cookie_cache');
    const userAgent = await fetchFromUpstash<string>('wp_user_agent_cache');

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "User-Agent": userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
    if (testCookie) {
      headers["Cookie"] = `__test=${testCookie}`;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/lucky/v1/spin`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    console.log("WP Spin Response:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Lỗi khi quay thưởng" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Lucky draw spin error:", error);
    return NextResponse.json(
      { success: false, message: "Đã có lỗi xảy ra khi quay thưởng" },
      { status: 500 }
    );
  }
}
