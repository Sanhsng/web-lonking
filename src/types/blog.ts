export interface BlogCardProps {
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
}

export interface BlogCategory {
  id: string;
  label: string;
  active: boolean;
}
