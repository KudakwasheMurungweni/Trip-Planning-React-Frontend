import styles from '../shared/styles/forms.module.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState<{ username?: string; password?: string; form?: string }>({});
    const { login } = useAuth();
  
    const validateForm = () => {
      const newErrors: typeof errors = {};
      if (!credentials.username) newErrors.username = 'Username is required';
      if (!credentials.password) newErrors.password = 'Password is required';
      if (credentials.password?.length < 6) newErrors.password = 'Password must be at least 6 characters';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      
      try {
        const user = await authService.login(credentials);
        login(user);
      } catch (error) {
        setErrors({ 
          ...errors, 
          form: error instanceof Error ? error.message : 'Login failed' 
        });
      }
    };
  
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value)}
          />
          {errors.username && <span className={styles.error}>{errors.username}</span>}
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value)}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        
        {errors.form && <div className={styles.error}>{errors.form}</div>}
        
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    );
};