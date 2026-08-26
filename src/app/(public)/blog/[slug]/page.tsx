import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Share2, Link as LinkIcon, Mail, ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getPostBySlug, getPosts } from "@/services/blog";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

function processHtmlAndExtractTOC(html: string) {
  const toc: { id: string; text: string; level: number }[] = [];
  if (!html) return { processedHtml: "", toc };

  const processedHtml = html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, levelStr, attrs, content) => {
    const level = parseInt(levelStr, 10);
    const cleanText = content.replace(/(<([^>]+)>)/gi, "").trim();

    let id = cleanText
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!id) id = `heading-${Math.random().toString(36).substring(2, 11)}`;

    let finalId = id;
    let counter = 1;
    while (toc.find(t => t.id === finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }

    if (!attrs.includes('id=')) {
      toc.push({ id: finalId, text: cleanText, level });
      return `<h${level}${attrs} id="${finalId}">${content}</h${level}>`;
    } else {
      const idMatch = attrs.match(/id="([^"]+)"/);
      const existingId = idMatch ? idMatch[1] : finalId;
      toc.push({ id: existingId, text: cleanText, level });
      return match;
    }
  });

  return { processedHtml, toc };
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Không tìm thấy trang" };
  }

  const plainExcerpt = post.excerpt?.replace(/(<([^>]+)>)/gi, "") || "";

  return {
    title: `${post.title} - Titan Heavy`,
    description: plainExcerpt,
  };
}

export default async function BlogDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Fetch all posts to get related posts (e.g. latest 3 excluding current)
  const allPosts = await getPosts();
  const relatedPostsData = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  const relatedPosts = relatedPostsData.map(p => {
    const plainExcerpt = p.excerpt?.replace(/(<([^>]+)>)/gi, "") || "Không có mô tả.";
    return {
      slug: p.slug,
      category: p.categories?.nodes?.[0]?.name || "Tin tức",
      title: p.title,
      description: plainExcerpt,
      image: p.featuredImage?.node?.sourceUrl || "https://placehold.co/600x400?text=No+Image",
      date: new Date(p.date).toLocaleDateString("vi-VN", {
        day: "2-digit", month: "short", year: "numeric",
      }),
      readTime: p.blogFields?.readTime ? `${p.blogFields.readTime} đọc` : "",
    };
  });

  const categoryName = post.categories?.nodes?.[0]?.name || "Tin tức";
  const categorySlug = post.categories?.nodes?.[0]?.slug || "tin-tuc";
  const dateFormatted = new Date(post.date).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const readTimeStr = post.blogFields?.readTime ? ` • ${post.blogFields.readTime} đọc` : "";

  const { processedHtml, toc } = processHtmlAndExtractTOC(post.content || "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.featuredImage?.node?.sourceUrl || `${siteConfig.url}/images/banners/about-banner.jpg`,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.blogFields?.authorName || "LOVOL Việt Nam"
    }
  };

  return (
    <div className="flex-grow pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs & Meta */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-8 py-8">
        <nav className="flex items-center gap-2 text-[15px] md:text-[16px] font-medium text-outline mb-8">
          <Link href="/blog" className="hover:text-primary transition-colors">
            Tin tức
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/blog?category=${categorySlug}`} className="hover:text-primary transition-colors">
            {categoryName}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-on-surface line-clamp-1">{post.title}</span>
        </nav>

        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-semibold uppercase tracking-wider">
              {categoryName}
            </span>
            <span className="text-label-sm text-outline">
              {dateFormatted}{readTimeStr}
            </span>
          </div>
          <h1 className="text-headline-xl font-bold text-on-primary-fixed">
            {post.title}
          </h1>

          {/* If excerpt exists, show it as introductory text */}
          {post.excerpt && (
            <div
              className="text-body-lg text-on-surface-variant max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}

          {/* Author Info */}
          {(post.blogFields?.authorName) && (
            <div className="flex items-center gap-4 mt-4">
              {post.blogFields?.authorAvatar?.node?.sourceUrl && (
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant relative">
                  <Image
                    src={post.blogFields.authorAvatar.node.sourceUrl}
                    alt={post.blogFields.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="text-label-md font-semibold text-on-surface">
                  {post.blogFields.authorName}
                </div>
                {post.blogFields?.authorRole && (
                  <div className="text-label-sm text-outline">
                    {post.blogFields.authorRole}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hero Image */}
      {post.featuredImage?.node?.sourceUrl && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-8 mb-section-padding-lg">
          <div className="w-full h-[300px] md:h-[500px] rounded-[16px] overflow-hidden relative shadow-[0_2px_4px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.05)]">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Main Article Shell */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-8 pb-section-padding-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Sticky Sidebar (TOC & Share) */}
          <aside className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-32 bg-white/75 backdrop-blur-md border border-white p-6 rounded-[16px] shadow-[0_2px_4px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.05)]">
              <TableOfContents toc={toc} />

              <h3 className="text-label-sm text-outline mb-4 uppercase tracking-wider font-semibold">
                Chia sẻ Bài viết
              </h3>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors">
                  <LinkIcon className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Article Body */}
          <article
            className="col-span-1 lg:col-span-8 lg:col-start-4 text-on-surface-variant text-lg leading-relaxed
              [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-on-surface [&_h2]:mt-10 [&_h2]:mb-4 
              [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-on-surface [&_h3]:mt-8 [&_h3]:mb-4
              [&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-on-surface [&_h4]:mt-6 [&_h4]:mb-3
              [&_p]:mb-6 
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
              [&_li]:pl-1
              [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:object-cover
              [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-container
              [&_strong]:font-bold [&_strong]:text-on-surface"
            dangerouslySetInnerHTML={{ __html: processedHtml || "<p>Nội dung đang được cập nhật...</p>" }}
          />
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-surface-container-low py-section-padding-lg">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-headline-lg font-bold text-on-surface mb-2">
                  Bài viết liên quan
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Khám phá thêm thông tin chi tiết từ chuyên mục này.
                </p>
              </div>
              <Link
                href={`/blog?category=${categorySlug}`}
                className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors"
              >
                Xem tất cả <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.slug} {...rPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
