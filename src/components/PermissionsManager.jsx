import React, { useState } from 'react';

const PermissionsManager = () => {
  const [permissions, setPermissions] = useState({
    doctors: {
      viewPatients: true,
      editPatients: true,
      deletePatients: false,
      manageAppointments: true,
      accessReports: true
    },
    patients: {
      viewProfile: true,
      editProfile: true,
      bookAppointments: true,
      viewReports: true,
      cancelAppointments: true
    },
    pharmacies: {
      viewOrders: true,
      processOrders: true,
      manageInventory: true,
      viewReports: false
    }
  });

  const handlePermissionChange = (role, permission) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role][permission]
      }
    }));
  };

  const savePermissions = () => {
    // API call to save permissions
    alert('Permissions updated successfully!');
  };

  return (
    <div className="permissions-content">
      <h3>Role Permissions Management</h3>
      
      {Object.entries(permissions).map(([role, perms]) => (
        <div key={role} className="permission-section">
          <h4 className="role-title">
            <i className={`fas ${role === 'doctors' ? 'fa-user-md' : role === 'patients' ? 'fa-user-injured' : 'fa-pills'}`}></i>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </h4>
          
          <div className="permissions-grid">
            {Object.entries(perms).map(([perm, enabled]) => (
              <div key={perm} className="permission-item">
                <label className="permission-label">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => handlePermissionChange(role, perm)}
                  />
                  <span className="checkmark"></span>
                  {perm.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <button onClick={savePermissions} className="save-permissions-btn">
        <i className="fas fa-save"></i> Save All Permissions
      </button>
    </div>
  );
};

export default PermissionsManager;