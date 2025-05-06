if (!token()) {
    window.location.href = 'login.html';
  }
  
  async function loadProfile() {
    const res = await fetch(api('/profile'), {
      headers: { Authorization: 'Bearer ' + token() }
    });
  
    if (!res.ok) {
      return window.location.href = 'login.html';
    }
  
    const data = await res.json();
    document.getElementById('username').textContent = data.username;
    document.getElementById('role').textContent = data.role;
    document.getElementById('payment').textContent = data.payment_info;
    document.getElementById('profile-container').style.display = '';
  }
  
  loadProfile();
  