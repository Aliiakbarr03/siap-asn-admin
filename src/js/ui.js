// UI utilities

export function showPage(id, btn) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show target page
  const targetPage = document.getElementById(id);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update nav button active state
  document.querySelectorAll('.navbtn').forEach(navbtn => {
    navbtn.classList.remove('active');
  });
  if (btn) {
    btn.classList.add('active');
    document.getElementById('pageTitle').textContent = btn.innerText.trim();
  }
}

export function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function safeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
