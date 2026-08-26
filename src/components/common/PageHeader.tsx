import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

export function PageHeader({ title, description, breadcrumbItems }: PageHeaderProps) {
  return (
    <div className="mb-12">
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb items={breadcrumbItems} />
      )}
      <h1 className="text-[32px] md:text-headline-xl font-bold text-on-surface mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-body-lg text-on-surface-variant max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
