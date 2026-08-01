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

    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/lucky/v1/check`;
    
    console.log("Validate Code Headers:", headers);
    
    const res = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ code }),
    });

    const text = await res.text();
    console.log("Validate Code Response Status:", res.status);
    console.log("Validate Code Response Text:", text.substring(0, 150));
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error(`Failed to parse JSON. Response: ${text.substring(0, 100)}`);
    }

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data?.message || "Mã không hợp lệ" },
        { status: res.status }
      );
    }

    // Ensure we send back `success` field for frontend compatibility
    // if the API returns `valid` instead of `success`
    return NextResponse.json({
      ...data,
      success: data.success !== undefined ? data.success : data.valid
    });
  } catch (error) {
    console.error("Lucky draw validate error:", error);
    return NextResponse.json(
      { success: false, message: "Đã có lỗi xảy ra, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
