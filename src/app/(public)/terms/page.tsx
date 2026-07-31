import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | Lonking Việt Nam",
  description: "Điều khoản sử dụng website Lonking Việt Nam.",
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-8">
          Điều khoản sử dụng
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <p>Bằng việc truy cập và sử dụng website Lonking Việt Nam, bạn đồng ý với các điều khoản sau:</p>
          <h3>1. Quyền sở hữu trí tuệ</h3>
          <p>Mọi nội dung, hình ảnh, bài viết trên website này thuộc sở hữu của Lonking Việt Nam hoặc được cấp phép hợp lệ. Việc sao chép mà không có sự đồng ý bằng văn bản là vi phạm pháp luật.</p>
          <h3>2. Miễn trừ trách nhiệm</h3>
          <p>Chúng tôi luôn nỗ lực đảm bảo thông tin trên website là chính xác và được cập nhật thường xuyên. Tuy nhiên, thông số kỹ thuật của thiết bị có thể thay đổi từ nhà sản xuất mà không cần báo trước. Chúng tôi không chịu trách nhiệm cho mọi tổn thất do việc sử dụng thông tin trên web.</p>
          <h3>3. Thay đổi điều khoản</h3>
          <p>Lonking Việt Nam có quyền thay đổi các điều khoản sử dụng này bất cứ lúc nào để phù hợp với quy định mới.</p>
        </div>
      </div>
    </main>
  );
}
