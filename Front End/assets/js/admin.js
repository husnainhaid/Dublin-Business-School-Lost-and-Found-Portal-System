
(function(){
  const form = document.getElementById('adminLoginForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const username = (fd.get('username')||'').toString().trim();
    const password = (fd.get('password')||'').toString();
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('isAdmin', 'true');
      Toast.success('Login successful', 'Welcome');
      setTimeout(() => { window.location.href = 'admin.html'; }, 500);
    } else {
      Toast.error('Invalid login credentials', 'Login Failed');
    }

     });
})();