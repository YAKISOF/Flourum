import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/auth/AuthHeader';
import styles from './AuthPage.module.css';

interface AuthPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const AuthPage = ({ setIsAuthenticated }: AuthPageProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <div className={styles.pageContainer}>
      <AuthHeader />
      <div className={styles.authContainer}>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <h1>Вход в систему</h1>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
