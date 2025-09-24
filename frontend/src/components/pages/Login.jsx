import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../../services/authService';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  if (authService.isAuthenticated()) {
    return <Navigate to="/supplier-orders" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.login(formData.identifier, formData.password);
      
      if (result.success) {
        navigate('/supplier-orders', { replace: true });
      } else {
        setError(result.message || t('loginError'));
      }
    } catch (err) {
      setError(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <h1>{t('loginTitle')}</h1>
          <p>Logitik ERP System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="identifier">{t('emailOrNik')}</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              placeholder="Email atau NIK"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Kata sandi"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? t('loading') : t('loginButton')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Demo credentials:</p>
          <div className="demo-credentials">
            <div>Admin: admin@logitik.com / ADMIN001 - password123</div>
            <div>Manager: manager@logitik.com / MGR001 - password123</div>
            <div>Staff: staff@logitik.com / STF001 - password123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;