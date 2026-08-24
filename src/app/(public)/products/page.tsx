import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Weight, Cog, Zap, Wrench, Fuel, Monitor, Container } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductCatalog, Product } from "@/components/products/catalog/ProductCatalog";
import { getProducts } from "@/services/products";

export const metadata: Metadata = {
  title: "Đội xe của chúng tôi | Lovol Việt Nam",
  description: "Khám phá dải máy móc hạng nặng toàn diện của chúng tôi.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  const wpProducts = await getProducts();
  
  const mappedProducts: Product[] = wpProducts.map((wp) => {
    const isElectric = wp.productFields?.powerType?.some(t => ["electric", "điện", "dien"].includes(t.trim().toLowerCase()));
    if (wp.slug.includes("6420")) {
      console.log("DEBUG 6420:", wp.productFields?.powerType, "isElectric:", isElectric);
    }
    
    const isBulldozer = wp.productCategories?.nodes?.some(c => c.name.toLowerCase().includes("máy ủi")) || !!wp.productFields?.ironingCapacity;
    const powerLabel = isBulldozer && wp.productFields?.ironingCapacity ? wp.productFields.ironingCapacity : wp.productFields?.ratedPower;

    return {
      slug: wp.slug,
      title: wp.title,
      description: wp.productFields?.shortDescription || "",
      image: wp.featuredImage?.node?.sourceUrl || wp.productFields?.productGallery?.node?.sourceUrl || "https://placehold.co/600x400?text=No+Image",
      isNew: wp.productFields?.isNew || false, 
      powerType: isElectric ? "electric" : "diesel",
      category: wp.productCategories?.nodes?.[0]?.name || "Sản phẩm",
      categorySlug: wp.productCategories?.nodes?.[0]?.slug || "san-pham",
      weight: parseFloat(wp.productFields?.operatingWeight || "0"),
      power: parseFloat(wp.productFields?.ratedPower || "0"),
      specs: [
        { icon: <Weight className="w-[18px] h-[18px]" />, label: wp.productFields?.operatingWeight || "N/A" },
        { icon: <Cog className="w-[18px] h-[18px]" />, label: powerLabel || "N/A" },
        { icon: <Container className="w-[18px] h-[18px]" />, label: wp.productFields?.bucketCapacity || "N/A" },
        { icon: isElectric ? <Zap className="w-[18px] h-[18px]" /> : <Fuel className="w-[18px] h-[18px]" />, label: isElectric ? "Điện" : "Diesel" }
      ],
    };
  });

  return (
    <div className="pt-32 pb-section-padding-lg px-margin-mobile md:px-8 max-w-container-max mx-auto">
      <PageHeader
        title="Thiết bị của chúng tôi"
        description="Được chế tạo để đạt được sự xuất sắc, dải máy móc hạng nặng toàn diện của chúng tôi được chế tạo để chịu đựng những môi trường khắc nghiệt nhất. Khám phá sức mạnh, độ chính xác và độ tin cậy vô song được thiết kế để nâng cao hiệu quả hoạt động của bạn."
        breadcrumbItems={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm" },
        ]}
      />

      <ProductCatalog products={mappedProducts} />
    </div>
  );
}
