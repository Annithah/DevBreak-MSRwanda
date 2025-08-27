import React, { useState } from 'react';

const UserManagement = ({ users, onUserAction, onDeleteUser }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role.toLowerCase() === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="users-content">
      <div className="users-header">
        <h3>User Management ({filteredUsers.length})</h3>
        <div className="users-controls">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="all">All Users</option>
            <option value="patient">Patients</option>
            <option value="doctor">Doctors</option>
            <option value="pharmacy">Pharmacies</option>
          </select>
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              <i className={`fas ${user.role === 'Doctor' ? 'fa-user-md' : user.role === 'Patient' ? 'fa-user-injured' : 'fa-pills'}`}></i>
            </div>
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
              <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
            </div>
            <div className="user-actions">
              <button 
                onClick={() => onUserAction(user.id, user.status === 'Active' ? 'deactivate' : 'activate')}
                className={`btn ${user.status === 'Active' ? 'btn-warning' : 'btn-success'}`}
              >
                {user.status === 'Active' ? 'Suspend' : 'Activate'}
              </button>
              <button 
                onClick={() => onDeleteUser(user.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;