import { useState } from 'react';
import {
  Terminal,
  FolderOpen,
  Upload,
  Globe,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface Step {
  number: number;
  title: string;
  icon: React.ReactNode;
  commands: { cmd: string; desc: string }[];
  note?: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Create Flutter Project',
    icon: <FolderOpen className="h-5 w-5" />,
    commands: [
      { cmd: 'flutter create rest_api_app', desc: 'Create a new Flutter project' },
      { cmd: 'cd rest_api_app', desc: 'Navigate into the project directory' },
    ],
    note: 'Make sure Flutter SDK is installed. Run "flutter doctor" to verify.',
  },
  {
    number: 2,
    title: 'Add Dependencies',
    icon: <Terminal className="h-5 w-5" />,
    commands: [
      { cmd: 'flutter pub add http', desc: 'Add the HTTP package for API calls' },
    ],
    note: 'The http package is required for making REST API calls.',
  },
  {
    number: 3,
    title: 'Add the Code Files',
    icon: <FolderOpen className="h-5 w-5" />,
    commands: [
      { cmd: 'mkdir -p lib/models lib/services lib/screens', desc: 'Create the folder structure' },
      { cmd: '# Copy the code from the "Flutter Code" section above', desc: 'Add each file to its respective folder' },
    ],
    note: 'Create the files: lib/models/user.dart, lib/models/post.dart, lib/services/api_service.dart, lib/screens/home_screen.dart, and update lib/main.dart',
  },
  {
    number: 4,
    title: 'Add Internet Permission (Android)',
    icon: <AlertCircle className="h-5 w-5" />,
    commands: [
      {
        cmd: '# In android/app/src/main/AndroidManifest.xml add:\n<uses-permission android:name="android.permission.INTERNET"/>',
        desc: 'Required for API calls on Android',
      },
    ],
    note: 'Add this line inside the <manifest> tag, before the <application> tag.',
  },
  {
    number: 5,
    title: 'Test the App',
    icon: <CheckCircle2 className="h-5 w-5" />,
    commands: [
      { cmd: 'flutter run', desc: 'Run the app on a connected device or emulator' },
      { cmd: 'flutter build apk', desc: 'Build the APK for release (optional)' },
    ],
    note: 'Ensure an emulator is running or a physical device is connected.',
  },
  {
    number: 6,
    title: 'Initialize Git & Create Repository',
    icon: <GithubIcon className="h-5 w-5" />,
    commands: [
      { cmd: 'git init', desc: 'Initialize a new Git repository' },
      { cmd: 'git add .', desc: 'Stage all project files' },
      { cmd: 'git commit -m "Initial commit: REST API app with ListView & GridView"', desc: 'Create the first commit' },
    ],
  },
  {
    number: 7,
    title: 'Create GitHub Repository & Push',
    icon: <Upload className="h-5 w-5" />,
    commands: [
      { cmd: '# Go to github.com → Click "+" → "New repository"', desc: 'Create a new repository on GitHub' },
      { cmd: '# Name it: rest-api-flutter-app', desc: 'Give it a descriptive name' },
      { cmd: 'git branch -M main', desc: 'Rename branch to main' },
      { cmd: 'git remote add origin https://github.com/YOUR_USERNAME/rest-api-flutter-app.git', desc: 'Link to remote repository' },
      { cmd: 'git push -u origin main', desc: 'Push code to GitHub' },
    ],
    note: 'Replace YOUR_USERNAME with your actual GitHub username.',
  },
  {
    number: 8,
    title: 'Add README with Output Description',
    icon: <Globe className="h-5 w-5" />,
    commands: [
      { cmd: '# Create/edit README.md in project root', desc: 'Add project description and screenshots' },
      { cmd: 'git add README.md', desc: 'Stage the README' },
      { cmd: 'git commit -m "Add README with output description"', desc: 'Commit the README' },
      { cmd: 'git push', desc: 'Push to GitHub' },
    ],
    note: 'Include app screenshots, output description, API used, and features list in the README.',
  },
];

export default function GitHubSteps() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = async (cmd: string) => {
    await navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div id="github-steps" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
          <GithubIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Step-by-Step GitHub Upload Guide</h2>
          <p className="text-sm text-slate-500">Follow these steps to complete and submit your ALA</p>
        </div>
      </div>

      {/* Prerequisite */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 flex-shrink-0 text-amber-500 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800">Prerequisites</h4>
            <ul className="mt-1 space-y-1 text-sm text-amber-700">
              <li>• Flutter SDK installed (<code className="rounded bg-amber-100 px-1">flutter --version</code>)</li>
              <li>• Git installed (<code className="rounded bg-amber-100 px-1">git --version</code>)</li>
              <li>• GitHub account created</li>
              <li>• Android Studio / VS Code with Flutter extension</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="relative space-y-6">
        {/* Timeline line */}
        <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-slate-200" />

        {steps.map((step) => (
          <div key={step.number} className="relative flex gap-4">
            {/* Step number */}
            <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-200">
              {step.number}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-500">{step.icon}</span>
                <h3 className="font-semibold text-slate-800">{step.title}</h3>
              </div>

              <div className="space-y-2">
                {step.commands.map((command, idx) => (
                  <div key={idx} className="group rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                    <div className="flex items-start gap-2 p-3">
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <code className="block text-sm font-mono text-slate-700 break-all whitespace-pre-wrap">{command.cmd}</code>
                        <p className="mt-1 text-xs text-slate-400">{command.desc}</p>
                      </div>
                      {!command.cmd.startsWith('#') && (
                        <button
                          onClick={() => handleCopy(command.cmd)}
                          className="flex-shrink-0 rounded p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                        >
                          {copiedCmd === command.cmd ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {step.note && (
                <p className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  {step.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
