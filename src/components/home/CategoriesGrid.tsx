import Link from "next/link";
import { ArrowUpRight, ChevronRight, Truck, Zap, Tractor, Wrench, Bus, Forklift } from "lucide-react";

import { getProductCategories } from "@/services/products";

const iconMap: Record<string, any> = {
  "may-xuc-lat-dau": Truck,
  "may-xuc-lat-dien": Zap,
  "may-xuc-dao": Tractor,
  "may-ui": Wrench,
  "xe-ben": Bus,
  "xe-nang": Forklift,
};
const defaultIcon = Truck;

export async function CategoriesGrid() {
  const wpCategories = await getProductCategories();
  
  const displayCategories = wpCategories.map(cat => ({
    title: cat.name,
    href: `/products?category=${cat.slug}`,
    image: cat.productCategoryFields?.categoryImage?.node?.sourceUrl || "https://placehold.co/600x800?text=Category+Image",
    icon: iconMap[cat.slug] || defaultIcon,
    badge: cat.slug === "may-xuc-lat-dien" ? "Mới" : "",
  }));

  return (
    <section className="py-12 md:py-section-padding-lg bg-surface-bright relative z-20 overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-[28px] sm:text-[32px] md:text-headline-lg text-on-surface mb-3 md:mb-4 font-bold leading-tight">
              Danh mục thiết bị
            </h2>
            <p className="text-on-surface-variant text-body-lg font-body-lg">
              Khám phá toàn bộ phạm vi máy móc cấp công nghiệp của chúng tôi,
              được phân loại cho nhu cầu dự án cụ thể của bạn.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-label-md text-label-md font-semibold transition-colors uppercase tracking-wide"
          >
            Xem tất cả danh mục
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 md:gap-8">
          {displayCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={category.href}
                className="group relative h-40 sm:h-64 md:h-80 rounded-[12px] sm:rounded-[16px] overflow-hidden bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_25px_35px_-10px_rgba(0,0,0,0.04)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${category.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                {category.badge && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-tertiary-container text-on-tertiary text-[9px] sm:text-label-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-widest font-bold">
                    {category.badge}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 flex flex-col gap-1 sm:gap-2">
                  <div className="bg-white/20 backdrop-blur-md w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 sm:mb-2 border border-white/30">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-headline-md text-[14px] sm:text-[20px] md:text-[24px] text-white font-semibold leading-tight">
                    {category.title}
                  </h3>
                  <span className="text-white/80 font-label-sm text-[10px] sm:text-label-sm uppercase tracking-wider group-hover:text-secondary-fixed transition-colors flex items-center gap-1 font-semibold">
                    Khám phá <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
