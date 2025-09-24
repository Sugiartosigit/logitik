import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supplierOrderService } from '../../services/supplierOrderService';
import { authService } from '../../services/authService';
import './SupplierOrderList.css';

const SupplierOrderList = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({});
  
  const currentUser = authService.getCurrentUser();
  const canImport = authService.hasAnyRole(['admin', 'manager']);
  const canDelete = authService.hasAnyRole(['admin', 'manager']);

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        per_page: 10,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      };
      
      const response = await supplierOrderService.getSupplierOrders(params);
      setOrders(response.data.data);
      setPagination(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setImportLoading(true);
      await supplierOrderService.importSupplierOrders(file);
      alert('Import berhasil!');
      fetchOrders(); // Refresh data
    } catch (err) {
      alert(`Import gagal: ${err.response?.data?.message || err.message}`);
    } finally {
      setImportLoading(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleDelete = async (id, orderNumber) => {
    if (!window.confirm(`${t('confirmDelete')} Order ${orderNumber}?`)) {
      return;
    }

    try {
      await supplierOrderService.deleteSupplierOrder(id);
      alert('Order berhasil dihapus!');
      fetchOrders(); // Refresh data
    } catch (err) {
      alert(`Gagal menghapus: ${err.response?.data?.message || err.message}`);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    
    return (
      <span className={`status-badge ${statusClasses[status] || ''}`}>
        {t(status)}
      </span>
    );
  };

  if (loading && orders.length === 0) {
    return (
      <div className="supplier-orders-container">
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="supplier-orders-container">
      <div className="supplier-orders-content">
        <div className="header-section">
          <h1>{t('supplierOrdersTitle')}</h1>
          
          <div className="actions-section">
            {canImport && (
              <div className="import-section">
                <input
                  type="file"
                  id="excel-import"
                  accept=".xlsx,.xls"
                  onChange={handleImport}
                  disabled={importLoading}
                  style={{ display: 'none' }}
                />
                <label htmlFor="excel-import" className="import-btn">
                  {importLoading ? t('loading') : t('import')}
                </label>
              </div>
            )}
            
            <button onClick={() => fetchOrders()} className="refresh-btn">
              {t('refresh')}
            </button>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder={`${t('search')} order number atau supplier...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="status-filter">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="pending">{t('pending')}</option>
              <option value="confirmed">{t('confirmed')}</option>
              <option value="shipped">{t('shipped')}</option>
              <option value="delivered">{t('delivered')}</option>
              <option value="cancelled">{t('cancelled')}</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {t('error')}: {error}
          </div>
        )}

        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>{t('orderNumber')}</th>
                <th>{t('supplierName')}</th>
                <th>{t('orderDate')}</th>
                <th>{t('deliveryDate')}</th>
                <th>{t('totalAmount')}</th>
                <th>{t('status')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    {t('noData')}
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-number">{order.order_number}</td>
                    <td>
                      <div className="supplier-info">
                        <div className="supplier-name">{order.supplier_name}</div>
                        {order.supplier_contact && (
                          <div className="supplier-contact">{order.supplier_contact}</div>
                        )}
                      </div>
                    </td>
                    <td>{formatDate(order.order_date)}</td>
                    <td>
                      {order.delivery_date ? formatDate(order.delivery_date) : '-'}
                    </td>
                    <td className="amount">{formatCurrency(order.total_amount)}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td className="actions">
                      <button className="view-btn" title={t('view')}>
                        👁️
                      </button>
                      <button className="edit-btn" title={t('edit')}>
                        ✏️
                      </button>
                      {canDelete && (
                        <button 
                          className="delete-btn" 
                          title={t('delete')}
                          onClick={() => handleDelete(order.id, order.order_number)}
                        >
                          🗑️
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.last_page > 1 && (
          <div className="pagination">
            <button 
              onClick={() => fetchOrders(pagination.current_page - 1)}
              disabled={pagination.current_page <= 1}
            >
              {t('previous')}
            </button>
            
            <span className="page-info">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            
            <button 
              onClick={() => fetchOrders(pagination.current_page + 1)}
              disabled={pagination.current_page >= pagination.last_page}
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierOrderList;