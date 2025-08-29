import React, { useState } from 'react';

const ReportsGeneration = () => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    { value: 'appointments', label: 'Appointments Report' },
    { value: 'users', label: 'User Activity Report' },
    { value: 'prescriptions', label: 'Prescriptions Report' },
    { value: 'revenue', label: 'Revenue Report' },
    { value: 'system', label: 'System Usage Report' }
  ];

  const generateReport = async () => {
    if (!reportType || !dateRange.start || !dateRange.end) {
      alert('Please select report type and date range');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/admin/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          type: reportType,
          startDate: dateRange.start,
          endDate: dateRange.end
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}-report-${Date.now()}.pdf`;
        a.click();
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
    setGenerating(false);
  };

  return (
    <div className="reports-generation">
      <h2>Reports Generation</h2>
      
      <div className="report-form">
        <div className="form-group">
          <label>Report Type:</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="">Select Report Type</option>
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date Range:</label>
          <div className="date-range">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        </div>

        <button 
          onClick={generateReport}
          disabled={generating}
          className="generate-btn"
        >
          {generating ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      <div className="recent-reports">
        <h3>Recent Reports</h3>
        <div className="reports-list">
          <div className="report-item">
            <span>Appointments Report - Dec 2024</span>
            <button className="download-btn">Download</button>
          </div>
          <div className="report-item">
            <span>User Activity Report - Nov 2024</span>
            <button className="download-btn">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsGeneration;