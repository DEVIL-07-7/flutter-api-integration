import { LayoutList, LayoutGrid } from 'lucide-react';
import type { ViewMode } from '../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-1">
      <button
        onClick={() => onChange('list')}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${
          viewMode === 'list'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <LayoutList className="h-4 w-4" />
        ListView
      </button>
      <button
        onClick={() => onChange('grid')}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${
          viewMode === 'grid'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        GridView
      </button>
    </div>
  );
}
