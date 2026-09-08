// Authentication module
const SUPABASE_URL = 'https://qinxnrcdsmxduhvrnzfh.supabase.co';
const SUPABASE_KEY = 'sb_publishable__o_Qj-DptS7XEcYyi9CrSQ_pY3E5RSX';

let supabase = null;

export async function initSupabase() {
  if (supabase) return supabase;
  // Supabase loaded via CDN in index.html
  if (typeof window.supabase === 'undefined') {
    throw new Error('Supabase SDK not loaded');
  }
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  return supabase;
}

export function getSupabase() {
  return supabase;
}

export async function initAuth() {
  try {
    await initSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await openApp();
    } else {
      showLogin();
    }
  } catch (error) {
    console.error('Auth init error:', error);
    showLogin();
  }
}

export async function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMsg('loginMsg', 'Email dan password wajib diisi.', 'err');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await openApp();
  } catch (error) {
    showMsg('loginMsg', error.message || 'Login gagal', 'err');
  }
}

export async function handleLogout() {
  await supabase.auth.signOut();
  location.reload();
}

async function openApp() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile || !['admin', 'editor'].includes(profile.role)) {
    await supabase.auth.signOut();
    showMsg('loginMsg', 'Akun ini belum memiliki akses Admin.', 'err');
    return;
  }

  document.getElementById('loginView').style.display = 'none';
  document.getElementById('appView').classList.add('active');
  document.getElementById('adminName').textContent = profile.full_name || user.email;

  // Load initial data
  const { loadCategories, loadDashboard } = await import('./db.js');
  await loadCategories();
  await loadDashboard();
}

function showLogin() {
  document.getElementById('loginView').style.display = 'grid';
  document.getElementById('appView').classList.remove('active');
}

function showMsg(id, text, type = 'ok') {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = 'notice ' + type;
  el.style.display = 'block';
  setTimeout(() => (el.style.display = 'none'), 4000);
}

export { showMsg };
