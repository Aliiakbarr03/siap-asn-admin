// Main app initialization
import { initAuth, handleLogin, handleLogout } from './auth.js';
import { loadCategories, addCategory, addQuestion, addMaterial } from './db.js';
import { showPage, slugify } from './ui.js';

// Global functions for HTML onclick handlers
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.showPage = showPage;
window.slugify = slugify;
window.addCategory = addCategory;
window.addQuestion = addQuestion;
window.addMaterial = addMaterial;

// Initialize on load
window.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 SIAP ASN Admin Panel v2 (Vite) Loading...');
  await initAuth();
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('📱 App resumed');
  }
});

console.log('✅ Main module loaded');
