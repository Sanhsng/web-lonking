import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp | Lovol Việt Nam",
  description: "Các câu hỏi thường gặp khi mua máy công trình Lovol.",
};

export default function FAQPage() {
  return (
    <main className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-8">
          Câu hỏi thường gặp (FAQ)
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <h3>1. Máy xúc lật Lovol xuất xứ từ đâu?</h3>
          <p>Lovol là thương hiệu thiết bị thi công xây dựng hàng đầu thế giới đến từ Trung Quốc. Mọi sản phẩm tại Việt Nam đều được nhập khẩu nguyên chiếc và phân phối chính hãng.</p>
          <h3>2. Tôi có thể mua phụ tùng thay thế ở đâu?</h3>
          <p>Lovol Việt Nam có các kho phụ tùng lớn tại Hà Nội và Đồng Nai, cam kết cung cấp phụ tùng chính hãng nhanh chóng để không làm gián đoạn công việc của bạn.</p>
          <h3>3. Công ty có hỗ trợ mua trả góp không?</h3>
          <p>Có. Chúng tôi liên kết với nhiều ngân hàng và công ty cho thuê tài chính để hỗ trợ quý khách hàng vay vốn lên đến 70-80% giá trị thiết bị với lãi suất ưu đãi.</p>
          <h3>4. Thời gian giao máy là bao lâu?</h3>
          <p>Đối với các dòng máy phổ thông có sẵn tại bãi, chúng tôi có thể giao ngay trong ngày. Với các cấu hình đặc biệt, thời gian nhập và giao hàng sẽ được thỏa thuận trong hợp đồng.</p>
        </div>
      </div>
    </main>
  );
}
