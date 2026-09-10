import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Weight, Cog, Zap, Wrench, Fuel, Monitor, Container } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductCatalog, Product } from "@/components/products/catalog/ProductCatalog";
import { getProducts, getProductCategories } from "@/services/products";
import { siteConfig } from "@/config/site";
const categorySeo: Record<string, { title: string; description: string; h1: string; intro: string }> = {
  "may-xuc-dao": {
    title: "Máy Xúc Đào Lovol | Chính Hãng - Lovol Việt Nam",
    description: "Máy xúc đào Lovol chính hãng, đa dạng công suất và cấu hình, phù hợp đào đất, đào móng, khai thác và thi công hạ tầng. Nhà phân phối chính thức tại Việt Nam.",
    h1: "Máy Xúc Đào Lovol",
    intro: "MÁY XÚC ĐÀO LOVOL là dòng thiết bị công trình của Tập đoàn Lovol, được phát triển nhằm đáp ứng nhiều nhu cầu trong xây dựng, đào móng, khai thác và thi công hạ tầng. Với nhiều năm kinh nghiệm trong lĩnh vực máy móc, Lovol không ngừng hoàn thiện sản phẩm về khả năng vận hành, độ ổn định và hiệu suất làm việc. Các dòng máy xúc đào Lovol có nhiều lựa chọn về công suất và cấu hình, phù hợp với đa dạng điều kiện công trường. Chúng tôi vinh dự là nhà phân phối chính thức thương hiệu LOVOL tại Việt Nam."
  },
  "may-xuc-lat": {
    title: "Máy Xúc Lật Lovol | Chính Hãng - Lovol Việt Nam",
    description: "Máy xúc lật Lovol chính hãng, đa dạng dung tích gầu và công suất, phù hợp bốc xúc đất đá, san lấp, khai thác và vận chuyển vật liệu.",
    h1: "Máy Xúc Lật Lovol",
    intro: "MÁY XÚC LẬT LOVOL là dòng thiết bị công trình chuyên dụng cho các công việc bốc xúc, nâng và vận chuyển đất, đá, cát cùng nhiều loại vật liệu khác. Lovol phát triển đa dạng model với nhiều mức công suất, tải trọng nâng và dung tích gầu, đáp ứng nhu cầu sử dụng tại công trường xây dựng, san lấp, khai thác mỏ và bãi vật liệu. Sản phẩm hướng đến khả năng vận hành ổn định, hiệu quả và phù hợp với điều kiện làm việc thực tế. Chúng tôi vinh dự là nhà phân phối chính thức thương hiệu LOVOL tại Việt Nam."
  },
  "may-xuc-lat-dien": {
    title: "Máy Xúc Lật Điện Lovol | Chính Hãng - Lovol Việt Nam",
    description: "Máy xúc lật điện Lovol chính hãng, giải pháp bốc xúc sử dụng năng lượng điện, phù hợp công trường, nhà máy và các khu vực yêu cầu giảm tiếng ồn, khí thải.",
    h1: "Máy Xúc Lật Điện Lovol",
    intro: "MÁY XÚC LẬT ĐIỆN LOVOL là dòng thiết bị công trình sử dụng năng lượng điện, hướng đến nhu cầu vận hành hiệu quả và xu hướng sử dụng máy móc thân thiện hơn với môi trường. Máy phù hợp với các công việc bốc xúc, nâng và di chuyển vật liệu tại công trường, nhà máy, bãi vật liệu và những khu vực có yêu cầu kiểm soát tiếng ồn, khí thải. Với công nghệ điện và nhiều lựa chọn về cấu hình, máy xúc lật điện Lovol mang đến thêm giải pháp cho doanh nghiệp đang tìm kiếm thiết bị công trình thế hệ mới. Chúng tôi vinh dự là nhà phân phối chính thức thương hiệu LOVOL tại Việt Nam."
  },
  "may-ui": {
    title: "Máy Ủi Lovol | Chính Hãng - Lovol Việt Nam",
    description: "Máy ủi Lovol chính hãng, đa dạng công suất, phù hợp san gạt đất đá, tạo mặt bằng và thi công xây dựng, san lấp, khai thác.",
    h1: "Máy Ủi Lovol",
    intro: "MÁY ỦI LOVOL là dòng thiết bị công trình được phát triển chuyên biệt cho các công việc san gạt, đẩy đất đá, tạo mặt bằng và hỗ trợ thi công. Với thiết kế chắc chắn cùng khả năng làm việc trong nhiều điều kiện địa hình, máy ủi Lovol phù hợp với các dự án xây dựng, san lấp, khai thác và thi công hạ tầng. Lovol cung cấp nhiều lựa chọn về công suất, giúp doanh nghiệp dễ dàng lựa chọn thiết bị phù hợp với quy mô công việc và điều kiện vận hành. Chúng tôi vinh dự là nhà phân phối chính thức thương hiệu LOVOL tại Việt Nam."
  },
  "xe-ben": {
    title: "Xe Ben Lovol | Chính Hãng - Lovol Việt Nam",
    description: "Xe ben Lovol chính hãng, đa dạng tải trọng, chuyên vận chuyển đất, đá và vật liệu xây dựng, phù hợp công trường, khai thác và san lấp.",
    h1: "Xe Ben Lovol",
    intro: "XE BEN LOVOL là dòng xe chuyên dụng phục vụ vận chuyển đất, đá và các loại vật liệu xây dựng trong công trường, khai thác và san lấp. Sản phẩm được phát triển với nhiều mức tải trọng, đáp ứng nhu cầu vận chuyển vật liệu trong những điều kiện làm việc khác nhau. Với khả năng vận chuyển linh hoạt, xe ben Lovol có thể kết hợp cùng máy xúc đào, máy xúc lật và các thiết bị công trình khác để tạo thành dây chuyền thi công hiệu quả. Chúng tôi vinh dự là nhà phân phối chính thức thương hiệu LOVOL tại Việt Nam."
  },
  "xe-nang": {
    title: "Xe Nâng Lovol | Chính Hãng - Lovol Việt Nam",
    description: "Xe nâng Lovol chính hãng, đa dạng tải trọng và cấu hình, phù hợp nâng hạ, vận chuyển hàng hóa tại nhà máy, kho bãi và khu công nghiệp.",
    h1: "Xe Nâng Lovol",
    intro: "XE NÂNG LOVOL là dòng thiết bị phục vụ nâng hạ và vận chuyển hàng hóa trong nhà máy, kho bãi, khu công nghiệp và các trung tâm logistics. Lovol phát triển nhiều lựa chọn về tải trọng và cấu hình, đáp ứng các nhu cầu nâng hạ khác nhau trong môi trường làm việc thực tế. Sản phẩm hướng đến khả năng vận hành ổn định, hiệu quả và thuận tiện trong quá trình sử dụng, hỗ trợ doanh nghiệp tối ưu hoạt động kho vận và nâng hạ hàng hóa. Chúng tôi vinh dự là nhà phân phối chính thức thương hiệu LOVOL tại Việt Nam."
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams.category as string | undefined;

  if (categoryParam && categorySeo[categoryParam]) {
    return {
      title: {
        absolute: categorySeo[categoryParam].title,
      },
      description: categorySeo[categoryParam].description,
      alternates: {
        canonical: `${siteConfig.url}/products?category=${categoryParam}`,
      },
    };
  }

  return {
    title: "Máy công trình LOVOL chính hãng | LOVOL Việt Nam",
    description:
      "Khám phá máy xúc, máy xúc lật, máy ủi và các thiết bị công trình LOVOL chính hãng. Công nghệ tiên tiến, hiệu suất cao và vận hành bền bỉ.",
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams.category as string | undefined;

  const [wpProducts, wpCategories] = await Promise.all([
    getProducts(),
    getProductCategories()
  ]);

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

  let pageTitle = "Danh mục sản phẩm LOVOL";
  let pageDescription = "Khám phá các dòng máy công trình LOVOL với hiệu suất mạnh mẽ, độ bền vượt trội và công nghệ tiên tiến, đáp ứng đa dạng nhu cầu vận hành.";
  let breadcrumbItems: { label: string; href?: string }[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm" },
  ];

  if (categoryParam) {
    if (categorySeo[categoryParam]) {
      pageTitle = categorySeo[categoryParam].h1;
      pageDescription = categorySeo[categoryParam].intro;
      breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Sản phẩm", href: "/products" },
        { label: categorySeo[categoryParam].h1 },
      ];
    } else {
      const matchedCategory = wpCategories.find(c => c.slug === categoryParam);
      if (matchedCategory) {
        pageTitle = `Danh mục sản phẩm ${matchedCategory.name}`;
        pageDescription = `Khám phá các dòng ${matchedCategory.name.toLowerCase()} LOVOL với hiệu suất mạnh mẽ, độ bền vượt trội.`;
        breadcrumbItems = [
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/products" },
          { label: matchedCategory.name },
        ];
      }
    }
  }

  return (
    <div className="pt-24 md:pt-32 pb-section-padding-lg px-margin-mobile md:px-8 max-w-container-max mx-auto">
      <PageHeader
        title={pageTitle}
        description={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />

      <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
        <ProductCatalog products={mappedProducts} />
      </Suspense>
    </div>
  );
}
