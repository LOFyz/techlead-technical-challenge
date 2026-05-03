import { PostCard, PostCardData } from '../molecules/post-card';

interface PostListProps {
  posts: PostCardData[];
}

export function PostList({ posts }: PostListProps) {
  if (!posts.length) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-border p-8">
        <p className="text-muted-foreground">Nenhum post encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
