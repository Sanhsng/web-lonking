import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo hành | Lonking Việt Nam",
  description: "Chính sách bảo hành máy xúc, máy ủi Lonking.",
};

export default function WarrantyPolicyPage() {
  return (
    <main className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-8">
          Chính sách bảo hành
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <p>Lonking Việt Nam cung cấp chế độ bảo hành chính hãng uy tín nhằm mang lại sự an tâm tuyệt đối cho khách hàng.</p>
          <h3>1. Thời hạn bảo hành</h3>
          <p>Các thiết bị máy xúc lật, máy ủi, xe nâng Lonking được bảo hành tiêu chuẩn từ <strong>12 tháng đến 24 tháng</strong> (hoặc 2000 - 4000 giờ hoạt động tùy theo điều kiện nào đến trước).</p>
          <h3>2. Điều kiện bảo hành</h3>
          <ul>
            <li>Máy bị hư hỏng do lỗi từ phía nhà sản xuất (về vật liệu hoặc lắp ráp).</li>
            <li>Máy được thực hiện bảo dưỡng định kỳ đúng quy định của Lonking và sử dụng phụ tùng, dầu nhớt chính hãng.</li>
            <li>Không tự ý tháo dỡ, sửa chữa mà không có sự đồng ý của kỹ thuật viên Lonking.</li>
          </ul>
          <h3>3. Quy trình tiếp nhận</h3>
          <p>Khách hàng gọi điện tới Hotline bảo hành. Kỹ thuật viên của chúng tôi sẽ có mặt tại công trường trong vòng 24-48 giờ để kiểm tra và xử lý sự cố.</p>
        </div>
      </div>
    </main>
  );
}
