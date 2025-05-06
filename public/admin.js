if (!token()) {
    window.location.href = 'login.html';
  }
  
  async function verifyAndLoadAdminData() {
    const profileRes = await fetch(api('/profile'), {
      headers: { Authorization: 'Bearer ' + token() }
    });
  
    if (!profileRes.ok) return window.location.href = 'login.html';
  
    const profile = await profileRes.json();
    if (profile.role !== 'admin') {
      alert('Access denied. Admins only.');
      return window.location.href = 'index.html';
    }
  
    loadUsers();
  }
  
  async function loadUsers() {
    const res = await fetch(api('/admin'), {
      headers: { Authorization: 'Bearer ' + token() }
    });
  
    const users = await res.json();
    const tbody = document.querySelector('#user-table tbody');
    tbody.innerHTML = '';
  
    users.forEach(user => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.role}</td>
        <td>${user.payment_info}</td>
        <td>
          <button onclick="toggleRole('${user.username}', '${user.role}')">
            ${user.role === 'admin' ? 'Demote' : 'Promote'}
          </button>
          <button onclick="deleteUser('${user.username}')">Delete</button>
        </td>
      `;
  
      tbody.appendChild(row);
    });
  
    document.getElementById('admin-container').style.display = '';
  }
  
  async function toggleRole(username, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await fetch(api('/admin/role'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token()
      },
      body: JSON.stringify({ username, newRole })
    });
    loadUsers();
  }
  
  async function deleteUser(username) {
    if (!confirm(`Are you sure you want to delete ${username}?`)) return;
    await fetch(api(`/admin/${username}`), {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token()
      }
    });
    loadUsers();
  }
  
  verifyAndLoadAdminData();
  