import { fetchQuestions, fetchQuestionById, postQuestion, postAnswer, fetchAnswers } from './api.js';
import { isAuthenticated, loginUser, registerUser } from './auth.js';

// Render Home (Questions List)
export function renderHome() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Recent Questions</h2><div id="questions-list">Loading...</div>';

  fetchQuestions().then(questions => {
    const list = document.getElementById('questions-list');
    list.innerHTML = '';
    if (!questions.length) {
      list.innerHTML = '<p>No questions yet. Be the first to ask!</p>';
    }
    questions.forEach(q => {
      const div = document.createElement('div');
      div.className = 'question-card';
      div.innerHTML = `<a href="/question/${q.id}" data-link>${q.title}</a>
        <div class="meta">Asked by ${q.author} on ${q.created_at ? new Date(q.created_at).toLocaleString() : ''}</div>`;
      list.appendChild(div);
    });
  });
}

// Render Login
export function renderLogin() {
  if (isAuthenticated()) {
    window.router.navigate('/');
    return;
  }
  
  document.getElementById('app').innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input type="text" id="username" placeholder="Username" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div id="loginError" class="error"></div>
    <p>Don't have an account? <a href="/register" data-link>Register here</a></p>
  `;
  
  document.getElementById('loginForm').addEventListener('submit', loginUser);
}

// Render Register
export function renderRegister() {
  if (isAuthenticated()) {
    window.router.navigate('/');
    return;
  }
  
  document.getElementById('app').innerHTML = `
    <h2>Register</h2>
    <form id="registerForm">
      <input type="text" id="reg-username" placeholder="Username" required />
      <input type="password" id="reg-password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <div id="registerError" class="error"></div>
    <p>Already have an account? <a href="/login" data-link>Login here</a></p>
  `;
  
  document.getElementById('registerForm').addEventListener('submit', registerUser);
}

// Render Question Detail
export function renderQuestionDetail(id) {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Loading question...</h2>';

  fetchQuestionById(id).then(q => {
    if (!q) {
      app.innerHTML = '<h2>Question not found.</h2>';
      return;
    }
    app.innerHTML = `
      <h2>${q.title}</h2>
      <p>${q.body}</p>
      <div class="meta">Asked by ${q.author} on ${q.created_at ? new Date(q.created_at).toLocaleString() : ''}</div>
      <h3>Answers</h3>
      <div id="answers-list">Loading...</div>
      ${isAuthenticated() ? `
      <form id="answer-form">
        <textarea id="answer-body" required placeholder="Your answer"></textarea>
        <button type="submit">Submit Answer</button>
      </form>
      <div id="answerError" class="error"></div>
      ` : '<p><a href="/login" data-link>Login</a> to answer.</p>'}
    `;

    // Fetch and render answers
    fetchAnswers(id).then(answers => {
      const answersList = document.getElementById('answers-list');
      answersList.innerHTML = '';
      if (!answers.length) {
        answersList.innerHTML = '<p>No answers yet.</p>';
      }
      answers.forEach(ans => {
        const div = document.createElement('div');
        div.className = 'answer-card';
        div.innerHTML = `<p>${ans.body}</p>
          <div class="meta">By ${ans.author} on ${ans.created_at ? new Date(ans.created_at).toLocaleString() : ''}</div>`;
        answersList.appendChild(div);
      });
    });

    // Handle answer form
    const answerForm = document.getElementById('answer-form');
    if (answerForm) {
      answerForm.addEventListener('submit', async e => {
        e.preventDefault();
        const body = document.getElementById('answer-body').value;
        const result = await postAnswer(id, body);
        if (result.success) {
          renderQuestionDetail(id); // Refresh answers
        } else {
          document.getElementById('answerError').textContent = result.message || 'Failed to post answer';
        }
      });
    }
  });
}

// Render Ask Question
export function renderAsk() {
  if (!isAuthenticated()) {
    window.router.navigate('/login');
    return;
  }
  document.getElementById('app').innerHTML = `
    <h2>Ask a Question</h2>
    <form id="askForm">
      <input type="text" id="question-title" placeholder="Title" required />
      <textarea id="question-body" placeholder="Your question" required></textarea>
      <button type="submit">Submit</button>
    </form>
    <div id="askError" class="error"></div>
  `;
  document.getElementById('askForm').addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('question-title').value;
    const body = document.getElementById('question-body').value;
    const result = await postQuestion(title, body);
    if (result.success) {
      window.router.navigate('/');
    } else {
      document.getElementById('askError').textContent = result.message || 'Failed to post question';
    }
  });
}
