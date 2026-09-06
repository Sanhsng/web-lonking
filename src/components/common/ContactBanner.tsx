import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactBanner() {
  return (
    <section className="mb-section-padding-lg px-4 md:px-0 mt-12 md:mt-16">
      <div className="bg-primary relative overflow-hidden rounded-[24px] shadow-[0_20px_40px_-10px_rgba(20,52,100,0.4)] flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="absolute -right-[10%] top-0 h-[150%] w-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M47.7,-57.2C59.9,-46.7,66.6,-30.1,70.5,-12.7C74.4,4.7,75.4,22.8,67.6,37.3C59.8,51.8,43.2,62.7,24.8,69.5C6.4,76.3,-13.8,79.1,-30.6,73.4C-47.4,67.7,-60.8,53.4,-68.1,36.5C-75.4,19.6,-76.6,0.1,-71.4,-16.8C-66.2,-33.7,-54.6,-48,-40.4,-58.1C-26.2,-68.2,-9.4,-74,4.7,-79.6C18.8,-85.2,35.5,-67.7,47.7,-57.2Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl text-center md:text-left mb-8 md:mb-0">
          <h2 className="font-headline-lg text-headline-lg md:text-[40px] md:leading-[48px] text-white font-bold tracking-tight mb-4">
            Bạn cần tư vấn giải pháp máy công trình?
          </h2>
          <p className="font-body-lg text-body-lg text-white/90 max-w-xl mx-auto md:mx-0">
            Hãy liên hệ ngay với đội ngũ chuyên gia của chúng tôi để được tư vấn chọn máy phù hợp nhất với nhu cầu và quy mô dự án của bạn.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Link
            href="/contact"
            className="h-12 md:h-14 bg-white text-primary px-8 rounded-full font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-container-lowest hover:shadow-lg transition-all whitespace-nowrap"
          >
            Liên hệ ngay <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </Link>
          <a
            href={`tel:${siteConfig.hotline.replace(/\D/g, "")}`}
            className="h-12 md:h-14 bg-transparent border-2 border-white/30 text-white px-8 rounded-full font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all whitespace-nowrap"
          >
            <Phone className="w-5 h-5 flex-shrink-0" /> {siteConfig.hotline}
          </a>
        </div>
      </div>
    </section>
  );
}
