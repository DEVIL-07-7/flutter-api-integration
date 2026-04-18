import { useState } from 'react';
import { RefreshCw, Database } from 'lucide-react';
import type { User, Post, Photo, ViewMode, DataTab } from '../types';
import { useApi } from '../hooks/useApi';
import TabSelector from './TabSelector';
import ViewToggle from './ViewToggle';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import UserCard from './UserCard';
import PostCard from './PostCard';
import PhotoCard from './PhotoCard';

export default function DataPanel() {
  const [activeTab, setActiveTab] = useState<DataTab>('users');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const usersApi = useApi<User>('users');
  const postsApi = useApi<Post>('posts');
  const photosApi = useApi<Photo>('photos?_limit=50');

  const getCurrentApi = () => {
    switch (activeTab) {
      case 'users':
        return usersApi;
      case 'posts':
        return postsApi;
      case 'photos':
        return photosApi;
    }
  };

  const currentApi = getCurrentApi();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-slate-700">
              API Data Explorer
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {currentApi.data.length} items
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            <button
              onClick={currentApi.refetch}
              disabled={currentApi.loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${currentApi.loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <TabSelector activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Content */}
      <div className="p-4">
        {currentApi.loading ? (
          <LoadingSpinner />
        ) : currentApi.error ? (
          <ErrorDisplay message={currentApi.error} onRetry={currentApi.refetch} />
        ) : (
          <>
            {activeTab === 'users' && (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                    : 'space-y-3'
                }
              >
                {usersApi.data.map((user) => (
                  <UserCard key={user.id} user={user} viewMode={viewMode} />
                ))}
              </div>
            )}
            {activeTab === 'posts' && (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                    : 'space-y-3'
                }
              >
                {postsApi.data.map((post) => (
                  <PostCard key={post.id} post={post} viewMode={viewMode} />
                ))}
              </div>
            )}
            {activeTab === 'photos' && (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                    : 'space-y-3'
                }
              >
                {photosApi.data.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} viewMode={viewMode} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
