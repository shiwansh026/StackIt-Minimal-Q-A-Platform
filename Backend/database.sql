-- StackIt Q&A Platform Database Schema

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS qa_platform;
USE qa_platform;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    author VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE
);

-- Answers table
CREATE TABLE IF NOT EXISTS answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    body TEXT NOT NULL,
    author VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE
);

-- Insert some sample data
INSERT INTO users (username, password) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), -- password: password
('demo', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); -- password: password

INSERT INTO questions (title, body, author) VALUES 
('How do I get started with JavaScript?', 'I am new to programming and want to learn JavaScript. What are the best resources to start with?', 'demo'),
('What is the difference between let, const, and var?', 'I see these three ways to declare variables in JavaScript. When should I use each one?', 'demo');

INSERT INTO answers (question_id, body, author) VALUES 
(1, 'Start with MDN Web Docs and freeCodeCamp. They have excellent tutorials for beginners.', 'admin'),
(2, 'Use const for values that won\'t change, let for variables that will be reassigned, and avoid var (it has function scope issues).', 'admin'); 