import Router from './js/router.js';
import { renderHome, renderLogin, renderRegister, renderAsk, renderQuestionDetail } from './js/renderers.js';
import { isAuthenticated, logout } from './js/auth.js';

const routes = [
  { path: '/', template: () => renderHome() },
  { path: '/login', template: () => renderLogin() },
  { path: '/register', template: () => renderRegister() },
  { path: '/ask', template: () => renderAsk() },
  { path: '/question/:id', template: (params) => renderQuestionDetail(params.id) }
];

document.addEventListener('DOMContentLoaded', () => {
  // Show/hide nav links based on auth
  function updateNav() {
    const loggedIn = isAuthenticated();
    document.getElementById('login-link').style.display = loggedIn ? 'none' : '';
    document.getElementById('register-link').style.display = loggedIn ? 'none' : '';
    document.getElementById('ask-link').style.display = loggedIn ? '' : 'none';
    document.getElementById('logout-link').style.display = loggedIn ? '' : 'none';
  }
  
  updateNav();
  
  document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
    updateNav();
    router.navigate('/');
  });

  // Initialize router
  window.router = new Router(routes, updateNav);
});
