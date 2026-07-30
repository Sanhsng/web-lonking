import { Prize } from "@/types/promotion";

export const LUCKY_WHEEL_DATA: Prize[] = [
  {
    id: "1",
    name: "Thùng bia trắng",
    type: "GIAI_NHAT",
    quantity: 3,
    image: "", // Cập nhật link ảnh thực tế sau
    probability: 5, // 5% trúng giải nhất
  },
  {
    id: "2",
    name: "Thùng bia đỏ",
    type: "GIAI_NHI",
    quantity: 5,
    image: "",
    probability: 20, // 20% trúng giải nhì
  },
  {
    id: "3",
    name: "Chúc may mắn",
    type: "TRUOT",
    quantity: 4, // Số lượng ô hiển thị trên vòng quay
    image: "",
    probability: 75, // 75% trượt
  },
];

// Để vòng quay hiển thị đẹp và xen kẽ, chúng ta tạo một mảng cấu hình riêng cho các ô trên vòng quay.
// Tổng cộng có 12 ô (3 Nhất, 5 Nhì, 4 Trượt)
export const WHEEL_SEGMENTS = [
  { prizeId: "1", color: "#FFD700" },
  { prizeId: "3", color: "#d32f2f" },
  { prizeId: "2", color: "#FFD700" },
  { prizeId: "2", color: "#d32f2f" },
  { prizeId: "1", color: "#FFD700" },
  { prizeId: "3", color: "#d32f2f" },
  { prizeId: "2", color: "#FFD700" },
  { prizeId: "2", color: "#d32f2f" },
  { prizeId: "1", color: "#FFD700" },
  { prizeId: "3", color: "#d32f2f" },
  { prizeId: "2", color: "#FFD700" },
  { prizeId: "3", color: "#d32f2f" },
];
