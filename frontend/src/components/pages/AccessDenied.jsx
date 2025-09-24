import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AccessDenied.css';

const AccessDenied = () => {
  const { t } = useTranslation();

  return (
    <div className="access-denied-container">
      <div className="access-denied-content">
        <div className="icon">🚫</div>
        <h1>Access Denied</h1>
        <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <p>Silakan hubungi administrator untuk mendapatkan akses.</p>
        <Link to="/" className="back-home-btn">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;