import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setErrors({}); // Clear previous errors

      // Step 1: Register the user
      await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // Step 2: Login to get JWT token
      await authService.login({
        username: formData.username,
        password: formData.password
      });

      // Step 3: Fetch user profile with the obtained token
      const userData = await authService.getProfile();
      
      // Step 4: Set user in context and redirect
      login(userData);
      navigate('/dashboard');
      
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "Registration failed"
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div className="input-group">
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="input-group">
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="input-group">
        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      {errors.form && <div className="error">{errors.form}</div>}

      <button className="button" type="submit">
        Register
      </button>
    </form>
  );
};