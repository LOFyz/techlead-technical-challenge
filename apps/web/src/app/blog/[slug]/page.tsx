import { BlogService } from '@/services/blog.service';
import { MainLayout } from '@/components/templates/main-layout';
import { AuthorAvatar, CategoryBadge, PostDate } from '@/components/atoms';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await BlogService.getAllPostSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await BlogService.getPostBySlug(params.slug);
  if (!post) return { title: 'Post não encontrado' };

  return {
    title: post.title,
    description: post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await BlogService.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const categories = post.categories.edges.map((e: any) => e.node);

  return (
    <MainLayout>
      <article className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center gap-2">
            {categories.map((cat: any) => (
              <CategoryBadge key={cat.id} name={cat.name} slug={cat.slug} />
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm">
            {post.author && (
              <AuthorAvatar name={post.author.name} image={post.author.image} />
            )}
            <Separator orientation="vertical" className="h-4" />
            <PostDate date={post.date} />
          </div>
        </div>

        {post.featuredImage && (
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.featuredImage.sourceUrl}
              alt={post.featuredImage.altText || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div 
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </MainLayout>
  );
}
