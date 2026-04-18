# 📱 REST API Integration - Flutter App

## 🎯 Project Description
This Flutter application demonstrates the integration of a **public REST API** (JSONPlaceholder) to fetch, parse, and display data using both **ListView** and **GridView** widgets.

## 🌐 API Used
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- **Endpoints Used**:
  - `GET /users` - Fetches list of users
  - `GET /posts` - Fetches list of posts

## 📋 Features
- ✅ REST API integration using the `http` package
- ✅ JSON parsing with model classes (`fromJson` factory constructors)
- ✅ **ListView** display for both Users and Posts
- ✅ **GridView** display with toggle button
- ✅ Tab-based navigation (Users / Posts)
- ✅ Loading indicator while fetching data
- ✅ Error handling for API failures
- ✅ Material Design 3 UI

## 🏗️ Project Structure
```
lib/
├── main.dart                  # App entry point
├── models/
│   ├── user.dart              # User model with JSON parsing
│   └── post.dart              # Post model with JSON parsing
├── services/
│   └── api_service.dart       # API service with HTTP calls
└── screens/
    └── home_screen.dart       # Main screen with ListView & GridView
```

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
1. App starts → `initState()` triggers API calls
2. `ApiService.fetchUsers()` sends GET request to `/users`
3. Response JSON is decoded using `json.decode()`
4. JSON list is mapped to `List<User>` using `User.fromJson()`
5. `FutureBuilder` rebuilds UI when data is available
6. Data is displayed in ListView or GridView based on toggle

## 👤 Author
- **Name**: [Vedant Gohil]
- **Roll No**: [20230905050506]
- **Subject**: [Android Development]

## 📄 License
This project is for educational purposes only.
