# StackIt - Minimal Q&A Platform

A modern, responsive Q&A platform built with Node.js, Express, MySQL, and vanilla JavaScript. Perfect for developers to ask questions, share knowledge, and build communities.

## 🌐 Live Demo

**Deployed on Railway:**  
[https://stackit-qa-platform-production.up.railway.app/](https://stackit-qa-platform-production.up.railway.app/)

---

## ✨ Features

- 🔐 **User Authentication** (JWT-based, secure password hashing)
- ❓ **Ask & Answer Questions** (full CRUD for Q&A)
- 💬 **Threaded Answers** (answers per question)
- 🏷️ **Author Attribution** (see who posted what)
- 📱 **Responsive Design** (mobile, tablet, desktop)
- ⚡ **SPA Experience** (fast, seamless navigation)
- 🛡️ **Security** (CORS, SQL injection prevention)
- 🗃️ **MySQL Database** (persistent storage)
- 🖥️ **Modern UI/UX** (clean, intuitive interface)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/shiwansh026/StackIt-Minimal-Q-A-Platform.git
cd StackIt-Minimal-Q-A-Platform
```

### 2. Set Up Database
```bash
# Run the SQL script in your MySQL client
mysql -u root -p < Backend/database.sql
```

### 3. Install Dependencies
```bash
cd Backend
npm install
```

### 4. Configure Environment
Create a `.env` file in the Backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=qa_platform
JWT_SECRET=your_super_secret_key
PORT=8080
NODE_ENV=development
```

### 5. Start the Server
```bash
npm start
```

### 6. Open Your Browser
Navigate to: `http://localhost:8080`

---

## 🔑 Default Users

For testing purposes, the database includes these default users:
- **Username:** `admin` | **Password:** `password`
- **Username:** `demo` | **Password:** `password`

---

## 📁 Project Structure

```
StackIt/
├── Backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── database.sql        # Database schema
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── Frontend/               # Vanilla JavaScript SPA
│   ├── js/                 # Modular JavaScript
│   │   ├── api.js          # API communication
│   │   ├── auth.js         # Authentication logic
│   │   ├── renderers.js    # UI rendering
│   │   └── router.js       # Client-side routing
│   ├── index.html          # Main page
│   ├── app.js              # Application entry point
│   └── style.css           # Modern styling
├── render.yml              # Render deployment config
├── railway.json            # Railway deployment config
└── README.md               # This file
```

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT, bcryptjs
- **Deployment:** Railway, Render

---

## 🌐 Deployment

### Railway.com (Recommended)
1. Connect your GitHub repository to Railway
2. Create a new project and add a MySQL database
3. Set environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your_super_secret_key
   DB_HOST=your_railway_mysql_host
   DB_USER=your_railway_mysql_user
   DB_PASSWORD=your_railway_mysql_password
   DB_NAME=your_railway_mysql_database
   ```
4. Deploy and get your live URL!

### Render.com (Alternative)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables (as above)
4. Deploy and get your live URL!

---

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get specific question
- `POST /api/questions` - Create new question (requires auth)

### Answers
- `GET /api/questions/:id/answers` - Get answers for a question
- `POST /api/questions/:id/answers` - Add answer (requires auth)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the StackIt Team**

**Live Demo:** [https://stackit-qa-platform-production.up.railway.app/](https://stackit-qa-platform-production.up.railway.app/)