import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/ui/Pagination";
import { NewsletterBanner } from "@/components/common/NewsletterBanner";
import { BlogCategory } from "@/types/blog";
import { getPosts, getCategories } from "@/services/blog";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Tin Tức & Sự Kiện | Lonking",
  description:
    "Tin tức và cập nhật mới nhất về các dòng máy xúc lật, máy xúc đào và thiết bị công trình Lonking. Phân tích chuyên gia, mẹo bảo trì và công nghệ.",
};

export default async function BlogListPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentCategory = searchParams.category || "all";

  // Fetch WP posts and categories in parallel
  const [wpPosts, wpCategories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  // Map to our component format
  const allPosts = wpPosts.map((post) => {
    const plainExcerpt = post.excerpt?.replace(/(<([^>]+)>)/gi, "") || "Không có mô tả.";
    const categoryName = post.categories?.nodes?.[0]?.name || "Tin tức";
    const categorySlug = post.categories?.nodes?.[0]?.slug || "tin-tuc";

    return {
      slug: post.slug,
      category: categoryName,
      categorySlug: categorySlug,
      title: post.title,
      description: plainExcerpt,
      image: post.featuredImage?.node?.sourceUrl || "https://placehold.co/600x400?text=No+Image",
      date: new Date(post.date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      readTime: post.blogFields?.readTime ? `${post.blogFields.readTime} đọc` : "",
      isFeatured: post.blogFields?.isFeatured || false,
    };
  });

  // Filter by category if selected
  const filteredPosts =
    currentCategory === "all"
      ? allPosts
      : allPosts.filter((p) => p.categorySlug === currentCategory);

  // Determine featured post (first featured in the filtered list, or just first)
  const featuredPost = filteredPosts.find((p) => p.isFeatured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  // Build categories array from WP in the requested order
  const categoryOrder = [
    "xu-huong-nganh",
    "kien-thuc-van-hanh",
    "meo-bao-tri",
    "chua-phan-loai"
  ];

  const sortedCategories = [...wpCategories].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.slug);
    const indexB = categoryOrder.indexOf(b.slug);
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  const baseCategories: BlogCategory[] = [
    { id: "all", label: "Tất cả", active: false },
    ...sortedCategories.map(c => ({
      id: c.slug,
      label: c.name,
      active: false
    }))
  ];

  // Update categories active state
  const displayCategories = baseCategories.map((c) => ({
    ...c,
    active: c.id === currentCategory,
  }));

  return (
    <main className="pt-24 pb-section-padding-lg max-w-container-max mx-auto px-margin-mobile md:px-8">
      {/* Hero Section */}
      <section className="py-8 md:py-20 text-center max-w-3xl mx-auto px-4">
        <h1 className="font-headline-xl text-[36px] sm:text-[44px] md:text-[56px] md:leading-[64px] text-on-background mb-4 md:mb-6 leading-tight">
          Góc nhìn Lonking
        </h1>
        <p className="font-body-lg text-[15px] sm:text-body-lg text-on-surface-variant">
          Tin tức và cập nhật ngành công nghiệp máy móc hạng nặng. Phân tích
          chuyên gia, mẹo bảo trì và những tiến bộ công nghệ mới nhất.
        </p>
      </section>

      {/* Categories / Filters */}
      <section className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
        {displayCategories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.id === "all" ? "/blog" : `/blog?category=${cat.id}`}
            className={`text-[12px] sm:text-label-md sm:font-label-md px-3 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all ${
              cat.active
                ? "bg-primary text-white shadow-sm hover:scale-95 transition-transform"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-variant border border-outline-variant/50 transition-colors"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-12 md:mb-section-padding-lg px-4 md:px-0">
          <article className="bg-surface-container-lowest rounded-[16px] border border-outline-variant/30 overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] hover:-translate-y-1 transition-all duration-300 grid md:grid-cols-2 gap-0 relative group">
            <div className="h-64 md:h-auto w-full bg-surface-variant relative overflow-hidden">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-secondary-container text-on-secondary-container font-semibold text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
                  Nổi bật
                </span>
                <span className="font-label-sm text-on-surface-variant">
                  {featuredPost.date}
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-4 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="font-body-md text-on-surface-variant mb-8 line-clamp-3">
                {featuredPost.description}
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 font-semibold text-label-md text-primary hover:text-primary-container transition-colors w-fit"
              >
                Đọc chi tiết <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </article>
        </section>
      )}

      {/* Post Grid */}
      {regularPosts.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter mb-12 md:mb-section-padding-lg px-4 md:px-0">
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </section>
      ) : (
        <section className="text-center py-12 text-on-surface-variant">
          Không tìm thấy bài viết nào trong danh mục này.
        </section>
      )}

      {/* Pagination */}
      {allPosts.length > 0 && (
        <div className="mb-section-padding-lg flex justify-center">
          <Pagination />
        </div>
      )}

      {/* Newsletter Banner */}
      <NewsletterBanner />
    </main>
  );
}
