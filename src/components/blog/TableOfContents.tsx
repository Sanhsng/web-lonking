"use client";

import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ toc }: { toc: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length === 0) return;

    // Set initial active id to the first item
    if (!activeId) {
      setActiveId(toc[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px" } 
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="mb-8 pb-8 border-b border-outline-variant/30">
      <h3 className="text-label-md text-on-surface mb-4 uppercase tracking-wider font-semibold">
        Trong bài viết này
      </h3>
      <nav className="flex flex-col gap-1 border-l-[2px] border-outline-variant/30">
        {toc.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={`${item.id}-${index}`}
              href={`#${item.id}`}
              className={`text-label-md transition-colors relative block py-1.5
                ${
                  isActive
                    ? "text-primary font-semibold"
                    : item.level === 2
                    ? "text-on-surface-variant hover:text-primary font-medium"
                    : "text-outline hover:text-primary"
                }
              `}
            >
              {isActive && (
                <span className="absolute -left-[2px] top-1.5 bottom-1.5 w-[2px] bg-primary rounded-full" />
              )}
              <span className={`block ${item.level === 3 ? "pl-7" : "pl-4"}`}>
                {item.text}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
