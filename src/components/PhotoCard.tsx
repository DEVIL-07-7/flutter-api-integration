import { Image, Layers } from 'lucide-react';
import type { Photo, ViewMode } from '../types';

interface PhotoCardProps {
  photo: Photo;
  viewMode: ViewMode;
}

export default function PhotoCard({ photo, viewMode }: PhotoCardProps) {
  // Use picsum for reliable image loading
  const imageUrl = `https://picsum.photos/seed/${photo.id}/300/300`;
  const thumbUrl = `https://picsum.photos/seed/${photo.id}/150/150`;

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 transition hover:shadow-md">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <img
            src={thumbUrl}
            alt={photo.title}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class="flex h-full w-full items-center justify-center"><svg class="h-6 w-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium capitalize text-slate-700 line-clamp-1">{photo.title}</h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Image className="h-3 w-3" /> Photo #{photo.id}
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3 w-3" /> Album {photo.albumId}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={photo.title}
          className="h-full w-full object-cover transition hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-slate-50"><svg class="h-12 w-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;
          }}
        />
      </div>
      <div className="p-3">
        <p className="text-xs capitalize text-slate-600 line-clamp-2">{photo.title}</p>
        <p className="mt-1 text-xs text-slate-400">Album {photo.albumId}</p>
      </div>
    </div>
  );
}
