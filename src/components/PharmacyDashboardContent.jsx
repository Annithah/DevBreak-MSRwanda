import React from 'react';
import { usePharmacy } from '../context/PharmacyContext';
import InventoryManagement from './InventoryManagement';
import PrescriptionFulfillment from './PrescriptionFulfillment';
import StockTracking from './StockTracking';
import OrderManagement from './OrderManagement';

const PharmacyDashboardContent = () => {
  const { inventory, prescriptions, loading } = usePharmacy();

  if (loading) {
    return <div className="loading">Loading pharmacy data...</div>;
  }

  return (
    <div className="pharmacy-dashboard">
      <div className="dashboard-header">
        <h1>Pharmacy Dashboard</h1>
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Medicines</h3>
            <p>{inventory.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Prescriptions</h3>
            <p>{prescriptions.filter(p => p.status === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <h3>Low Stock Items</h3>
            <p>{inventory.filter(item => item.quantity < 10).length}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <InventoryManagement />
        </div>
        <div className="dashboard-section">
          <PrescriptionFulfillment />
        </div>
        <div className="dashboard-section">
          <StockTracking />
        </div>
        <div className="dashboard-section">
          <OrderManagement />
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboardContent;