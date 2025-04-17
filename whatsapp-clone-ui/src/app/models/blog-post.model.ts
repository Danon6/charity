export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  featuredImage?: string;
  authorName?: string;
  author?: {
    id: string;
    name: string;
    avatar: string;
  };
  createdDate?: Date;
  publishedAt?: Date;
  tags?: string[];
}
