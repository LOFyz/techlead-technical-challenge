import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AuthorAvatar, CategoryBadge, PostDate } from '@/components/atoms';

// Fragment-based prop type — mirrors PostCardFragment shape
export interface PostCardData {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  date: string;
  featuredImage?: {
    sourceUrl: string;
    altText?: string | null;
  } | null;
  categories: {
    edges: Array<{ node: { id: string; name: string; slug: string } }>;
  };
  author?: {
    id: string;
    name: string;
    image?: string | null;
  } | null;
}

interface PostCardProps {
  post: PostCardData;
}

export function PostCard({ post }: PostCardProps) {
  const categories = post.categories.edges.map((e) => e.node);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full overflow-hidden border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {post.featuredImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.featuredImage.sourceUrl}
              alt={post.featuredImage.altText ?? post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader className="gap-2 pb-2">
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <CategoryBadge key={cat.id} name={cat.name} slug={cat.slug} />
            ))}
          </div>
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </CardHeader>
        {post.excerpt && (
          <CardContent className="pb-2">
            <p
              className="line-clamp-3 text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </CardContent>
        )}
        <CardFooter className="flex flex-col gap-3 pt-2">
          <Separator />
          <div className="flex w-full items-center justify-between">
            {post.author && (
              <AuthorAvatar name={post.author.name} image={post.author.image} size="sm" />
            )}
            <PostDate date={post.date} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
