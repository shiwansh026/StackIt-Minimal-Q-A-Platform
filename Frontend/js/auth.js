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
  
  try {
    const result = await apiLogin(username, password);
    if (result.token) {
      localStorage.setItem('jwt', result.token);
      window.router.navigate('/');
    } else {
      document.getElementById('loginError').textContent = result.message || 'Login failed';
    }
  } catch (error) {
    console.error('Login error:', error);
    document.getElementById('loginError').textContent = 'Network error. Please try again.';
  }
}

export async function registerUser(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  
  try {
    console.log('Attempting registration for:', username);
    const result = await apiRegister(username, password);
    console.log('Registration result:', result);
    
    if (result.success) {
      document.getElementById('registerError').textContent = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        window.router.navigate('/login');
      }, 1500);
    } else {
      document.getElementById('registerError').textContent = result.message || 'Registration failed';
    }
  } catch (error) {
    console.error('Registration error:', error);
    document.getElementById('registerError').textContent = 'Network error. Please try again.';
  }
}
