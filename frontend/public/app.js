// Base URL for the backend API
const api = path => 'http://localhost:3001' + path;

// Helper to get stored JWT token
const token = () => localStorage.getItem('token');

// Logout and redirect to login page
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
