import { Metadata } from "next";
import Image from "next/image";
import { Headset, Mail, MapPin, Building2 } from "lucide-react";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { getProducts } from "@/services/products";

export const metadata: Metadata = {
  title: "Liên hệ với chúng tôi - Lonking Việt Nam",
  description:
    "Các chuyên gia kỹ thuật và đội ngũ hỗ trợ mua sắm của chúng tôi luôn sẵn sàng hỗ trợ bạn với các thắc mắc về kỹ thuật, giải pháp quản lý đội xe và báo giá tùy chỉnh.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const wpProducts = await getProducts();
  const productOptions = wpProducts.map((p) => ({
    value: p.slug,
    label: p.title,
  }));

  return (
    <main className="pt-20">
      {/* Mobile Hero Section (Hidden on Desktop) */}
      <section className="sm:hidden relative w-full h-auto flex flex-col">
        {/* Background Image Container */}
        <div className="relative w-full aspect-[16/10]">
          <div
            className="absolute inset-0 w-full h-full bg-cover"
            style={{
              backgroundImage: 'url("/images/banners/contact-team-banner.jpg")',
              backgroundPosition: 'center top'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>

        {/* Content Card */}
        <div className="relative z-10 w-full max-w-container-max mx-auto px-4 flex justify-center -mt-8">
          <div className="bg-white/90 backdrop-blur-md border border-surface-variant p-6 rounded-xl w-full shadow-xl">
            <h1 className="font-bold text-[24px] text-on-background mb-2 text-center leading-tight">
              Liên hệ với chúng tôi
            </h1>
            <p className="font-body-md text-[14px] text-on-surface-variant text-center">
              Các chuyên gia kỹ thuật và đội ngũ hỗ trợ mua sắm của chúng tôi
              luôn sẵn sàng hỗ trợ bạn với các thắc mắc về kỹ thuật, giải pháp
              quản lý đội xe và báo giá tùy chỉnh.
            </p>
          </div>
        </div>
      </section>

      {/* Desktop Hero Section (Hidden on Mobile) */}
      <section className="hidden sm:flex relative w-full h-auto min-h-[614px] items-end pt-32 pb-24 md:pb-32">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover"
            style={{
              backgroundImage: 'url("/images/banners/contact-team-banner.jpg")',
              backgroundPosition: 'center top'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-8 flex justify-center md:justify-start">
          <div className="bg-white/80 backdrop-blur-md border border-white/50 p-6 sm:p-8 md:p-10 rounded-2xl w-full max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-48px)] md:max-w-2xl shadow-lg transform translate-y-10 md:translate-y-16">
            <h1 className="font-headline-xl text-[32px] sm:text-[40px] md:text-headline-xl text-on-background mb-3 md:mb-4 font-bold text-center md:text-left leading-tight">
              Liên hệ với chúng tôi
            </h1>
            <p className="font-body-lg text-[15px] sm:text-body-lg text-on-surface-variant text-center md:text-left">
              Các chuyên gia kỹ thuật và đội ngũ hỗ trợ mua sắm của chúng tôi
              luôn sẵn sàng hỗ trợ bạn với các thắc mắc về kỹ thuật, giải pháp
              quản lý đội xe và báo giá tùy chỉnh.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid Section (Bento Style) */}
      <section id="contact-form-section" className="py-12 md:py-section-padding-lg w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-8 mt-12 md:mt-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter">
          {/* Form (Left Side - 7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02),0_20px_40px_rgba(0,0,0,0.04)] border border-surface-variant p-6 sm:p-8 md:p-10">
            <h2 className="font-headline-md text-[24px] md:text-headline-md text-on-background mb-6 md:mb-8 font-bold">
              Gửi yêu cầu
            </h2>
            <Suspense fallback={<div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-slate-200 rounded"></div><div className="space-y-3"><div className="grid grid-cols-3 gap-4"><div className="h-2 bg-slate-200 rounded col-span-2"></div><div className="h-2 bg-slate-200 rounded col-span-1"></div></div><div className="h-2 bg-slate-200 rounded"></div></div></div></div>}>
              <ContactForm productOptions={productOptions} />
            </Suspense>
          </div>

          {/* Info Cards (Right Side - 5 cols, Bento arrangement) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Hotline Card */}
            <div className="bg-primary text-on-primary rounded-xl p-8 shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300 flex-grow">
              <div className="mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Headset className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-headline-md text-headline-md mb-2 font-bold">
                  Đường dây nóng hỗ trợ
                </h3>
                <p className="font-body-md text-body-md text-primary-fixed-dim">
                  Sẵn sàng 24/7 cho các hỗ trợ kỹ thuật khẩn cấp và điều phối
                  đội xe.
                </p>
              </div>
              <a
                className="font-headline-lg text-headline-lg hover:text-secondary-fixed transition-colors font-bold"
                href={`tel:${siteConfig.hotline}`}
              >
                {siteConfig.hotline}
              </a>
            </div>

            {/* Grid for smaller info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Card */}
              <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="w-10 h-10 bg-surface-container-low text-primary rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-label-md text-label-md text-on-background mb-1 font-bold">
                  Gửi Email
                </h4>
                <a
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors break-words"
                  href="mailto:nsanh2005@gmail.com"
                >
                  nsanh2005@gmail.com
                </a>
              </div>

              {/* Corporate Address Card */}
              <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="w-10 h-10 bg-surface-container-low text-primary rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-label-md text-label-md text-on-background mb-1 font-bold">
                  Trụ sở chính
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Phù Dực 1, Phù Đổng, Gia Lâm, Hà Nội
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Preview Section */}
      <section className="py-8 md:py-12 w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-8">
        <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-sm border border-surface-variant bg-surface-container-low relative group">
          <iframe
            src="https://www.google.com/maps?q=Phù+Dực+1,+Phù+Đổng,+Gia+Lâm,+Hà+Nội&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 z-0"
          ></iframe>
          {/* Glassmorphism overlay for location badge */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md border border-white/50 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-0">
            <Building2 className="text-primary w-5 h-5" />
            <span className="font-label-sm text-label-sm text-on-background font-semibold">
              Trụ sở Lonking Việt Nam
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
