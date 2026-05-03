import { BlogService } from '@/services/blog.service';
import { MainLayout } from '@/components/templates/main-layout';
import { PostList } from '@/components/organisms/post-list';

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await BlogService.getLatestPosts(12);

  return (
    <MainLayout>
      <section className="space-y-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Últimos Artigos
            </h1>
            <p className="text-muted-foreground">
              Fique por dentro das últimas novidades em tecnologia e desenvolvimento.
            </p>
          </div>
        </div>
        <PostList posts={posts} />
      </section>
    </MainLayout>
  );
}
