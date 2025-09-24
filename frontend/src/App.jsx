import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import SupplierOrderList from './components/pages/SupplierOrderList';
import AccessDenied from './components/pages/AccessDenied';
import './App.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            
            {/* Protected routes */}
            <Route 
              path="/supplier-orders" 
              element={
                <ProtectedRoute>
                  <SupplierOrderList />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route - redirect to profile */}
            <Route path="*" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </I18nextProvider>
  );
}

export default App;
