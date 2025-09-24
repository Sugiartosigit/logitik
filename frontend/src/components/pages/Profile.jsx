import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { profileService } from '../../services/profileService';
import './Profile.css';

const Profile = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await profileService.getPublicProfile();
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error">{t('error')}: {error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>{t('profileTitle')}</h1>
        
        {profile && (
          <>
            <section className="company-info">
              <h2>{t('companyName')}</h2>
              <p className="company-name">{profile.company.name}</p>
              
              <h3>{t('description')}</h3>
              <p>{profile.company.description}</p>
              
              <div className="company-details">
                <div className="detail-item">
                  <strong>{t('established')}:</strong> {profile.company.established}
                </div>
                <div className="detail-item">
                  <strong>{t('version')}:</strong> {profile.version}
                </div>
                <div className="detail-item">
                  <strong>{t('lastUpdated')}:</strong> {new Date(profile.last_updated).toLocaleString()}
                </div>
              </div>
            </section>

            <section className="modules-section">
              <h3>{t('modules')}</h3>
              <ul className="modules-list">
                {profile.company.modules.map((module, index) => (
                  <li key={index}>{module}</li>
                ))}
              </ul>
            </section>

            <section className="features-section">
              <h3>{t('features')}</h3>
              <ul className="features-list">
                {profile.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>

            <section className="contact-section">
              <h3>{t('contact')}</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> <a href={`tel:${profile.contact.phone}`}>{profile.contact.phone}</a>
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> {profile.contact.address}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;