import Link from "next/link";
import { Weight, Cog, ShoppingBasket, BatteryCharging, VolumeX } from "lucide-react";
import { getProducts } from "@/services/products";

export async function FeaturedProducts() {
  const wpProducts = await getProducts();
  const featuredWpProducts = wpProducts.filter(p => p.productFields?.isFeatured).slice(0, 3);

  const displayProducts = featuredWpProducts.map(wp => {
    const isElectric = wp.productFields?.powerType?.some(t => ["electric", "điện", "dien"].includes(t.trim().toLowerCase()));
    
    const specs = [];
    if (wp.productFields?.operatingWeight) {
      specs.push({ icon: Weight, label: "Trọng lượng hoạt động", value: wp.productFields.operatingWeight });
    }
    
    if (isElectric) {
      if (wp.productFields?.loIPin) {
        specs.push({ icon: BatteryCharging, label: "Dung lượng pin", value: wp.productFields.loIPin });
      }
      specs.push({ icon: VolumeX, label: "Độ ồn", value: "< 65 dB(A)" });
    } else {
      if (wp.productFields?.ratedPower) {
        specs.push({ icon: Cog, label: "Công suất động cơ", value: wp.productFields.ratedPower });
      }
      if (wp.productFields?.bucketCapacity) {
        specs.push({ icon: ShoppingBasket, label: "Dung tích gầu", value: wp.productFields.bucketCapacity });
      }
    }

    return {
      slug: wp.slug,
      title: wp.title,
      category: wp.productCategories?.nodes?.[0]?.name || "Sản phẩm",
      image: wp.featuredImage?.node?.sourceUrl || wp.productFields?.productGallery?.node?.sourceUrl || "https://placehold.co/600x400?text=No+Image",
      specs
    };
  });
  return (
    <section className="py-section-padding-lg bg-surface relative">
      <div className="max-w-container-max mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 font-bold">
            Model nổi bật
          </h2>
          <p className="text-on-surface-variant text-body-lg font-body-lg">
            Khám phá các thiết bị nổi bật của chúng tôi, đại diện cho đỉnh cao
            trong khả năng kỹ thuật và thiết kế của Lonking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-[16px] border border-outline-variant/50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_25px_35px_-10px_rgba(0,0,0,0.04)]"
            >
              <div className="h-64 bg-surface-container-low relative overflow-hidden group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${product.image}')` }}
                ></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-md text-[20px] text-on-surface font-bold mb-1">
                  {product.title}
                </h3>
                <p className="text-on-surface-variant font-label-md text-label-md mb-6 uppercase tracking-wider text-xs font-semibold">
                  {product.category}
                </p>
                <div className="space-y-3 mb-8 flex-grow">
                  {product.specs.map((spec, sIdx) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={sIdx}
                        className={`flex justify-between items-center py-2 ${
                          sIdx !== product.specs.length - 1
                            ? "border-b border-surface-container"
                            : ""
                        }`}
                      >
                        <span className="text-on-surface-variant flex items-center gap-2 font-label-md">
                          <Icon className="w-[18px] h-[18px]" /> {spec.label}
                        </span>
                        <span className="font-semibold text-on-surface font-label-md">
                          {spec.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="w-full bg-surface hover:bg-surface-container-high border border-outline-variant/60 text-primary font-label-md text-label-md py-3 rounded-[16px] transition-colors font-semibold uppercase tracking-wide text-center"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
