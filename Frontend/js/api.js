// Detect if we're in production (deployed) or development (localhost)
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_BASE = isProduction ? '/api' : 'http://localhost:8080/api';

console.log('API_BASE:', API_BASE);
console.log('Current hostname:', window.location.hostname);
console.log('Is production:', isProduction);

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchQuestions() {
  try {
    console.log('Fetching questions from:', `${API_BASE}/questions`);
    const res = await fetch(`${API_BASE}/questions`);
    console.log('Questions response:', res.status, res.statusText);
    return res.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

export async function fetchQuestionById(id) {
  try {
    console.log('Fetching question from:', `${API_BASE}/questions/${id}`);
    const res = await fetch(`${API_BASE}/questions/${id}`);
    console.log('Question response:', res.status, res.statusText);
    return res.json();
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
}

export async function fetchAnswers(questionId) {
  try {
    console.log('Fetching answers from:', `${API_BASE}/questions/${questionId}/answers`);
    const res = await fetch(`${API_BASE}/questions/${questionId}/answers`);
    console.log('Answers response:', res.status, res.statusText);
    return res.json();
  } catch (error) {
    console.error('Error fetching answers:', error);
    return [];
  }
}

export async function postQuestion(title, body) {
  try {
    console.log('Posting question to:', `${API_BASE}/questions`);
    const res = await fetch(`${API_BASE}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ title, body })
    });
    console.log('Post question response:', res.status, res.statusText);
    return res.json();
  } catch (error) {
    console.error('Error posting question:', error);
    return { success: false, message: 'Network error' };
  }
}

export async function postAnswer(questionId, body) {
  try {
    console.log('Posting answer to:', `${API_BASE}/questions/${questionId}/answers`);
    const res = await fetch(`${API_BASE}/questions/${questionId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ body })
    });
    console.log('Post answer response:', res.status, res.statusText);
    return res.json();
  } catch (error) {
    console.error('Error posting answer:', error);
    return { success: false, message: 'Network error' };
  }
}

export async function apiLogin(username, password) {
  try {
    console.log('Login request to:', `${API_BASE}/login`);
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    console.log('Login response:', res.status, res.statusText);
    const data = await res.json();
    console.log('Login data:', data);
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function apiRegister(username, password) {
  try {
    console.log('Register request to:', `${API_BASE}/register`);
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    console.log('Register response:', res.status, res.statusText);
    const data = await res.json();
    console.log('Register data:', data);
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}
