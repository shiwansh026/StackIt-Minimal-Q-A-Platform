const API_BASE = 'http://localhost:8080/api';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchQuestions() {
  const res = await fetch(`${API_BASE}/questions`);
  return res.json();
}

export async function fetchQuestionById(id) {
  const res = await fetch(`${API_BASE}/questions/${id}`);
  return res.json();
}

export async function fetchAnswers(questionId) {
  const res = await fetch(`${API_BASE}/questions/${questionId}/answers`);
  return res.json();
}

export async function postQuestion(title, body) {
  const res = await fetch(`${API_BASE}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ title, body })
  });
  return res.json();
}

export async function postAnswer(questionId, body) {
  const res = await fetch(`${API_BASE}/questions/${questionId}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ body })
  });
  return res.json();
}

export async function apiLogin(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function apiRegister(username, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}
