import React, { createContext, useContext, useState, useEffect } from 'react';

const PharmacyContext = createContext();

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
};

export const PharmacyProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pharmacy/inventory', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
    setLoading(false);
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('/api/pharmacy/prescriptions', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setPrescriptions(data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const updateStock = async (medicineId, quantity) => {
    try {
      const response = await fetch(`/api/pharmacy/inventory/${medicineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quantity })
      });
      if (response.ok) {
        fetchInventory();
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const fulfillPrescription = async (prescriptionId) => {
    try {
      const response = await fetch(`/api/pharmacy/prescriptions/${prescriptionId}/fulfill`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        fetchPrescriptions();
      }
    } catch (error) {
      console.error('Error fulfilling prescription:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchPrescriptions();
  }, []);

  const value = {
    inventory,
    prescriptions,
    orders,
    loading,
    updateStock,
    fulfillPrescription,
    fetchInventory,
    fetchPrescriptions
  };

  return (
    <PharmacyContext.Provider value={value}>
      {children}
    </PharmacyContext.Provider>
  );
};