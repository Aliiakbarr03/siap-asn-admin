// Database operations
import { getSupabase, showMsg } from './auth.js';

let categories = [];

export async function loadCategories() {
  const sb = getSupabase();
  const { data } = await sb.from('categories').select('*').order('sort_order');
  categories = data || [];

  // Populate dropdowns
  ['qCategory', 'mCategory'].forEach(id => {
    const sel = document.getElementById(id);
    if (sel) {
      sel.innerHTML = '<option value="">Pilih kategori...</option>' +
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
  });
}

export async function loadDashboard() {
  const sb = getSupabase();
  try {
    const [usersRes, questionsRes, materialsRes, tryoutsRes] = await Promise.all([
      sb.from('profiles').select('*', { count: 'exact', head: true }),
      sb.from('questions').select('*', { count: 'exact', head: true }),
      sb.from('materials').select('*', { count: 'exact', head: true }),
      sb.from('tryouts').select('*', { count: 'exact', head: true })
    ]);

    document.getElementById('statUsers').textContent = usersRes.count || 0;
    document.getElementById('statQuestions').textContent = questionsRes.count || 0;
    document.getElementById('statMaterials').textContent = materialsRes.count || 0;
    document.getElementById('statTryouts').textContent = tryoutsRes.count || 0;
  } catch (error) {
    console.error('Dashboard load error:', error);
  }
}

export async function addCategory() {
  const sb = getSupabase();
  const name = document.getElementById('catName').value.trim();
  const slug = document.getElementById('catSlug').value.trim();

  if (!name || !slug) {
    showMsg('catMsg', 'Nama dan slug kategori wajib diisi.', 'err');
    return;
  }

  try {
    const { error } = await sb.from('categories').insert({
      name,
      slug,
      description: document.getElementById('catDescription').value.trim() || null,
      is_active: document.getElementById('catActive').checked
    });

    if (error) throw error;
    showMsg('catMsg', '✅ Kategori berhasil disimpan!');
    document.getElementById('catName').value = '';
    document.getElementById('catSlug').value = '';
    document.getElementById('catDescription').value = '';
    await loadCategories();
  } catch (error) {
    showMsg('catMsg', error.message, 'err');
  }
}

export async function addQuestion() {
  const sb = getSupabase();
  const payload = {
    category_id: document.getElementById('qCategory').value || null,
    subcategory: document.getElementById('qSubcategory').value.trim() || null,
    question_text: document.getElementById('qText').value.trim(),
    option_a: document.getElementById('qA').value.trim(),
    option_b: document.getElementById('qB').value.trim(),
    option_c: document.getElementById('qC').value.trim(),
    option_d: document.getElementById('qD').value.trim(),
    correct_answer: document.getElementById('qCorrect').value,
    difficulty: document.getElementById('qDifficulty').value
  };

  if (!payload.question_text || !payload.option_a || !payload.option_b || !payload.option_c || !payload.option_d) {
    showMsg('qMsg', 'Pertanyaan dan opsi A-D wajib diisi.', 'err');
    return;
  }

  try {
    const { error } = await sb.from('questions').insert(payload);
    if (error) throw error;
    showMsg('qMsg', '✓ Soal berhasil disimpan.');
    document.getElementById('qText').value = '';
    document.getElementById('qA').value = '';
    document.getElementById('qB').value = '';
    document.getElementById('qC').value = '';
    document.getElementById('qD').value = '';
  } catch (error) {
    showMsg('qMsg', error.message, 'err');
  }
}

export async function addMaterial() {
  const sb = getSupabase();
  const payload = {
    category_id: document.getElementById('mCategory').value || null,
    title: document.getElementById('mTitle').value.trim(),
    content: document.getElementById('mContent').value.trim()
  };

  if (!payload.title || !payload.content) {
    showMsg('mMsg', 'Judul dan isi materi wajib diisi.', 'err');
    return;
  }

  try {
    const { error } = await sb.from('materials').insert(payload);
    if (error) throw error;
    showMsg('mMsg', '✓ Materi berhasil disimpan.');
    document.getElementById('mTitle').value = '';
    document.getElementById('mContent').value = '';
  } catch (error) {
    showMsg('mMsg', error.message, 'err');
  }
}

export async function createTryout() {
  const sb = getSupabase();
  const title = document.getElementById('tTitle').value.trim();
  const duration = Number(document.getElementById('tDuration').value) || 100;

  if (!title) {
    showMsg('tMsg', 'Judul tryout wajib diisi.', 'err');
    return;
  }

  try {
    const { error } = await sb.from('tryouts').insert({
      title,
      duration_minutes: duration,
      status: 'active'
    });

    if (error) throw error;
    showMsg('tMsg', '✓ Tryout berhasil dibuat.');
    document.getElementById('tTitle').value = '';
    document.getElementById('tDuration').value = '100';
  } catch (error) {
    showMsg('tMsg', error.message, 'err');
  }
}
