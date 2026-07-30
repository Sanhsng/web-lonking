import { LuckyCodeResponse, LuckySpinResponse } from "@/types/lucky-draw";

const API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

export const checkLuckyCode = async (code: string): Promise<LuckyCodeResponse> => {
  try {
    const res = await fetch(`/api/lucky-draw/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    
    if (!res.ok) {
      try {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Lỗi xác thực mã",
        };
      } catch (e) {
        return {
          success: false,
          message: `Lỗi kết nối (${res.status})`,
        };
      }
    }
    
    const data = await res.json();
    return {
      success: data.success,
      customer: data.customer,
      message: data.message
    };
  } catch (error) {
    console.error("checkLuckyCode error:", error);
    return {
      success: false,
      message: "Không thể kết nối đến máy chủ",
    };
  }
};

export const spinLuckyDraw = async (code: string): Promise<LuckySpinResponse> => {
  try {
    const res = await fetch(`/api/lucky-draw/spin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    
    return {
      success: data.success,
      message: data.message,
      prize: typeof data.prize === 'object' ? data.prize?.name : (data.prize || data.prize_name || data.data?.prize || data.name || data.data?.name),
      prizeId: typeof data.prize === 'object' ? data.prize?.id : (data.prize_id || data.prizeId || data.data?.prize_id || data.data?.prizeId || data.data?.id),
    };
  } catch (error) {
    console.error("spinLuckyDraw error:", error);
    return {
      success: false,
      message: "Không thể kết nối đến máy chủ",
    };
  }
};
