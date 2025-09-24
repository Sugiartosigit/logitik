import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../../services/authService';
import './Layout.css';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Logitik ERP</Link>
          </div>
          
          <nav className="nav">
            <Link to="/">{t('profile')}</Link>
            {isAuthenticated ? (
              <>
                <Link to="/supplier-orders">{t('supplierOrders')}</Link>
                <button onClick={handleLogout} className="logout-btn">
                  {t('logout')}
                </button>
                <span className="user-info">
                  {currentUser?.role} - {currentUser?.nik}
                </span>
              </>
            ) : (
              <Link to="/login">{t('login')}</Link>
            )}
            <button onClick={toggleLanguage} className="lang-btn">
              {i18n.language === 'id' ? 'EN' : 'ID'}
            </button>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Hayder Logistics System - Logitik ERP v1.0.0</p>
      </footer>
    </div>
  );
};

export default Layout;