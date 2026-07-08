import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Handle Login
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post("/admin/login/", {
      username: loginData.username,
      password: loginData.password,
    });

    console.log("Login Response:", response.data);

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    navigate("/dashboard");
  } catch (err) {
    console.error("Error:", err);

    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Response:", err.response.data);
    }

    setError("Invalid Username or Password");
  } finally {
    setLoading(false);
  }
};

      // Store JWT Tokens
   

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="logo">AM Associates</h1>

        <h2>Super Admin Login</h2>

        <p>Please sign in to continue</p>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={loginData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={loginData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;