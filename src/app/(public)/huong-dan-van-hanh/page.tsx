import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng dẫn vận hành | Lovol Việt Nam",
  description: "Tài liệu hướng dẫn vận hành máy công trình Lovol.",
};

export default function OperationManualPage() {
  return (
    <main className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-8">
          Hướng dẫn vận hành
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <p>Để đảm bảo hiệu suất tối đa và an toàn khi sử dụng thiết bị Lovol, khách hàng vui lòng tuân thủ các quy tắc vận hành sau:</p>
          <h3>1. Kiểm tra trước khi nổ máy</h3>
          <p>Luôn kiểm tra nhớt động cơ, nước làm mát, nhớt thủy lực và hệ thống phanh trước khi bắt đầu một ca làm việc mới.</p>
          <h3>2. Khởi động đúng cách</h3>
          <p>Để máy nổ không tải (ga nhỏ) trong vòng 5-10 phút để nhớt bôi trơn đều lên các chi tiết máy, đặc biệt là trong điều kiện thời tiết lạnh.</p>
          <h3>3. Vận hành an toàn</h3>
          <p>Tuyệt đối không chở quá tải trọng cho phép. Khi làm việc ở địa hình đồi dốc, cần chú ý góc nghiêng an toàn để tránh lật máy.</p>
          <p>Khách hàng có thể liên hệ tổng đài kỹ thuật để nhận tài liệu hướng dẫn sử dụng chi tiết (PDF) cho từng dòng máy cụ thể.</p>
        </div>
      </div>
    </main>
  );
}
