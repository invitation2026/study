(() => {
  'use strict';

  const SESSION_KEY = 'study_auth_session_v1';

  const ROUTES = {
    abhinav: 'index.html',
    navya: 'navya.html',
    deepak: 'deepak.html',
    admin: 'admin.html'
  };

  const PROTECTED_PAGES = {
    'index.html': 'abhinav',
    'navya.html': 'navya',
    'deepak.html': 'deepak',
    'admin.html': 'admin'
  };

  function currentPage() {
    const path = window.location.pathname || '';
    let file = path.substring(path.lastIndexOf('/') + 1);
    if (!file) file = 'index.html';
    return file.toLowerCase();
  }

  function normalizeSession(session) {
    if (!session || !session.userId || !session.role) return null;
    if (!ROUTES[session.role]) return null;
    return session;
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      const session = normalizeSession(parsed);

      if (!session) {
        clearSession();
        return null;
      }

      return session;
    } catch (e) {
      clearSession();
      return null;
    }
  }

  function setSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function redirect(url) {
    const current = currentPage();
    if (current === url) return;
    window.location.replace(url);
  }

  function logout() {
    clearSession();
    window.location.replace('auth.html');
  }

  function requireLogin() {
    const session = getSession();
    if (!session) {
      redirect('auth.html');
      return null;
    }
    return session;
  }

  function requireRole(role) {
    const session = requireLogin();
    if (!session) return null;

    if (session.role !== role) {
      redirect(ROUTES[session.role] || 'auth.html');
      return null;
    }

    return session;
  }

  function canLoadPlanner() {
    const page = currentPage();
    const session = getSession();

    if (page === 'auth.html') return false;

    if (PROTECTED_PAGES[page]) {
      return !!session && PROTECTED_PAGES[page] === session.role;
    }

    return true;
  }

  function updateUI() {
    const session = getSession();

    document.querySelectorAll('[data-user-name]').forEach(el => {
      el.textContent = session ? (session.displayName || session.userId) : 'Guest';
    });

    document.querySelectorAll('[data-user-role]').forEach(el => {
      el.textContent = session ? session.role : 'guest';
    });

    document.querySelectorAll('[data-logout]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    });
  }

  function init() {
    const page = currentPage();
    const session = getSession();

    if (page === 'auth.html') {
      const authOptions = document.getElementById('authOptions');
      const signedInPanel = document.getElementById('signedInPanel');
      if (authOptions) authOptions.hidden = !!session;
      if (signedInPanel) signedInPanel.hidden = !session;
      if (session) {
        updateUI();
      }
      return;
    }

    if (PROTECTED_PAGES[page]) {
      if (!session) {
        redirect('auth.html');
        return;
      }

      if (PROTECTED_PAGES[page] !== session.role) {
        redirect(ROUTES[session.role] || 'auth.html');
        return;
      }
    }

    updateUI();
  }

  window.Router = {
    ROUTES,
    getSession,
    setSession,
    clearSession,
    logout,
    requireLogin,
    requireRole,
    canLoadPlanner,
    currentPage
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();