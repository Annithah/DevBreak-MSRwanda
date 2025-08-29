import React from 'react';
import { usePharmacy } from '../context/PharmacyContext';

const StockTracking = () => {
  const { inventory } = usePharmacy();

  const lowStockItems = inventory.filter(item => item.quantity < 10);
  const outOfStockItems = inventory.filter(item => item.quantity === 0);

  return (
    <div className="stock-tracking">
      <h2>Stock Tracking</h2>
      
      <div className="stock-alerts">
        <div className="alert-section">
          <h3>Out of Stock ({outOfStockItems.length})</h3>
          <div className="alert-items">
            {outOfStockItems.map(item => (
              <div key={item._id} className="alert-item critical">
                <span>{item.name}</span>
                <span className="stock-level">0 units</span>
              </div>
            ))}
          </div>
        </div>

        <div className="alert-section">
          <h3>Low Stock ({lowStockItems.length})</h3>
          <div className="alert-items">
            {lowStockItems.filter(item => item.quantity > 0).map(item => (
              <div key={item._id} className="alert-item warning">
                <span>{item.name}</span>
                <span className="stock-level">{item.quantity} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stock-summary">
        <h3>Stock Summary</h3>
        <div className="summary-stats">
          <div className="stat">
            <label>Total Items:</label>
            <span>{inventory.length}</span>
          </div>
          <div className="stat">
            <label>Well Stocked:</label>
            <span>{inventory.filter(item => item.quantity >= 10).length}</span>
          </div>
          <div className="stat">
            <label>Need Reorder:</label>
            <span>{lowStockItems.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTracking;