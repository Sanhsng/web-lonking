import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, FileText, Headset, PlayCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getProductBySlug } from "@/services/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return { title: "Sản phẩm không tồn tại | Lonking Việt Nam" };
  }

  return {
    title: `${product.title} | Lonking Việt Nam`,
    description: product.productFields?.shortDescription || "Chi tiết sản phẩm",
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { title, productFields, featuredImage, content } = product;
  
  // Images
  const validImages = [
    featuredImage?.node?.sourceUrl,
    productFields?.productGallery?.node?.sourceUrl,
    productFields?.nh2?.node?.sourceUrl,
    productFields?.nh3?.node?.sourceUrl
  ].filter(Boolean) as string[];

  const uniqueImages = Array.from(new Set(validImages));

  // Compile specifications based on available fields
  const specsRaw = [
    { label: "Model", value: productFields?.model },
    { label: "Động cơ", value: productFields?.engine },
    { label: "Dung tích gầu", value: productFields?.bucketCapacity },
    { label: "Trọng lượng vận hành", value: productFields?.operatingWeight },
    { label: "Công suất định mức", value: productFields?.ratedPower },
    { label: "Tải trọng nâng", value: productFields?.liftingCapacity },
    { label: "Công suất ủi", value: productFields?.ironingCapacity },
    { label: "Nguồn nhiên liệu", value: productFields?.powerType?.join(', ') },
    { label: "Loại pin", value: productFields?.loIPin },
  ];

  const specifications = specsRaw.filter(spec => !!spec.value);

  return (
    <main className="max-w-container-max mx-auto px-4 md:px-8 pt-24 pb-section-padding-lg">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-[15px] md:text-[16px] font-medium text-outline flex-wrap">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              Sản phẩm
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li aria-current="page" className="text-on-surface-variant font-semibold">
            {title}
          </li>
        </ol>
      </nav>

      {/* Product Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-section-padding-lg">
        {/* Left: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery 
            images={uniqueImages} 
            title={title} 
            model={productFields?.model} 
            isNew={productFields?.isNew} 
          />
        </div>

        {/* Right: Details & CTA */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h1 className="text-headline-xl font-headline-xl text-on-background mb-4">
            {title}
          </h1>
          {productFields?.shortDescription && (
             <p className="text-body-lg font-body-lg text-on-surface-variant mb-8">
               {productFields.shortDescription}
             </p>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {specifications.map((spec) => (
              <div
                key={spec.label}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 shadow-sm flex flex-col gap-1"
              >
                <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
                  {spec.label}
                </span>
                <span className="text-headline-md font-headline-md text-primary font-semibold">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              href={`/contact?product=${slug}#contact-form-section`}
              className="w-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-all duration-300 rounded-[16px] px-6 py-4 text-label-md font-bold active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
            >
              <FileText className="w-5 h-5" />
              Yêu cầu báo giá
            </Link>
            <div className="flex gap-4">
              <a 
                href={`tel:${siteConfig.hotline}`}
                className="flex-1 border-2 border-primary text-primary hover:bg-primary/5 transition-all duration-300 rounded-[16px] px-6 py-3 font-semibold text-label-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Headset className="w-5 h-5" />
                Liên hệ kinh doanh
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content / Specs section */}
      {content && (
        <section className="prose prose-lg max-w-none prose-headings:text-on-background prose-p:text-on-surface-variant prose-a:text-primary mb-section-padding-lg">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      )}
    </main>
  );
}
