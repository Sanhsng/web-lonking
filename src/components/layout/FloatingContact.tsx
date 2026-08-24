import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";





export function FloatingContact() {
  const zaloUrl = `https://zalo.me/${siteConfig.hotline.replace(/\s+/g, '')}`;
  const callUrl = `tel:${siteConfig.hotline.replace(/\s+/g, '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Facebook */}
      <Link
        href={siteConfig.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl relative group overflow-hidden"
      >
        <Image src="/images/facebook.svg" alt="Facebook" width={56} height={56} className="object-cover w-full h-full" />
        <span className="absolute right-16 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
          Chat Facebook
        </span>
      </Link>

      {/* Zalo */}
      <Link
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl relative group overflow-hidden"
      >
        <Image src="/images/zalo.svg" alt="Zalo" width={56} height={56} className="object-cover w-full h-full" />
        <span className="absolute right-16 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
          Chat Zalo
        </span>
      </Link>

      {/* Call */}
      <Link
        href={callUrl}
        className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl relative group"
      >
        <Phone className="w-6 h-6 animate-pulse" />
        <span className="absolute right-16 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
          {siteConfig.hotline}
        </span>
        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-50"></div>
      </Link>
    </div>
  );
}
