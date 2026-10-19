(() => {
  'use strict';

  const AUTH_SESSION_KEY = 'study_auth_session_v1';

  const firebaseConfig = {
    apiKey: "AIzaSyBwlW88e_C0tlvPqBhMs0WjoN8YlQVgzxY",
    authDomain: "toolkit-9d9b5.firebaseapp.com",
    databaseURL: "https://toolkit-9d9b5-default-rtdb.firebaseio.com",
    projectId: "toolkit-9d9b5",
    storageBucket: "toolkit-9d9b5.firebasestorage.app",
    messagingSenderId: "305180262667",
    appId: "1:305180262667:web:e0cbb12f007402945f620e",
    measurementId: "G-WTCKG4HJ4Q"
  };

  let db = null;

  function initFirebase() {
    try {
      if (typeof firebase === 'undefined' || !firebase.initializeApp) {
        console.warn('Firebase SDK load nahi hua.');
        return false;
      }

      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      db = firebase.database();
      return true;
    } catch (e) {
      console.warn('Firebase init error:', e);
      return false;
    }
  }

  function getDb() {
    return db;
  }

  async function hashPassword(password) {
    const text = String(password || '');

    if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
      const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }

    // Fallback for non-secure contexts like file://
    return fallbackHash(text);
  }

  function fallbackHash(str) {
    let h1 = 0xdeadbeef ^ str.length;
    let h2 = 0x41c6ce57 ^ str.length;

    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return ((h2 >>> 0) * 0x100000000 + (h1 >>> 0)).toString(16);
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(AUTH_SESSION_KEY);
      if (!raw) return null;

      const session = JSON.parse(raw);
      if (!session || !session.userId || !session.role) return null;

      return session;
    } catch (e) {
      return null;
    }
  }

  function setSession(session) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  }

  function clearSession() {
    localStorage.removeItem(AUTH_SESSION_KEY);
  }

  function routeForRole(role) {
    const routes = {
      abhinav: 'index.html',
      navya: 'navya.html',
      deepak: 'deepak.html',
      admin: 'admin.html'
    };

    return routes[role] || 'auth.html';
  }

  function redirectForRole(role) {
    window.location.replace(routeForRole(role));
  }

  function validUserId(id) {
    return /^[a-z0-9_-]{3,20}$/.test(id);
  }

  function validRole(role) {
    return ['abhinav', 'navya', 'deepak', 'admin'].includes(role);
  }

  function setMessage(text, type = 'info') {
    const el = document.getElementById('message');
    if (!el) return;

    el.textContent = text;
    el.className = 'message ' + type;
    el.hidden = false;
  }

  function clearMessage() {
    const el = document.getElementById('message');
    if (!el) return;

    el.textContent = '';
    el.className = 'message info';
    el.hidden = true;
  }

  function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');

    if (!loginForm || !registerForm || !tabLogin || !tabRegister) return;

    clearMessage();

    if (tab === 'login') {
      loginForm.hidden = false;
      registerForm.hidden = true;
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
    } else {
      loginForm.hidden = true;
      registerForm.hidden = false;
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    clearMessage();

    const userId = (document.getElementById('loginUserId')?.value || '').trim().toLowerCase();
    const password = document.getElementById('loginPassword')?.value || '';
    const btn = document.getElementById('loginBtn');

    if (!validUserId(userId)) {
      setMessage('Valid User ID daalo. Example: navya, deepak_12', 'error');
      return;
    }

    if (!password) {
      setMessage('Password daalo.', 'error');
      return;
    }

    if (!db) {
      setMessage('Firebase connect nahi hua. Internet/SDK check karo.', 'error');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Checking…';
    }

    try {
      const snap = await db.ref('users/' + userId).once('value');

      if (!snap.exists()) {
        throw new Error('User not found. Pehle register karo.');
      }

      const user = snap.val() || {};
      const hash = await hashPassword(password);

      if (hash !== user.passwordHash) {
        throw new Error('Wrong password.');
      }

      const session = {
        userId,
        displayName: user.displayName || userId,
        role: user.role || 'abhinav',
        loginAt: Date.now()
      };

      setSession(session);

      db.ref('users/' + userId).update({
        lastLoginAt: Date.now()
      }).catch(() => {});

      setMessage('Login successful. Redirecting…', 'success');
      redirectForRole(session.role);
    } catch (err) {
      setMessage(err.message || 'Login failed.', 'error');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Login';
      }
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    clearMessage();

    const displayName = (document.getElementById('regDisplayName')?.value || '').trim();
    const userId = (document.getElementById('regUserId')?.value || '').trim().toLowerCase();
    const password = document.getElementById('regPassword')?.value || '';
    const confirm = document.getElementById('regConfirm')?.value || '';
    const role = (document.getElementById('regRole')?.value || '').trim();
    const btn = document.getElementById('registerBtn');

    if (displayName.length < 2) {
      setMessage('Display name kam se kam 2 characters ka hona chahiye.', 'error');
      return;
    }

    if (!validUserId(userId)) {
      setMessage('User ID valid nahi. Use small letters, numbers, _ or -. Length 3–20.', 'error');
      return;
    }

    if (!validRole(role)) {
      setMessage('Invalid role selected.', 'error');
      return;
    }

    if (password.length < 6) {
      setMessage('Password kam se kam 6 characters ka hona chahiye.', 'error');
      return;
    }

    if (password !== confirm) {
      setMessage('Password aur Confirm Password match nahi kar rahe.', 'error');
      return;
    }

    if (!db) {
      setMessage('Firebase connect nahi hua. Internet/SDK check karo.', 'error');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Creating…';
    }

    try {
      const existing = await db.ref('users/' + userId).once('value');

      if (existing.exists()) {
        throw new Error('Ye User ID already exist karta hai.');
      }

      const passwordHash = await hashPassword(password);

      const userData = {
        displayName,
        role,
        passwordHash,
        createdAt: Date.now(),
        lastLoginAt: 0
      };

      await db.ref('users/' + userId).set(userData);

      const session = {
        userId,
        displayName,
        role,
        loginAt: Date.now()
      };

      setSession(session);

      setMessage('Register successful. Redirecting…', 'success');
      redirectForRole(role);
    } catch (err) {
      setMessage(err.message || 'Register failed.', 'error');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Register';
      }
    }
  }

  function bindAuthPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    if (getSession()) return;

    initFirebase();

    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');

    tabLogin?.addEventListener('click', () => switchTab('login'));
    tabRegister?.addEventListener('click', () => switchTab('register'));

    loginForm.addEventListener('submit', handleLogin);
    document.getElementById('registerForm')?.addEventListener('submit', handleRegister);

    setMessage('Firebase ready. Login ya register karo.', 'info');
  }

  window.Auth = {
    initFirebase,
    getDb,
    hashPassword,
    getSession,
    setSession,
    clearSession,
    routeForRole
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAuthPage);
  } else {
    bindAuthPage();
  }
})();