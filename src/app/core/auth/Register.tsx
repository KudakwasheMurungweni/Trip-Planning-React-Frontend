import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import styles from '../../shared/styles/forms.module.css';
import { AuthUser } from '../../models/profile'; // Adjust path if needed

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
        confirmPassword?: string;
        form?: string;
    }>({});
    const { login } = useAuth();

    const validateForm = () => {
        const newErrors: typeof errors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const user = await authService.register({
                username: formData.username,
                password: formData.password
            });
            login(user);
        } catch (error) {
            setErrors({
                ...errors,
                form: error instanceof Error ? error.message : 'Registration failed'
            });
        }
    };

    return ( // 🛑 You were missing this `return` statement!
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Username</label>
                <input
                    type="text"
                    className={styles.input}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                {errors.username && <span className={styles.error}>{errors.username}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input
                    type="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Confirm Password</label>
                <input
                    type="password"
                    className={styles.input}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>

            {errors.form && <div className={styles.error}>{errors.form}</div>}

            <button className={styles.button} type="submit">
                Register
            </button>
        </form>
    );
};
