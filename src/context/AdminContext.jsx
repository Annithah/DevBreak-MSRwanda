import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Marie Uwase", role: "Patient", email: "marie@email.com", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Dr. Jean Niyonzima", role: "Doctor", email: "jean@email.com", status: "Active", joinDate: "2024-01-10" },
    { id: 3, name: "Thomas Manzi", role: "Patient", email: "thomas@email.com", status: "Inactive", joinDate: "2024-01-20" },
    { id: 4, name: "Dr. Sarah Wilson", role: "Doctor", email: "sarah@email.com", status: "Active", joinDate: "2024-01-12" },
    { id: 5, name: "City Pharmacy", role: "Pharmacy", email: "city@pharmacy.com", status: "Active", joinDate: "2024-01-08" },
    { id: 6, name: "John Doe", role: "Patient", email: "john@email.com", status: "Active", joinDate: "2024-01-25" }
  ]);

  const [analytics, setAnalytics] = useState({
    totalUsers: 1250,
    totalDoctors: 45,
    totalPatients: 1180,
    totalPharmacies: 25,
    totalAppointments: 3420,
    todayAppointments: 28,
    activeUsers: 892,
    monthlyGrowth: 12.5,
    revenue: 45000
  });

  const updateUserStatus = (userId, status) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const value = {
    users,
    setUsers,
    analytics,
    setAnalytics,
    updateUserStatus,
    deleteUser
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};