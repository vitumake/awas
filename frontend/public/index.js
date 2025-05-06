// Redirect to login if no token is present
if (!token()) {
    window.location.href = 'login.html';
  }
  
  // Load user profile to customize UI
  async function loadProfile() {
    const res = await fetch(api('/profile'), {
      headers: { Authorization: 'Bearer ' + token() }
    });
    if (!res.ok) {
      return window.location.href = 'login.html';
    }
  
    const user = await res.json();
    document.getElementById('username').textContent = user.username;
    document.getElementById('profile').style.display = '';
    document.getElementById('post-box').style.display = '';
  
    if (user.role === 'admin') {
      document.getElementById('admin').style.display = '';
      document.getElementById('admin-link').style.display = '';
    }
  }
  
  // Load all messages and display them
  async function loadMessages() {
    const res = await fetch(api('/messages'));
    const data = await res.json();
    const container = document.getElementById('messages');
    container.innerHTML = '';
    data.forEach(msg => {
      const div = document.createElement('div');
      div.innerHTML = `<b>${msg.username}</b> (${msg.created_at}): ${msg.content}`;
      container.appendChild(div);
    });
  }
  
  // Submit a new message
  async function postMessage() {
    const content = document.getElementById('new-message').value;
    await fetch(api('/messages'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token()
      },
      body: JSON.stringify({ content })
    });
    document.getElementById('new-message').value = '';
    loadMessages();
  }
  
  // Load all users for the admin panel
  async function loadAdmin() {
    const res = await fetch(api('/admin'), {
      headers: { Authorization: 'Bearer ' + token() }
    });
    const data = await res.json();
    document.getElementById('admin-data').textContent = JSON.stringify(data, null, 2);
  }
  
  // Init
  loadProfile();
  loadMessages();
  