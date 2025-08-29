const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          throw new Error('Unauthorized');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return response;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Patient methods
  async getPatientDashboard() {
    return this.request('/patients/dashboard');
  }

  async bookAppointment(appointmentData) {
    return this.request('/patients/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async chatWithAI(message) {
    return this.request('/patients/ai-chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Doctor methods
  async getDoctorDashboard() {
    return this.request('/doctors/dashboard');
  }

  async approveAppointment(appointmentId) {
    return this.request(`/doctors/appointments/${appointmentId}/approve`, {
      method: 'PUT',
    });
  }

  async createPrescription(prescriptionData) {
    return this.request('/doctors/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
  }

  // Pharmacy methods
  async getPharmacyInventory() {
    return this.request('/pharmacy/inventory');
  }

  async updateStock(medicineId, quantity) {
    return this.request(`/pharmacy/inventory/${medicineId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async fulfillPrescription(prescriptionId) {
    return this.request(`/pharmacy/prescriptions/${prescriptionId}/fulfill`, {
      method: 'PUT',
    });
  }

  // Admin methods
  async getAdminAnalytics() {
    return this.request('/admin/analytics');
  }

  async getSystemStats() {
    return this.request('/admin/system-stats');
  }

  async generateReport(reportData) {
    return this.request('/admin/reports/generate', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }
}

export default new ApiClient();