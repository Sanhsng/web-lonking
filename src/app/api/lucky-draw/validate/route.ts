import { NextResponse } from "next/server";

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

    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/lucky/v1/check`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Mã không hợp lệ" },
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
