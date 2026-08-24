import Link from "next/link";
import { Construction, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full pt-12 md:pt-section-padding-lg pb-10 bg-on-background dark:bg-surface-container-lowest text-white/90 dark:text-on-surface flex flex-col gap-8 md:grid md:grid-cols-12 md:gap-gutter px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="md:col-span-4 mb-4 md:mb-0">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <span className="text-[24px] sm:text-[28px] md:text-[32px] font-black text-white dark:text-on-background uppercase tracking-tighter">
            Lovol Việt Nam
          </span>
        </div>
        <p className="text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed text-surface-variant/70 mb-6 max-w-sm">
          Cung cấp các dòng máy công trình chính hãng với dịch vụ tư vấn, bảo hành và hậu mãi chuyên nghiệp, đáp ứng mọi nhu cầu thi công.
        </p>
      </div>
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-[16px] md:text-[18px] text-white font-bold mb-4 uppercase tracking-wider">
            Công ty
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Điều khoản sử dụng
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[16px] md:text-[18px] text-white font-bold mb-4 uppercase tracking-wider">
            Tài nguyên
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/blog"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Tin tức
              </Link>
            </li>
            <li>
              <Link
                href="/huong-dan-van-hanh"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Hướng dẫn vận hành
              </Link>
            </li>
            <li>
              <Link
                href="/chinh-sach-bao-hanh"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Chính sách bảo hành
              </Link>
            </li>
            <li>
              <Link
                href="/cau-hoi-thuong-gap"
                className="text-surface-variant/70 dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors hover:translate-x-1 duration-200 cursor-pointer inline-block text-[14px] md:text-[15px]"
              >
                Câu hỏi thường gặp
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <h4 className="text-[16px] md:text-[18px] text-white font-bold mb-4 uppercase tracking-wider">
            địa chỉ
          </h4>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-surface-variant/70 mb-2 break-words">
            Miền Bắc: Phù Dực 1, Phù Đổng, Gia Lâm, Hà Nội
            <br />
            Miền Nam: Đường D5, KDC Cường Thuận, P.Phước Tân, TP.Biên Hòa, Đồng Nai
          </p>
          <a
            href={`tel:${siteConfig.hotline}`}
            className="text-[15px] md:text-[16px] text-secondary-fixed font-semibold hover:underline block"
          >
            {siteConfig.hotline}
          </a>
        </div>
      </div>
      <div className="md:col-span-12 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[14px] md:text-[15px] text-surface-variant/50">
            © 2026 LOVOL VIỆT NAM. All Rights Reserved.
          </p>
          <p className="text-[14px] md:text-[15px] text-surface-variant/50">
            Nhà phân phối máy công trình Lovol chính hãng tại Việt Nam.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            aria-label="Chia sẻ"
            className="text-surface-variant/50 hover:text-white transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
