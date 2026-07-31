import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | Lonking Việt Nam",
  description: "Chính sách bảo mật thông tin của Lonking Việt Nam.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-8">
          Chính sách bảo mật
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <p>Lonking Việt Nam cam kết bảo vệ thông tin cá nhân của khách hàng một cách tốt nhất.</p>
          <h3>1. Mục đích thu thập thông tin</h3>
          <p>Chúng tôi chỉ thu thập thông tin cá nhân của bạn để hỗ trợ việc tư vấn sản phẩm, cung cấp dịch vụ bảo hành và gửi các thông tin khuyến mãi (nếu bạn đồng ý).</p>
          <h3>2. Phạm vi sử dụng thông tin</h3>
          <p>Thông tin của khách hàng chỉ được sử dụng nội bộ trong hệ thống của Lonking Việt Nam. Chúng tôi cam kết không bán, chia sẻ hay trao đổi thông tin này cho bất kỳ bên thứ ba nào khác.</p>
          <h3>3. Bảo mật thông tin</h3>
          <p>Chúng tôi áp dụng các biện pháp kỹ thuật và an ninh để ngăn chặn truy cập trái phép hoặc đánh cắp dữ liệu thông tin cá nhân của khách hàng.</p>
          <p>Mọi thắc mắc về chính sách bảo mật, xin liên hệ với chúng tôi qua số Hotline trên website.</p>
        </div>
      </div>
    </main>
  );
}
