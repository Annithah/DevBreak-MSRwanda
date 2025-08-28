import React, { useState, useEffect } from 'react';

const RealTimeUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newUpdate = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'user_joined' : 'appointment_booked',
        message: Math.random() > 0.5 
          ? 'New user registered: Patient John Smith' 
          : 'New appointment booked with Dr. Wilson',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="real-time-updates">
      <h4><i className="fas fa-bell"></i> Live Updates</h4>
      <div className="updates-list">
        {updates.map(update => (
          <div key={update.id} className="update-item">
            <div className="update-icon">
              <i className={`fas ${update.type === 'user_joined' ? 'fa-user-plus' : 'fa-calendar-plus'}`}></i>
            </div>
            <div className="update-content">
              <p>{update.message}</p>
              <small>{update.timestamp}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeUpdates;