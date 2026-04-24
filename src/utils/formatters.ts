export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return 'только что';
  if (diffMinutes < 60) return `${diffMinutes} мин.`;
  if (diffHours < 24) return `${diffHours} ч.`;
  if (diffDays < 7) return `${diffDays} д.`;

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatSubscribers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}
