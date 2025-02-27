import "./Login.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

export const Login = () => {
  const [credentials, setCredentials] = useState({ usernameOrEmail: "", password: "" });
  const [errors, setErrors] = useState<{ usernameOrEmail?: string; password?: string; form?: string }>({});
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!credentials.usernameOrEmail) newErrors.usernameOrEmail = "Username or Email is required";
    if (!credentials.password) newErrors.password = "Password is required";
    if (credentials.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setErrors({}); // Clear previous errors

      await authService.login({
        username: credentials.usernameOrEmail, // API expects "username", but supports email too
        password: credentials.password
      });

      const user = await authService.getProfile(); // Fetch user profile after login
      login(user);
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "Login failed"
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="label">Username or Email</label>
        <input
          type="text"
          className="input"
          value={credentials.usernameOrEmail}
          onChange={(e) => setCredentials({ ...credentials, usernameOrEmail: e.target.value })}
        />
        {errors.usernameOrEmail && <span className="error">{errors.usernameOrEmail}</span>}
      </div>

      <div className="input-group">
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      {errors.form && <div className="error">{errors.form}</div>}

      <button className="button" type="submit">
        Login
      </button>
    </form>
  );
};
