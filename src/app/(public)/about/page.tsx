import { Metadata } from "next";
import { Globe, Wrench } from "lucide-react";
import React from "react";
import { MissionVisionCard } from "@/components/about/MissionVisionCard";

export const metadata: Metadata = {
  title: "Về chúng tôi | Lonking Việt Nam",
  description: "Nhiều thập kỷ xuất sắc trong ngành máy thiết bị công trình.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-auto aspect-[16/10] sm:aspect-auto min-h-0 sm:min-h-[614px] flex items-start sm:items-center justify-center bg-surface-container-highest overflow-hidden pt-4 pb-4 sm:py-24 md:py-32">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-[center_top] sm:bg-center"
          style={{
            backgroundImage:
              'url("/images/banners/about-banner.jpg")',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-on-background/80 to-background/20 sm:to-transparent"></div>
        <div className="relative z-10 max-w-container-max mx-auto px-4 sm:px-6 md:px-8 w-full text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="max-w-2xl bg-black/20 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none backdrop-blur-md sm:backdrop-blur-none border border-white/10 sm:border-none">
            <h1 className="font-bold sm:font-headline-xl text-[16px] sm:text-[40px] md:text-headline-xl text-white mb-1.5 sm:mb-6 leading-tight">
              Nhiều thập kỷ xuất sắc trong ngành máy thiết bị công trình
            </h1>
            <p className="font-body-sm sm:font-body-lg text-[10px] sm:text-body-lg text-surface-variant mb-1 sm:mb-8 line-clamp-3 sm:line-clamp-none">
              Xây dựng nền móng của ngày mai với sức mạnh không ngừng, kỹ thuật
              chính xác và cam kết đổi mới từ năm 2013.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission/Vision */}
      <section className="py-12 md:py-section-padding-lg bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Mission */}
            <MissionVisionCard
              icon={<Wrench />}
              title="Sứ mệnh của chúng tôi"
              description="Thúc đẩy phát triển cơ sở hạ tầng toàn cầu bằng cách thiết kế các loại máy móc hạng nặng mạnh mẽ, đáng tin cậy và tiên tiến nhất về công nghệ. Chúng tôi cam kết tối đa hóa hiệu quả hoạt động cho các đối tác của mình đồng thời đảm bảo các tiêu chuẩn an toàn không khoan nhượng trên mọi công trường."
              iconContainerClass="bg-primary-container"
              iconClass="text-on-primary-container"
            />

            {/* Vision */}
            <MissionVisionCard
              icon={<Globe />}
              title="Tầm nhìn của chúng tôi"
              description="Trở thành nhà lãnh đạo toàn cầu không thể tranh cãi trong các giải pháp thiết bị hạng nặng bền vững. Chúng tôi hình dung một tương lai nơi máy móc của chúng tôi không chỉ xây dựng thế giới hiện đại mà còn thực hiện điều đó với lượng khí thải môi trường tối thiểu, thúc đẩy ngành công nghiệp hướng tới một ngày mai sạch hơn, hiệu quả hơn."
              iconContainerClass="bg-secondary-container"
              iconClass="text-on-secondary-container"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
