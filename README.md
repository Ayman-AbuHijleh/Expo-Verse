# Student Expo Management Platform

A comprehensive full-stack application designed to facilitate university student project exhibitions and company engagement. This platform connects students showcasing their projects with companies seeking talent, featuring real-time chat, project management, feedback systems, and interactive booth mapping.

## 🚀 Project Overview

This platform serves as a digital hub for university expo events, enabling:
- **Students** to showcase their projects, connect with companies, and collaborate with peers
- **Companies** to discover talented students, view projects, and offer opportunities
- **Administrators** to manage exhibitions, monitor feedback, and oversee the entire expo ecosystem
- **Visitors** to explore projects and interact with participants

## 📋 Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🏗️ Architecture

The project follows a modern full-stack architecture with three main components:

```
├── backend/           # RESTful API Server (Node.js + Express)
├── mobile/            # Mobile Application (React Native + Expo)
└── web/               # Web Dashboard (React + Vite)
```

## ✨ Features

### For Students
- 📝 Create and manage project profiles with multimedia support
- 👥 Collaborate with project partners
- 📸 Upload project images and videos
- 💼 Browse company offerings and opportunities
- 💬 Real-time chat with companies and peers
- ⭐ Receive and view feedback from companies
- 🗺️ Interactive booth mapping
- 📄 CV and portfolio management

### For Companies
- 🔍 Discover student projects and talent
- 💼 Post job offerings and internship opportunities
- ⭐ Rate and provide feedback on projects
- 💬 Direct messaging with students
- 📊 Browse student profiles and skills
- 🎯 Filter students by major, skills, and year

### For Administrators
- 👥 User management (students, companies, visitors)
- 📊 Project oversight and approval
- 📈 Analytics and feedback monitoring
- 🏢 Company verification and management
- 🗺️ Booth allocation and mapping

### General Features
- 🔐 Secure JWT-based authentication
- 📧 Email verification system
- 📱 Responsive design (mobile & web)
- 🔥 Firebase integration for real-time chat
- ☁️ AWS S3 for file storage
- 🤖 Retrieval-Augmented Generation (RAG) to ground AI responses in relevant platform information
- 🛡️ Rate limiting and security middleware
- 🌐 RESTful API architecture

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **Email**: Nodemailer
- **Security**: bcryptjs, rate limiting middleware
- **Real-time**: Firebase Admin SDK
- **AI**: Retrieval-Augmented Generation (RAG) for context-grounded responses

### Mobile App
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: React Hooks & Context
- **HTTP Client**: Axios
- **Real-time Chat**: Firebase
- **UI Components**: Custom components with React Native
- **Media**: Expo Image Picker, Document Picker, AV

### Web Dashboard
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Authentication**: Context API

## 📁 Project Structure

### Backend (`backend/`)
```
backend/
├── config/                 # Configuration files
│   ├── db.js              # MySQL database connection
│   └── multer.js          # File upload configuration
├── controllers/           # Business logic
│   ├── userController.js
│   ├── studentController.js
│   ├── projectController.js
│   ├── companyController.js
│   ├── feedbackController.js
│   └── verificationController.js
├── middleware/            # Custom middleware
│   ├── auth.js           # JWT authentication
│   ├── rateLimiter.js    # Rate limiting
│   └── validation.js     # Request validation
├── models/               # Database models
│   ├── User.js
│   ├── Student.js
│   ├── Company.js
│   ├── Project.js
│   ├── Feedback.js
│   └── Offering.js
├── routes/               # API routes
│   ├── userRoutes.js
│   ├── studentRoutes.js
│   ├── projectRouts.js
│   ├── companyRoutes.js
│   ├── feedbackRoutes.js
│   └── chatRoutes.js
└── index.js             # Server entry point
```

### Mobile App (`mobile/`)
```
mobile/
├── apis/                # API service layer
│   ├── company/
│   ├── project/
│   ├── student/
│   └── user/
├── app/                 # App entry point
│   └── App.jsx
├── components/          # Reusable UI components
│   ├── button.js
│   ├── ChatListItem.jsx
│   ├── MessageBubble.jsx
│   ├── RatingModal.jsx
│   └── StarRating.jsx
├── constants/           # App constants
│   ├── config.js
│   └── constants.js
├── screens/             # Application screens
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── Student.jsx
│   ├── Company.jsx
│   ├── MyProjectScreen.jsx
│   ├── ChatListScreen.jsx
│   └── ConversationScreen.jsx
├── utils/              # Utility functions
│   ├── auth.js
│   ├── authService.js
│   └── chatService.js
└── validation/         # Form validation
    ├── validationLogin.jsx
    └── validationSignUp.jsx
```

### Web Dashboard (`web/`)
```
web/
├── src/
│   ├── api/            # API services
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── students.js
│   ├── Components/     # Shared components
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/        # React Context
│   │   └── AuthContext.jsx
│   ├── lib/           # Utilities
│   │   └── apiClient.js
│   ├── pages/         # Page components
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── students/
│   │   ├── companies/
│   │   └── student/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── index.html
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **npm** or **yarn**
- **AWS Account** (for S3 storage)
- **Firebase Project** (for real-time chat)
- **Expo CLI** (for mobile development)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd softwarepro-g
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create a .env file and add the variables listed below

# Configure environment variables (see below)
# Run database migrations/setup

npm run dev
```

#### 3. Mobile App Setup
```bash
cd mobile
npm install

# Configure firebase.js with your Firebase credentials
# Update constants/config.js with backend API URL

npm start
# or
expo start
```

#### 4. Web Dashboard Setup
```bash
cd web
npm install

# Update API base URL in src/lib/apiClient.js

npm run dev
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MYSQL_HOST=localhost
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=expo_db

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_bucket_name

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# CORS
CORS_ORIGIN=*

# Firebase (optional, for admin SDK)
FIREBASE_PROJECT_ID=your_project_id
```

### Mobile App
- Configure `firebase.js` with your Firebase project credentials
- Update `constants/config.js` with your backend API URL

### Web Dashboard
- Update `src/lib/apiClient.js` with your backend API URL

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Main Endpoints

#### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `POST /users/verify` - Verify email
- `POST /users/resend-verification` - Resend verification code

#### Students
- `GET /students/:id` - Get student profile
- `PUT /students/:id` - Update student profile
- `GET /students` - Get all students
- `POST /students/files` - Upload student files

#### Projects
- `POST /projects` - Create new project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects` - Get all projects
- `POST /projects/images` - Upload project images

#### Companies
- `GET /companies/:id` - Get company profile
- `PUT /companies/:id` - Update company profile
- `GET /companies` - Get all companies
- `POST /companies/offerings` - Create job offering

#### Feedback
- `POST /feedback` - Submit feedback/rating
- `GET /feedback/project/:id` - Get project feedback

#### Chat
- `GET /chats` - Get user conversations
- `POST /chats/message` - Send message

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Mobile App:**
```bash
cd mobile
npm start
# Then press 'a' for Android or 'i' for iOS
```

**Web Dashboard:**
```bash
cd web
npm run dev
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Mobile App:**
```bash
cd mobile
expo build:android
expo build:ios
```

**Web Dashboard:**
```bash
cd web
npm run build
npm run preview
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Email verification system
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Secure file upload handling
- Environment variable protection

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Team

Developed as a comprehensive student expo management solution.

## 📧 Contact

For questions or support, please contact the development team.

---

**Note**: Make sure to configure all environment variables and external services (AWS S3, Firebase, MySQL) before running the application.
