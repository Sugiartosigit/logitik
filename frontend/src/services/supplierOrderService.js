import api from './api';

export const supplierOrderService = {
  // Get all supplier orders
  async getSupplierOrders(params = {}) {
    try {
      const response = await api.get('/supplier-orders', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single supplier order
  async getSupplierOrder(id) {
    try {
      const response = await api.get(`/supplier-orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new supplier order
  async createSupplierOrder(data) {
    try {
      const response = await api.post('/supplier-orders', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update supplier order
  async updateSupplierOrder(id, data) {
    try {
      const response = await api.put(`/supplier-orders/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete supplier order
  async deleteSupplierOrder(id) {
    try {
      const response = await api.delete(`/supplier-orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Import supplier orders from Excel
  async importSupplierOrders(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/supplier-orders/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};