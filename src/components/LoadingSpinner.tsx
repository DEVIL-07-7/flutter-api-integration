import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <p className="mt-4 text-lg font-medium text-slate-500">Fetching data from API...</p>
      <p className="mt-1 text-sm text-slate-400">jsonplaceholder.typicode.com</p>
    </div>
  );
}
