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
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[614px] min-h-[500px] flex items-center justify-center bg-surface-container-highest overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD91eDpLNX8337TkB1u-Z447HRsEV6OCTgEiUKB8cvUl2_-PCYRh_tQl9wuHq8gN6Rb5U1uoU-x9jlySdEzfQCjuhnTzyjALoYWKkeDUQyxHNCucDhWhFJHUGilCuEJQ8Udgs_SxCGNbyA9XU1KfFBOCaeOJQlHJIJsTjCzgMrlE0u7fZabUCwqzEGx_ClSBaqMmmOGSBmT0i_WuOZIsglxgpzA53SdwebaMF1li3o0scMJa-jhX1a6vdcj4YTOFWoyw9h7SSj9mO4")',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-on-background/80 to-transparent"></div>
        <div className="relative z-10 max-w-container-max mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="font-headline-xl text-headline-xl text-white mb-6">
              Nhiều thập kỷ xuất sắc trong ngành máy thiết bị công trình
            </h1>
            <p className="font-body-lg text-body-lg text-surface-variant mb-8">
              Xây dựng nền móng của ngày mai với sức mạnh không ngừng, kỹ thuật
              chính xác và cam kết đổi mới từ năm 2013.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission/Vision */}
      <section className="py-section-padding-lg bg-surface">
        <div className="max-w-container-max mx-auto px-8">
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
