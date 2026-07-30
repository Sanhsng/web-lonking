export type PrizeType = "GIAI_NHAT" | "GIAI_NHI" | "TRUOT";

export interface Prize {
  id: string;
  name: string;
  type: PrizeType;
  quantity: number;
  image?: string;
  probability: number;
}
