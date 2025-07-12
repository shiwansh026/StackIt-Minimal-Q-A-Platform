import { apiLogin, apiRegister } from './api.js';

export function isAuthenticated() {
  return !!localStorage.getItem('jwt');
}

export function logout() {
  localStorage.removeItem('jwt');
}

export async function loginUser(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const result = await apiLogin(username, password);
  if (result.token) {
    localStorage.setItem('jwt', result.token);
    window.router.navigate('/');
  } else {
    document.getElementById('loginError').textContent = result.message || 'Login failed';
  }
}

export async function registerUser(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const result = await apiRegister(username, password);
  if (result.success) {
    window.router.navigate('/login');
  } else {
    document.getElementById('registerError').textContent = result.message || 'Registration failed';
  }
}
