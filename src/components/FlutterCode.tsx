import { useState } from 'react';
import { Code2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const codeFiles: { name: string; language: string; code: string }[] = [
  {
    name: 'pubspec.yaml',
    language: 'yaml',
    code: `name: rest_api_app
description: A Flutter app integrating REST API with ListView and GridView.

publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`,
  },
  {
    name: 'lib/main.dart',
    language: 'dart',
    code: `import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'REST API App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: Colors.blue,
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}`,
  },
  {
    name: 'lib/models/user.dart',
    language: 'dart',
    code: `class User {
  final int id;
  final String name;
  final String username;
  final String email;
  final String phone;
  final String website;
  final Address address;
  final Company company;

  User({
    required this.id,
    required this.name,
    required this.username,
    required this.email,
    required this.phone,
    required this.website,
    required this.address,
    required this.company,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      username: json['username'],
      email: json['email'],
      phone: json['phone'],
      website: json['website'],
      address: Address.fromJson(json['address']),
      company: Company.fromJson(json['company']),
    );
  }
}

class Address {
  final String street;
  final String suite;
  final String city;
  final String zipcode;

  Address({
    required this.street,
    required this.suite,
    required this.city,
    required this.zipcode,
  });

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      street: json['street'],
      suite: json['suite'],
      city: json['city'],
      zipcode: json['zipcode'],
    );
  }
}

class Company {
  final String name;
  final String catchPhrase;
  final String bs;

  Company({
    required this.name,
    required this.catchPhrase,
    required this.bs,
  });

  factory Company.fromJson(Map<String, dynamic> json) {
    return Company(
      name: json['name'],
      catchPhrase: json['catchPhrase'],
      bs: json['bs'],
    );
  }
}`,
  },
  {
    name: 'lib/models/post.dart',
    language: 'dart',
    code: `class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({
    required this.userId,
    required this.id,
    required this.title,
    required this.body,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
}`,
  },
  {
    name: 'lib/services/api_service.dart',
    language: 'dart',
    code: `import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';
import '../models/post.dart';

class ApiService {
  static const String baseUrl = 'https://jsonplaceholder.typicode.com';

  // Fetch Users - GET request and JSON parsing
  static Future<List<User>> fetchUsers() async {
    final response = await http.get(Uri.parse('\$baseUrl/users'));

    if (response.statusCode == 200) {
      List<dynamic> jsonList = json.decode(response.body);
      return jsonList.map((json) => User.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load users: \${response.statusCode}');
    }
  }

  // Fetch Posts - GET request and JSON parsing
  static Future<List<Post>> fetchPosts() async {
    final response = await http.get(Uri.parse('\$baseUrl/posts'));

    if (response.statusCode == 200) {
      List<dynamic> jsonList = json.decode(response.body);
      return jsonList.map((json) => Post.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load posts: \${response.statusCode}');
    }
  }
}`,
  },
  {
    name: 'lib/screens/home_screen.dart',
    language: 'dart',
    code: `import 'package:flutter/material.dart';
import '../models/user.dart';
import '../models/post.dart';
import '../services/api_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isGridView = false;

  late Future<List<User>> _usersFuture;
  late Future<List<Post>> _postsFuture;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _usersFuture = ApiService.fetchUsers();
    _postsFuture = ApiService.fetchPosts();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('REST API Demo'),
        actions: [
          IconButton(
            icon: Icon(_isGridView ? Icons.list : Icons.grid_view),
            onPressed: () {
              setState(() {
                _isGridView = !_isGridView;
              });
            },
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(icon: Icon(Icons.people), text: 'Users'),
            Tab(icon: Icon(Icons.article), text: 'Posts'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildUsersTab(),
          _buildPostsTab(),
        ],
      ),
    );
  }

  Widget _buildUsersTab() {
    return FutureBuilder<List<User>>(
      future: _usersFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(child: Text('Error: \${snapshot.error}'));
        }
        final users = snapshot.data!;

        if (_isGridView) {
          // GridView display
          return GridView.builder(
            padding: const EdgeInsets.all(12),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 0.85,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
            ),
            itemCount: users.length,
            itemBuilder: (context, index) {
              return _buildUserGridCard(users[index]);
            },
          );
        }

        // ListView display
        return ListView.builder(
          padding: const EdgeInsets.all(12),
          itemCount: users.length,
          itemBuilder: (context, index) {
            return _buildUserListTile(users[index]);
          },
        );
      },
    );
  }

  Widget _buildPostsTab() {
    return FutureBuilder<List<Post>>(
      future: _postsFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(child: Text('Error: \${snapshot.error}'));
        }
        final posts = snapshot.data!;

        if (_isGridView) {
          // GridView display
          return GridView.builder(
            padding: const EdgeInsets.all(12),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 1.0,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
            ),
            itemCount: posts.length,
            itemBuilder: (context, index) {
              return _buildPostGridCard(posts[index]);
            },
          );
        }

        // ListView display
        return ListView.builder(
          padding: const EdgeInsets.all(12),
          itemCount: posts.length,
          itemBuilder: (context, index) {
            return _buildPostListTile(posts[index]);
          },
        );
      },
    );
  }

  Widget _buildUserListTile(User user) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: CircleAvatar(
          child: Text(user.name[0]),
        ),
        title: Text(user.name),
        subtitle: Text(user.email),
        trailing: Text(user.address.city),
      ),
    );
  }

  Widget _buildUserGridCard(User user) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircleAvatar(
              radius: 30,
              child: Text(user.name[0], style: const TextStyle(fontSize: 24)),
            ),
            const SizedBox(height: 8),
            Text(user.name,
                style: const TextStyle(fontWeight: FontWeight.bold),
                textAlign: TextAlign.center),
            Text(user.email,
                style: const TextStyle(fontSize: 12),
                textAlign: TextAlign.center),
            Text(user.address.city,
                style: const TextStyle(color: Colors.grey)),
          ],
        ),
      ),
    );
  }

  Widget _buildPostListTile(Post post) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: CircleAvatar(child: Text('\${post.id}')),
        title: Text(post.title, maxLines: 1, overflow: TextOverflow.ellipsis),
        subtitle:
            Text(post.body, maxLines: 2, overflow: TextOverflow.ellipsis),
      ),
    );
  }

  Widget _buildPostGridCard(Post post) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('#\${post.id}',
                style: const TextStyle(
                    fontWeight: FontWeight.bold, color: Colors.blue)),
            const SizedBox(height: 4),
            Text(post.title,
                style: const TextStyle(fontWeight: FontWeight.bold),
                maxLines: 2,
                overflow: TextOverflow.ellipsis),
            const SizedBox(height: 4),
            Expanded(
              child: Text(post.body,
                  style: const TextStyle(fontSize: 12),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 4),
            ),
          ],
        ),
      ),
    );
  }
}`,
  },
];

export default function FlutterCode() {
  const [expandedFile, setExpandedFile] = useState<string | null>('lib/main.dart');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string, name: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="h-5 w-5 text-cyan-500" />
        <h3 className="text-lg font-semibold text-slate-800">Complete Flutter Project Code</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        Click on each file to expand and view the code. Use the copy button to copy the code.
      </p>

      {codeFiles.map((file) => {
        const isExpanded = expandedFile === file.name;
        const isCopied = copied === file.name;

        return (
          <div key={file.name} className="overflow-hidden rounded-xl border border-slate-200">
            <button
              onClick={() => setExpandedFile(isExpanded ? null : file.name)}
              className="flex w-full items-center justify-between bg-slate-800 px-4 py-2.5 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded bg-cyan-500/20 px-1.5 py-0.5 text-xs font-mono text-cyan-400">
                  {file.language}
                </span>
                <span className="text-sm font-mono text-slate-200">{file.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(file.code, file.name);
                  }}
                  className="rounded p-1 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                >
                  {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </button>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </div>
            </button>
            {isExpanded && (
              <pre className="max-h-96 overflow-auto bg-slate-900 px-4 py-3 text-sm leading-relaxed">
                <code className="text-slate-300 font-mono whitespace-pre">{file.code}</code>
              </pre>
            )}
          </div>
        );
      })}
    </div>
  );
}
