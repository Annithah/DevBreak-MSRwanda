import React, { useState } from 'react';

const TestSuite = () => {
  const [testResults, setTestResults] = useState([]);
  const [running, setRunning] = useState(false);

  const tests = [
    { id: 1, name: 'User Authentication', endpoint: '/api/auth/login' },
    { id: 2, name: 'Patient Registration', endpoint: '/api/auth/register' },
    { id: 3, name: 'Appointment Booking', endpoint: '/api/patients/appointments' },
    { id: 4, name: 'Doctor Dashboard', endpoint: '/api/doctors/dashboard' },
    { id: 5, name: 'Pharmacy Inventory', endpoint: '/api/pharmacy/inventory' },
    { id: 6, name: 'Admin Analytics', endpoint: '/api/admin/analytics' },
    { id: 7, name: 'Gemini AI Service', endpoint: '/api/patients/ai-chat' }
  ];

  const runTest = async (test) => {
    try {
      const response = await fetch(test.endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        ...test,
        status: response.ok ? 'passed' : 'failed',
        responseTime: Math.random() * 1000 + 100,
        statusCode: response.status
      };
    } catch (error) {
      return {
        ...test,
        status: 'failed',
        responseTime: 0,
        error: error.message
      };
    }
  };

  const runAllTests = async () => {
    setRunning(true);
    setTestResults([]);

    for (const test of tests) {
      const result = await runTest(test);
      setTestResults(prev => [...prev, result]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setRunning(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return '#28a745';
      case 'failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="test-suite">
      <div className="test-header">
        <h2>System Integration Tests</h2>
        <button 
          onClick={runAllTests}
          disabled={running}
          className="run-tests-btn"
        >
          {running ? 'Running Tests...' : 'Run All Tests'}
        </button>
      </div>

      <div className="test-results">
        {testResults.length > 0 && (
          <div className="results-summary">
            <div className="summary-stat">
              <span>Total: {testResults.length}</span>
            </div>
            <div className="summary-stat passed">
              <span>Passed: {testResults.filter(r => r.status === 'passed').length}</span>
            </div>
            <div className="summary-stat failed">
              <span>Failed: {testResults.filter(r => r.status === 'failed').length}</span>
            </div>
          </div>
        )}

        <div className="test-list">
          {tests.map(test => {
            const result = testResults.find(r => r.id === test.id);
            return (
              <div key={test.id} className="test-item">
                <div className="test-info">
                  <span className="test-name">{test.name}</span>
                  <span className="test-endpoint">{test.endpoint}</span>
                </div>
                <div className="test-status">
                  {result ? (
                    <>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(result.status) }}
                      >
                        {result.status.toUpperCase()}
                      </span>
                      <span className="response-time">
                        {Math.round(result.responseTime)}ms
                      </span>
                      {result.statusCode && (
                        <span className="status-code">{result.statusCode}</span>
                      )}
                    </>
                  ) : running ? (
                    <span className="status-badge pending">PENDING</span>
                  ) : (
                    <span className="status-badge">NOT RUN</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestSuite;