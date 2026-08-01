import Link from "next/link";
import { FileText } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-primary py-12 md:py-section-padding-lg relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute inset-0 opacity-10">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              height="40"
              id="grid-pattern"
              patternUnits="userSpaceOnUse"
              width="40"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              ></path>
            </pattern>
          </defs>
          <rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
        </svg>
      </div>
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
        <h2 className="font-headline-xl text-[32px] sm:text-[40px] md:text-headline-xl text-white font-bold mb-4 sm:mb-6 leading-tight">
          Sẵn sàng nâng cấp đội xe của bạn?
        </h2>
        <p className="text-on-primary-fixed-dim font-body-lg text-[15px] sm:text-body-lg max-w-2xl mx-auto mb-8 sm:mb-10">
          Liên hệ với các chuyên gia của chúng tôi ngay hôm nay để nhận báo giá
          tùy chỉnh, tùy chọn tài chính và các thông số kỹ thuật chi tiết phù hợp
          với yêu cầu dự án của bạn.
        </p>
        <Link
          href="/contact"
          className="bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-md text-label-md px-6 sm:px-10 py-4 sm:py-5 rounded-[16px] transition-all duration-200 active:scale-[0.98] shadow-lg font-bold uppercase tracking-wider inline-flex justify-center items-center gap-2 w-full sm:w-auto"
        >
          Nhận báo giá miễn phí
          <FileText className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
