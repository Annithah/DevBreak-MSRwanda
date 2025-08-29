import React, { useState } from 'react';

const BackupRestore = () => {
  const [backupStatus, setBackupStatus] = useState('idle');
  const [backups, setBackups] = useState([
    { id: 1, name: 'Daily Backup - Dec 15, 2024', size: '45MB', date: '2024-12-15' },
    { id: 2, name: 'Weekly Backup - Dec 10, 2024', size: '42MB', date: '2024-12-10' },
    { id: 3, name: 'Monthly Backup - Dec 1, 2024', size: '38MB', date: '2024-12-01' }
  ]);

  const createBackup = async () => {
    setBackupStatus('creating');
    try {
      const response = await fetch('/api/admin/backup/create', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.ok) {
        setBackupStatus('success');
        // Refresh backup list
        setTimeout(() => setBackupStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error creating backup:', error);
      setBackupStatus('error');
    }
  };

  const restoreBackup = async (backupId) => {
    if (!window.confirm('Are you sure you want to restore this backup? This will overwrite current data.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/backup/restore/${backupId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.ok) {
        alert('Backup restored successfully');
      }
    } catch (error) {
      console.error('Error restoring backup:', error);
    }
  };

  return (
    <div className="backup-restore">
      <h2>Backup & Restore</h2>
      
      <div className="backup-actions">
        <div className="create-backup">
          <h3>Create Backup</h3>
          <p>Create a full system backup including all user data, appointments, and configurations.</p>
          <button 
            onClick={createBackup}
            disabled={backupStatus === 'creating'}
            className="backup-btn"
          >
            {backupStatus === 'creating' ? 'Creating Backup...' : 'Create Backup Now'}
          </button>
          
          {backupStatus === 'success' && (
            <div className="status-message success">Backup created successfully!</div>
          )}
          {backupStatus === 'error' && (
            <div className="status-message error">Failed to create backup</div>
          )}
        </div>

        <div className="backup-schedule">
          <h3>Automatic Backups</h3>
          <div className="schedule-settings">
            <label>
              <input type="checkbox" defaultChecked /> Daily backups at 2:00 AM
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Weekly backups on Sundays
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Monthly backups on 1st
            </label>
          </div>
        </div>
      </div>

      <div className="backup-list">
        <h3>Available Backups</h3>
        <div className="backups-table">
          <table>
            <thead>
              <tr>
                <th>Backup Name</th>
                <th>Size</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map(backup => (
                <tr key={backup.id}>
                  <td>{backup.name}</td>
                  <td>{backup.size}</td>
                  <td>{backup.date}</td>
                  <td>
                    <button 
                      onClick={() => restoreBackup(backup.id)}
                      className="restore-btn"
                    >
                      Restore
                    </button>
                    <button className="download-btn">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;