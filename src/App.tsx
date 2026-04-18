import { useState } from 'react';
import Header from './components/Header';
import DataPanel from './components/DataPanel';
import FlutterCode from './components/FlutterCode';
import GitHubSteps from './components/GitHubSteps';
import ReadmeSection from './components/ReadmeSection';
import ProjectStructure from './components/ProjectStructure';
import {
  Smartphone,
  Code2,
  BookOpen,
  ArrowUp,
  CheckCircle2,
  Zap,
  Database,
  LayoutGrid,
} from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

type Section = 'demo' | 'code' | 'structure' | 'github' | 'readme';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('demo');

  const navItems: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: 'demo', label: 'Live Demo', icon: <Smartphone className="h-4 w-4" /> },
    { key: 'code', label: 'Flutter Code', icon: <Code2 className="h-4 w-4" /> },
    { key: 'structure', label: 'Structure', icon: <LayoutGrid className="h-4 w-4" /> },
    { key: 'github', label: 'GitHub Steps', icon: <GithubIcon className="h-4 w-4" /> },
    { key: 'readme', label: 'README', icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-4 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm mb-4">
                <Zap className="h-3.5 w-3.5" />
                Active Learning Assignment (ALA)
              </div>
              <h2 className="text-3xl font-bold">
                REST API Integration in Flutter
              </h2>
              <p className="mt-3 text-blue-100 max-w-lg">
                Complete guide with live API demo, full Flutter source code, project structure,
                step-by-step GitHub upload instructions, and a ready-to-use README template.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm backdrop-blur-sm">
                  <Database className="h-4 w-4" />
                  JSONPlaceholder API
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm backdrop-blur-sm">
                  <LayoutGrid className="h-4 w-4" />
                  ListView & GridView
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Individual Assignment
                </div>
              </div>
            </div>

            {/* Requirements Card */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
              <h3 className="font-semibold text-lg mb-4">📋 ALA Requirements Checklist</h3>
              <ul className="space-y-3">
                {[
                  'Integrate a public REST API into Flutter app',
                  'Parse the JSON data using model classes',
                  'Display data using ListView widget',
                  'Display data using GridView widget',
                  'Upload complete project code on GitHub',
                  'Include output description in README',
                  'Submit only the GitHub repository link',
                  'Complete individually (not in groups)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-300" />
                    <span className="text-blue-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeSection === item.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {activeSection === 'demo' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Live API Demo
              </h3>
              <p className="mt-1 text-sm text-blue-600">
                This is a working demonstration of REST API integration. It fetches real data from{' '}
                <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  JSONPlaceholder API
                </a>
                , parses JSON responses, and displays them in both ListView and GridView formats — exactly what your Flutter app should do.
              </p>
            </div>
            <DataPanel />
          </div>
        )}

        {activeSection === 'code' && <FlutterCode />}
        {activeSection === 'structure' && <ProjectStructure />}
        {activeSection === 'github' && <GitHubSteps />}
        {activeSection === 'readme' && <ReadmeSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-slate-500">
            Flutter ALA — REST API Integration with ListView & GridView
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Using JSONPlaceholder API • Individual Assignment • Upload to GitHub
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-500 transition hover:bg-slate-50"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}
