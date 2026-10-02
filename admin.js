(() => {
  const C = window.TWH || {};
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!C.SUPABASE_URL || !C.SUPABASE_ANON_KEY) { $('#loginMsg').textContent = 'Add SUPABASE_URL and SUPABASE_ANON_KEY in js/config.js first.'; return; }
  const sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY);
  const F = ['title','industry','description','url','image_url','sort_order'];

  async function show() {
    const { data: { session } } = await sb.auth.getSession();
    $('#login').hidden = !!session; $('#app').hidden = !session;
    if (session) { loadProjects(); loadEnquiries(); }
  }
  $('#loginForm').onsubmit = async e => {
    e.preventDefault();
    const { error } = await sb.auth.signInWithPassword({ email: $('#em').value.trim(), password: $('#pw').value });
    if (error) $('#loginMsg').textContent = 'Sign in failed: ' + error.message; else show();
  };
  $('#logout').onclick = async () => { await sb.auth.signOut(); show(); };

  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => {
    document.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('on', x === b));
    $('#projects').hidden = b.dataset.tab !== 'projects'; $('#enquiries').hidden = b.dataset.tab !== 'enquiries';
  });

  /* Projects */
  let projects = [];
  async function loadProjects() {
    const { data, error } = await sb.from('projects').select('*').order('sort_order');
    if (error) { $('#pList').textContent = error.message; return; }
    projects = data;
    $('#pList').innerHTML = data.length ? data.map(p => `
      <div class="item"><div><b>${esc(p.title)}</b>${p.published ? '' : '<span class="badge">Hidden</span>'}<small>${esc(p.industry)} | order ${p.sort_order}</small><p>${esc(p.description)}</p></div>
      <div class="btns"><button class="btn ghost" data-edit="${p.id}">Edit</button><button class="btn danger" data-del="${p.id}">Delete</button></div></div>`).join('')
      : '<p>No projects yet. Add your first project above.</p>';
  }
  $('#pList').onclick = async e => {
    const id = e.target.dataset.edit, del = e.target.dataset.del;
    if (id) {
      const p = projects.find(x => x.id === id);
      $('#pId').value = p.id; F.forEach(f => $('#' + f).value = p[f] ?? ''); $('#published').checked = p.published;
      $('#pTitle').textContent = 'Edit project'; scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (del && confirm('Delete this project?')) { await sb.from('projects').delete().eq('id', del); loadProjects(); }
  };
  const clearForm = () => { $('#pForm').reset(); $('#pId').value = ''; $('#pTitle').textContent = 'Add project'; };
  $('#pCancel').onclick = clearForm;
  $('#pForm').onsubmit = async e => {
    e.preventDefault();
    const row = Object.fromEntries(F.map(f => [f, $('#' + f).value || null]));
    row.title = $('#title').value; row.sort_order = +$('#sort_order').value || 0; row.published = $('#published').checked;
    const id = $('#pId').value;
    const { error } = id ? await sb.from('projects').update(row).eq('id', id) : await sb.from('projects').insert(row);
    $('#pMsg').textContent = error ? error.message : 'Saved.';
    if (!error) { clearForm(); loadProjects(); }
  };

  /* Enquiries */
  async function loadEnquiries() {
    const { data, error } = await sb.from('enquiries').select('*').order('created_at', { ascending: false });
    if (error) { $('#eList').textContent = error.message; return; }
    const n = data.filter(x => x.status === 'new').length; $('#newCount').textContent = n || '';
    $('#eList').innerHTML = data.length ? data.map(q => `
      <div class="item"><div><b>${esc(q.name)}</b><span class="badge">${esc(q.status)}</span>
        <small>${new Date(q.created_at).toLocaleString()} | ${esc(q.phone)} | ${esc(q.email)}</small>
        <small>${esc(q.business)} | ${esc(q.requirements)}</small><p>${esc(q.message)}</p></div>
      <div class="btns">
        ${q.phone ? `<a class="btn ghost" style="text-decoration:none;padding:6px 14px;font-size:.85rem" target="_blank" href="https://wa.me/${esc(q.phone.replace(/\D/g, ''))}">WhatsApp</a>` : ''}
        <button class="btn ghost" data-st="${q.id}" data-v="${q.status === 'new' ? 'done' : 'new'}">${q.status === 'new' ? 'Mark done' : 'Reopen'}</button>
        <button class="btn danger" data-qdel="${q.id}">Delete</button></div></div>`).join('')
      : '<p>No enquiries yet. They appear here when someone submits the contact form.</p>';
  }
  $('#eList').onclick = async e => {
    if (e.target.dataset.st) { await sb.from('enquiries').update({ status: e.target.dataset.v }).eq('id', e.target.dataset.st); loadEnquiries(); }
    if (e.target.dataset.qdel && confirm('Delete this enquiry?')) { await sb.from('enquiries').delete().eq('id', e.target.dataset.qdel); loadEnquiries(); }
  };

  show();
})();
