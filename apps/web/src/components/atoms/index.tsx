import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface AuthorAvatarProps {
  name: string;
  image?: string | null;
  size?: 'sm' | 'md';
}

export function AuthorAvatar({ name, image, size = 'sm' }: AuthorAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <Avatar className={size === 'sm' ? 'h-7 w-7' : 'h-10 w-10'}>
        <AvatarImage src={image ?? undefined} alt={name} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <span className={`font-medium text-foreground ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {name}
      </span>
    </div>
  );
}

interface CategoryBadgeProps {
  name: string;
  slug: string;
}

export function CategoryBadge({ name }: CategoryBadgeProps) {
  return (
    <Badge variant="secondary" className="text-xs font-normal">
      {name}
    </Badge>
  );
}

interface PostDateProps {
  date: string;
}

export function PostDate({ date }: PostDateProps) {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

  return (
    <time dateTime={date} className="text-xs text-muted-foreground">
      {formatted}
    </time>
  );
}
