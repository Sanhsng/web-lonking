import React from "react";

export interface MissionVisionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconContainerClass: string;
  iconClass: string;
}

export function MissionVisionCard({
  icon,
  title,
  description,
  iconContainerClass,
  iconClass,
}: MissionVisionCardProps) {
  return (
    <div className="bg-surface-container-lowest p-10 rounded-[16px] border border-outline-variant/30 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${iconContainerClass}`}
      >
        <div className={`w-8 h-8 ${iconClass}`}>{icon}</div>
      </div>
      <h2 className="font-headline-md text-headline-md text-on-background mb-4">
        {title}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {description}
      </p>
    </div>
  );
}
