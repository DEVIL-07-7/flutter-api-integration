import { Users, FileText, Image } from 'lucide-react';
import type { DataTab } from '../types';

interface TabSelectorProps {
  activeTab: DataTab;
  onChange: (tab: DataTab) => void;
}

const tabs: { key: DataTab; label: string; icon: typeof Users; count?: string }[] = [
  { key: 'users', label: 'Users', icon: Users },
  { key: 'posts', label: 'Posts', icon: FileText },
  { key: 'photos', label: 'Photos', icon: Image },
];

export default function TabSelector({ activeTab, onChange }: TabSelectorProps) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
