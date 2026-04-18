import { useState } from 'react';
import { FileText, Copy, Check, BookOpen, Eye } from 'lucide-react';

const readmeContent = `# 📱 REST API Integration - Flutter App

## 🎯 Project Description
This Flutter application demonstrates the integration of a **public REST API** (JSONPlaceholder) to fetch, parse, and display data using both **ListView** and **GridView** widgets.

## 🌐 API Used
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- **Endpoints Used**:
  - \`GET /users\` - Fetches list of users
  - \`GET /posts\` - Fetches list of posts

## 📋 Features
- ✅ REST API integration using the \`http\` package
- ✅ JSON parsing with model classes (\`fromJson\` factory constructors)
- ✅ **ListView** display for both Users and Posts
- ✅ **GridView** display with toggle button
- ✅ Tab-based navigation (Users / Posts)
- ✅ Loading indicator while fetching data
- ✅ Error handling for API failures
- ✅ Material Design 3 UI

## 🏗️ Project Structure
\`\`\`
lib/
├── main.dart                  # App entry point
├── models/
│   ├── user.dart              # User model with JSON parsing
│   └── post.dart              # Post model with JSON parsing
├── services/
│   └── api_service.dart       # API service with HTTP calls
└── screens/
    └── home_screen.dart       # Main screen with ListView & GridView
\`\`\`

## 📦 Dependencies
\`\`\`yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
\`\`\`

## 🚀 How to Run
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/rest-api-flutter-app.git
   \`\`\`
2. Navigate to the project:
   \`\`\`bash
   cd rest-api-flutter-app
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   flutter pub get
   \`\`\`
4. Run the app:
   \`\`\`bash
   flutter run
   \`\`\`

## 📸 Output Description

### ListView Mode
- Users are displayed in a scrollable **ListView** with each item showing:
  - User avatar (first letter of name)
  - Full name
  - Email address
  - City
- Posts are displayed in a **ListView** with:
  - Post number
  - Title (single line, truncated)
  - Body preview (two lines)

### GridView Mode
- Users are displayed in a **2-column GridView** with:
  - Large circular avatar
  - Name (centered)
  - Email (centered)
  - City
- Posts are displayed in a **2-column GridView** with:
  - Post ID
  - Title (max 2 lines)
  - Body preview (max 4 lines)

### Toggle Feature
- A toggle button in the AppBar switches between ListView and GridView
- Both tabs (Users and Posts) respect the current view mode

## 🔄 API Flow
1. App starts → \`initState()\` triggers API calls
2. \`ApiService.fetchUsers()\` sends GET request to \`/users\`
3. Response JSON is decoded using \`json.decode()\`
4. JSON list is mapped to \`List<User>\` using \`User.fromJson()\`
5. \`FutureBuilder\` rebuilds UI when data is available
6. Data is displayed in ListView or GridView based on toggle

## 👤 Author
- **Name**: [Your Name]
- **Roll No**: [Your Roll Number]
- **Subject**: [Subject Name]

## 📄 License
This project is for educational purposes only.
`;

export default function ReadmeSection() {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(readmeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="readme" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <BookOpen className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">README.md Template</h2>
            <p className="text-sm text-slate-500">
              Copy this README for your GitHub repository
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Eye className="h-4 w-4" />
            {showPreview ? 'Source' : 'Preview'}
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy README'}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2">
          <FileText className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-mono text-slate-300">README.md</span>
        </div>
        {showPreview ? (
          <div className="max-h-[500px] overflow-auto bg-white p-6 prose prose-sm prose-slate max-w-none">
            <ReadmePreview content={readmeContent} />
          </div>
        ) : (
          <pre className="max-h-[500px] overflow-auto bg-slate-900 p-4 text-sm leading-relaxed">
            <code className="font-mono text-slate-300 whitespace-pre">{readmeContent}</code>
          </pre>
        )}
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h4 className="font-semibold text-blue-800">📝 Remember to customize:</h4>
        <ul className="mt-2 space-y-1 text-sm text-blue-700">
          <li>• Replace <code className="rounded bg-blue-100 px-1">YOUR_USERNAME</code> with your GitHub username</li>
          <li>• Add your actual name and roll number</li>
          <li>• Add screenshots of the running app (ListView & GridView modes)</li>
          <li>• Update the subject name</li>
        </ul>
      </div>
    </div>
  );
}

function ReadmePreview({ content }: { content: string }) {
  // Simple markdown-like rendering
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeKey = 0;

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${codeKey++}`} className="rounded-lg bg-slate-100 p-3 text-xs font-mono text-slate-700 overflow-x-auto my-2">
            {codeLines.join('\n')}
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-2xl font-bold text-slate-800 mt-4 mb-2">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-xl font-bold text-slate-700 mt-4 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg font-semibold text-slate-700 mt-3 mb-1">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code class="rounded bg-slate-100 px-1 text-xs">$1</code>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>');
      elements.push(<li key={i} className="text-sm text-slate-600 ml-4" dangerouslySetInnerHTML={{ __html: text }} />);
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      const text = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code class="rounded bg-slate-100 px-1 text-xs">$1</code>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>');
      elements.push(<p key={i} className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: text }} />);
    }
  });

  return <>{elements}</>;
}
