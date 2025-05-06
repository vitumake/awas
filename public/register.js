async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
  
    if (!username || !password) {
      alert('Please fill out all fields.');
      return;
    }
  
    const res = await fetch(api('/login/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    if (res.status === 201) {
      alert('Registered successfully! Please log in.');
      window.location.href = 'login.html';
    } else if (res.status === 409) {
      alert('User already exists.');
    } else {
      alert('Registration failed.');
    }
  }
  