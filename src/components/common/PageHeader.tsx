import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

export function PageHeader({ title, description, breadcrumbItems }: PageHeaderProps) {
  return (
    <div className="mb-8 md:mb-12">
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <div className="mb-3 md:mb-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}
      <h1 className="text-[29px] sm:text-[32px] md:text-headline-xl font-bold text-on-surface mb-1 md:mb-2 leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-body-md md:text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
