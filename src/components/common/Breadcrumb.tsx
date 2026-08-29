import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-[15px] md:text-[16px] font-medium text-on-surface-variant flex-wrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-primary font-semibold" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
