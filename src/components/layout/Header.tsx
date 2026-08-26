"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Globe, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState("VI");
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/blog", label: "Tin tức" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ];

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-on-background/80 backdrop-blur-xl border-b border-outline-variant/30 dark:border-outline/20 shadow-sm dark:shadow-none transition-all duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-6 lg:px-8 xl:px-16 h-20 md:h-24 relative">
        {/* Mobile Search Toggle (Left) */}
        <button
          aria-label="Tìm kiếm"
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
          }}
          className="lg:hidden text-on-surface p-2 -ml-2 transition-transform active:scale-95 flex items-center justify-center rounded-lg hover:bg-surface-variant/30"
        >
          <Search className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:left-auto z-10"
        >
          <Image
            src="/logo.png"
            alt="Lovol"
            width={300}
            height={100}
            className="object-contain h-16 md:h-20 w-auto"
            priority
          />
        </Link>
        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ease-in-out text-[14px] xl:text-[15px] font-semibold uppercase tracking-wide whitespace-nowrap px-4 py-2 ${isActive
                    ? "text-primary dark:text-primary-fixed-dim"
                    : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <div className="flex items-center gap-2 xl:gap-4 text-on-surface-variant">
            {/* <div className="relative">
              <button
                aria-label="Đổi ngôn ngữ"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-300 px-3 py-2 rounded-full active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Globe className="w-5 h-5 xl:w-6 xl:h-6" />
                <span className="font-bold text-label-sm">{lang}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white dark:bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-lg py-2 flex flex-col z-50">
                  <button 
                    onClick={() => { setLang("VI"); setIsLangOpen(false); }}
                    className={`text-left px-4 py-2.5 text-label-md hover:bg-surface-container-low transition-colors ${lang === "VI" ? "text-primary font-bold" : "text-on-surface"}`}
                  >
                    Tiếng Việt
                  </button>
                  <button 
                    onClick={() => { setLang("EN"); setIsLangOpen(false); }}
                    className={`text-left px-4 py-2.5 text-label-md hover:bg-surface-container-low transition-colors ${lang === "EN" ? "text-primary font-bold" : "text-on-surface"}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div> */}
            <button
              aria-label="Tìm kiếm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-300 p-2 rounded-full active:scale-95 flex items-center justify-center"
            >
              <Search className="w-5 h-5 xl:w-6 xl:h-6" />
            </button>
          </div>
          <div className="flex items-center gap-3 xl:gap-4">
            <a
              href={`tel:${siteConfig.hotline}`}
              className="text-[14px] xl:text-[16px] font-bold text-primary dark:text-primary-fixed-dim whitespace-nowrap hover:underline"
            >
              Hotline: {siteConfig.hotline}
            </a>
            <Link
              href="/contact#contact-form-section"
              className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-[14px] xl:text-[15px] px-4 py-2.5 xl:px-6 xl:py-3 rounded-full transition-all duration-200 active:scale-[0.98] shadow-sm font-bold uppercase tracking-wide whitespace-nowrap"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
        {/* Mobile Menu Toggle */}
        <button
          aria-label="Mở menu"
          className="lg:hidden text-on-surface p-3 transition-transform active:scale-95 flex items-center justify-center rounded-lg hover:bg-surface-variant/30"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-on-background/95 backdrop-blur-xl border-b border-outline-variant/30 dark:border-outline/20 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
          }`}
      >
        <div className="flex flex-col px-6 gap-2">
          {navLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[16px] font-semibold uppercase tracking-wide px-4 py-3 transition-colors ${isActive
                    ? "text-primary dark:text-primary-fixed-dim"
                    : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* <hr className="border-outline-variant/30 dark:border-outline/20 my-4 mx-4" />
          
          <div className="flex items-center gap-4 text-on-surface-variant px-4">
             Language selector commented out 
          </div> */}

          <div className="flex flex-col gap-4 mt-4">
            <a
              href={`tel:${siteConfig.hotline}`}
              className="text-[14px] font-bold text-primary dark:text-primary-fixed-dim whitespace-nowrap hover:underline"
            >
              Hotline: {siteConfig.hotline}
            </a>
            <Link
              href="/contact#contact-form-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-center hover:bg-on-primary-fixed-variant text-on-primary text-[15px] px-6 py-3 rounded-full transition-all duration-200 active:scale-[0.98] shadow-sm font-bold uppercase tracking-wide"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      </div>
      {/* Search Overlay/Dropdown */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-on-background/95 backdrop-blur-md border-b border-outline-variant/30 shadow-md p-4 animate-in slide-in-from-top-4">
          <form onSubmit={handleSearch} className="max-w-container-max mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập từ khoá tìm kiếm máy xúc, xe tải ben, máy ủi..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-full py-3 pl-12 pr-12 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
