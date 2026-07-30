export interface LuckyCode {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  status: "USED" | "UNUSED";
  usedAt?: string;
}

export interface LuckyResult {
  id: string;
  code: string;
  prize: string;
  createdAt: string;
}

export interface LuckyCodeResponse {
  success: boolean;
  customer?: string;
  message?: string;
}

export interface LuckySpinResponse {
  success: boolean;
  prize?: string;
  prizeId?: string | number;
  message?: string;
}
