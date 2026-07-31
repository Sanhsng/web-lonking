import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển dụng | Lonking Việt Nam",
  description: "Thông tin tuyển dụng từ Lonking Việt Nam.",
};

export default function CareersPage() {
  return (
    <main className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-8">
          Tuyển dụng
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <p>Chào mừng bạn đến với trang Tuyển dụng của Lonking Việt Nam.</p>
          <p>Lonking tự hào là một trong những môi trường làm việc chuyên nghiệp, năng động và sáng tạo hàng đầu trong lĩnh vực phân phối máy móc thiết bị công trình tại Việt Nam.</p>
          <h3>Vị trí đang tuyển</h3>
          <ul>
            <li><strong>Nhân viên kinh doanh (Sales):</strong> Số lượng 5. Yêu cầu có kinh nghiệm làm việc trong ngành thiết bị công trình.</li>
            <li><strong>Kỹ sư bảo hành bảo trì:</strong> Số lượng 3. Tốt nghiệp chuyên ngành cơ khí động lực, sửa chữa ô tô máy xúc.</li>
          </ul>
          <h3>Quyền lợi</h3>
          <p>Mức lương thưởng hấp dẫn, bảo hiểm y tế và xã hội đầy đủ, có lộ trình thăng tiến rõ ràng.</p>
          <p>Vui lòng gửi CV về địa chỉ email: <strong>hr@lonkingvietnam.com</strong></p>
        </div>
      </div>
    </main>
  );
}
