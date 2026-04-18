import { FolderOpen, FileCode, File, ChevronRight } from 'lucide-react';

interface TreeItem {
  name: string;
  type: 'folder' | 'file';
  children?: TreeItem[];
  highlight?: boolean;
  description?: string;
}

const structure: TreeItem[] = [
  {
    name: 'rest_api_app/',
    type: 'folder',
    children: [
      {
        name: 'lib/',
        type: 'folder',
        children: [
          { name: 'main.dart', type: 'file', highlight: true, description: 'App entry point' },
          {
            name: 'models/',
            type: 'folder',
            children: [
              { name: 'user.dart', type: 'file', highlight: true, description: 'User model + JSON parsing' },
              { name: 'post.dart', type: 'file', highlight: true, description: 'Post model + JSON parsing' },
            ],
          },
          {
            name: 'services/',
            type: 'folder',
            children: [
              { name: 'api_service.dart', type: 'file', highlight: true, description: 'HTTP API calls' },
            ],
          },
          {
            name: 'screens/',
            type: 'folder',
            children: [
              { name: 'home_screen.dart', type: 'file', highlight: true, description: 'ListView & GridView UI' },
            ],
          },
        ],
      },
      {
        name: 'android/',
        type: 'folder',
        children: [
          {
            name: 'app/src/main/',
            type: 'folder',
            children: [
              { name: 'AndroidManifest.xml', type: 'file', description: 'Internet permission' },
            ],
          },
        ],
      },
      { name: 'pubspec.yaml', type: 'file', highlight: true, description: 'Dependencies (http package)' },
      { name: 'README.md', type: 'file', highlight: true, description: 'Output description' },
      { name: '.gitignore', type: 'file', description: 'Git ignore rules' },
    ],
  },
];

function TreeNode({ item, depth = 0 }: { item: TreeItem; depth?: number }) {
  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1 ${item.highlight ? 'text-blue-600 font-medium' : 'text-slate-600'}`}
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        {item.type === 'folder' ? (
          <>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <FolderOpen className="h-4 w-4 text-amber-500" />
          </>
        ) : (
          <>
            <span className="w-3" />
            {item.highlight ? (
              <FileCode className="h-4 w-4 text-blue-500" />
            ) : (
              <File className="h-4 w-4 text-slate-400" />
            )}
          </>
        )}
        <span className="text-sm font-mono">{item.name}</span>
        {item.description && (
          <span className="text-xs text-slate-400 ml-2">— {item.description}</span>
        )}
      </div>
      {item.children?.map((child, idx) => (
        <TreeNode key={idx} item={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function ProjectStructure() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <FolderOpen className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-slate-800">Flutter Project Structure</h3>
      </div>
      <div className="rounded-lg bg-slate-50 border border-slate-100 p-4">
        {structure.map((item, idx) => (
          <TreeNode key={idx} item={item} />
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        <FileCode className="inline h-3 w-3 text-blue-500" /> Blue highlighted files are the ones you need to create/modify.
      </p>
    </div>
  );
}
