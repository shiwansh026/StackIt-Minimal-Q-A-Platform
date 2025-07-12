# StackIt - Minimal Q&A Platform

A clean, modern Q&A platform built with Node.js, Express, MySQL, and vanilla JavaScript.

## Features

- 🔐 User authentication (login/register)
- ❓ Ask and answer questions
- 📱 Responsive design
- 🎨 Modern, clean UI
- ⚡ Fast and lightweight

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Start your MySQL server
2. Create the database and tables by running the SQL script:

```bash
mysql -u root -p < Backend/database.sql
```

Or manually execute the SQL commands in `Backend/database.sql`

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Update database configuration in `Backend/config/db.config.js` with your MySQL credentials:
```javascript
module.exports = {
  HOST: "localhost",
  USER: "your_username",
  PASSWORD: "your_password",
  DB: "qa_platform"
};
```

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The backend will run on `http://localhost:8080`

### 3. Frontend Setup

The frontend is a static SPA that can be served by the backend. Simply access:
```
http://localhost:8080
```

## Usage

### Default Users
- Username: `admin`, Password: `password`
- Username: `demo`, Password: `password`

### Features
- **Home**: View all questions
- **Login/Register**: Create account or sign in
- **Ask Question**: Post new questions (requires login)
- **View Questions**: Click on any question to view details and answers
- **Answer Questions**: Add answers to questions (requires login)

## Project Structure

```
StackIt/
├── Backend/
│   ├── config/
│   │   └── db.config.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── db.js
│   │   ├── userModel.js
│   │   ├── questionModel.js
│   │   └── answerModel.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── questions.js
│   │   └── answers.js
│   ├── database.sql
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── js/
    │   ├── api.js
    │   ├── auth.js
    │   ├── renderers.js
    │   ├── router.js
    │   └── utils.js
    ├── index.html
    ├── app.js
    └── style.css
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get specific question
- `POST /api/questions` - Create new question (requires auth)

### Answers
- `GET /api/questions/:id/answers` - Get answers for a question
- `POST /api/questions/:id/answers` - Add answer to question (requires auth)

## Technologies Used

- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MySQL with bcrypt for password hashing

## Development

### Adding New Features
1. Backend: Add routes in `Backend/routes/`
2. Frontend: Add renderers in `Frontend/js/renderers.js`
3. Update API calls in `Frontend/js/api.js`

### Styling
- CSS is in `Frontend/style.css`
- Uses modern CSS with flexbox and CSS Grid
- Responsive design for mobile devices

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- SQL injection prevention with parameterized queries
- CORS enabled for API access

## License

MIT License - feel free to use this project for learning or commercial purposes. 