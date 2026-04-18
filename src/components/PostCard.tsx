import { MessageSquare, User } from 'lucide-react';
import type { Post, ViewMode } from '../types';

interface PostCardProps {
  post: Post;
  viewMode: ViewMode;
}

export default function PostCard({ post, viewMode }: PostCardProps) {
  const colors = [
    'bg-blue-50 text-blue-700',
    'bg-violet-50 text-violet-700',
    'bg-emerald-50 text-emerald-700',
    'bg-orange-50 text-orange-700',
    'bg-pink-50 text-pink-700',
    'bg-indigo-50 text-indigo-700',
    'bg-red-50 text-red-700',
    'bg-teal-50 text-teal-700',
    'bg-fuchsia-50 text-fuchsia-700',
    'bg-lime-50 text-lime-700',
  ];

  const color = colors[(post.userId - 1) % colors.length];

  if (viewMode === 'list') {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold capitalize text-slate-800 line-clamp-1">{post.title}</h3>
            </div>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{post.body}</p>
            <div className="mt-2 flex items-center gap-3">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
                <User className="h-3 w-3" /> User {post.userId}
              </span>
              <span className="text-xs text-slate-400">Post #{post.id}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
          <User className="h-3 w-3" /> User {post.userId}
        </span>
        <span className="text-xs text-slate-400">#{post.id}</span>
      </div>
      <h3 className="mt-3 font-semibold capitalize text-slate-800 line-clamp-2">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">{post.body}</p>
    </div>
  );
}
