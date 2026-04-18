import { Mail, Phone, Globe, Building2, MapPin } from 'lucide-react';
import type { User, ViewMode } from '../types';

interface UserCardProps {
  user: User;
  viewMode: ViewMode;
}

export default function UserCard({ user, viewMode }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-violet-500 to-purple-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-amber-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-blue-500',
    'from-red-500 to-orange-500',
    'from-teal-500 to-cyan-500',
    'from-fuchsia-500 to-pink-500',
    'from-lime-500 to-green-500',
  ];

  const color = colors[(user.id - 1) % colors.length];

  if (viewMode === 'list') {
    return (
      <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-lg font-bold text-white shadow-sm`}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-800">{user.name}</h3>
          <p className="text-sm text-slate-400">@{user.username}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Mail className="h-3 w-3" /> {user.email}
            </span>
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3" /> {user.phone}
            </span>
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3 w-3" /> {user.website}
            </span>
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3 w-3" /> {user.company.name}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {user.address.city}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md">
      <div className="flex flex-col items-center text-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${color} text-xl font-bold text-white shadow-md`}
        >
          {initials}
        </div>
        <h3 className="mt-3 font-semibold text-slate-800">{user.name}</h3>
        <p className="text-sm text-slate-400">@{user.username}</p>
        <div className="mt-3 space-y-1.5 text-xs text-slate-500 w-full">
          <p className="inline-flex items-center gap-1.5 truncate">
            <Mail className="h-3 w-3 flex-shrink-0" /> {user.email}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Phone className="h-3 w-3 flex-shrink-0" /> {user.phone.split(' ')[0]}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Building2 className="h-3 w-3 flex-shrink-0" /> {user.company.name}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3 flex-shrink-0" /> {user.address.city}
          </p>
        </div>
      </div>
    </div>
  );
}
