import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { getProducts } from '@/services/products'
import { getPosts } from '@/services/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // Fetch dynamic data
  const [products, posts] = await Promise.all([
    getProducts(),
    getPosts(),
  ])

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/careers',
    '/cau-hoi-thuong-gap',
    '/chinh-sach-bao-hanh',
    '/contact',
    '/huong-dan-van-hanh',
    '/khuyen-mai',
    '/khuyen-mai/quay-thuong',
    '/privacy-policy',
    '/products',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...postRoutes]
}
