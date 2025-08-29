import React, { useState } from 'react';
import { usePharmacy } from '../context/PharmacyContext';

const OrderManagement = () => {
  const { orders } = usePharmacy();
  const [newOrder, setNewOrder] = useState({
    supplier: '',
    medicines: [],
    totalAmount: 0
  });

  const createOrder = async () => {
    try {
      const response = await fetch('/api/pharmacy/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newOrder)
      });
      if (response.ok) {
        setNewOrder({ supplier: '', medicines: [], totalAmount: 0 });
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      
      <div className="create-order">
        <h3>Create New Order</h3>
        <div className="order-form">
          <input
            type="text"
            placeholder="Supplier Name"
            value={newOrder.supplier}
            onChange={(e) => setNewOrder({...newOrder, supplier: e.target.value})}
          />
          <button onClick={createOrder}>Create Order</button>
        </div>
      </div>

      <div className="orders-list">
        <h3>Recent Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Supplier</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6)}</td>
                    <td>{order.supplier}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>${order.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;