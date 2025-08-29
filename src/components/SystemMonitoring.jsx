import React, { useState, useEffect } from 'react';

const SystemMonitoring = () => {
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalAppointments: 0,
    systemUptime: '99.9%',
    serverLoad: '45%',
    databaseSize: '2.3GB'
  });

  useEffect(() => {
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    try {
      const response = await fetch('/api/admin/system-stats', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setSystemStats(data);
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  return (
    <div className="system-monitoring">
      <h2>System Monitoring</h2>
      
      <div className="monitoring-grid">
        <div className="monitor-card">
          <h3>System Health</h3>
          <div className="health-indicator">
            <div className="status-dot healthy"></div>
            <span>All Systems Operational</span>
          </div>
          <div className="uptime">Uptime: {systemStats.systemUptime}</div>
        </div>

        <div className="monitor-card">
          <h3>Server Performance</h3>
          <div className="performance-metric">
            <label>CPU Load:</label>
            <div className="progress-bar">
              <div className="progress" style={{width: systemStats.serverLoad}}></div>
            </div>
            <span>{systemStats.serverLoad}</span>
          </div>
        </div>

        <div className="monitor-card">
          <h3>Database</h3>
          <div className="db-stats">
            <div className="stat">
              <label>Size:</label>
              <span>{systemStats.databaseSize}</span>
            </div>
            <div className="stat">
              <label>Status:</label>
              <span className="status connected">Connected</span>
            </div>
          </div>
        </div>

        <div className="monitor-card">
          <h3>User Activity</h3>
          <div className="user-stats">
            <div className="stat">
              <label>Total Users:</label>
              <span>{systemStats.totalUsers}</span>
            </div>
            <div className="stat">
              <label>Active Now:</label>
              <span>{systemStats.activeUsers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;