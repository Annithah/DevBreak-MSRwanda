import React, { useState } from 'react';
import { usePharmacy } from '../context/PharmacyContext';

const InventoryManagement = () => {
  const { inventory, updateStock } = usePharmacy();
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  const handleUpdateStock = async (medicineId) => {
    if (newQuantity && editingItem === medicineId) {
      await updateStock(medicineId, parseInt(newQuantity));
      setEditingItem(null);
      setNewQuantity('');
    }
  };

  return (
    <div className="inventory-management">
      <h2>Inventory Management</h2>
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Current Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item._id} className={item.quantity < 10 ? 'low-stock' : ''}>
                <td>{item.name}</td>
                <td>
                  {editingItem === item._id ? (
                    <input
                      type="number"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      placeholder={item.quantity}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>${item.price}</td>
                <td>
                  <span className={`status ${item.quantity < 10 ? 'low' : 'normal'}`}>
                    {item.quantity < 10 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td>
                  {editingItem === item._id ? (
                    <div>
                      <button onClick={() => handleUpdateStock(item._id)}>Save</button>
                      <button onClick={() => setEditingItem(null)}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingItem(item._id)}>Update Stock</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;