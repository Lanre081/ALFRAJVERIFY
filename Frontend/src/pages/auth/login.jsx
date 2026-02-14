import "../../App.css";
import SiteFooter from "../../components/SiteFooter.jsx";
import SiteHeader from "../../components/SiteHeader.jsx";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";
import { setAccessToken, setRefreshToken } from "../../Helpers/Auth/tokens.js";

function Login() {
  // State init

  const [userData, setUserData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const { data, error, loading, login } = useAuth();

  // Funcs

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateUserLogin(userData);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    login(userData);
  };

  useEffect(() => {
    if (data?.success) {
      setAccessToken(data?.tokens?.accessToken);
      setRefreshToken(data?.tokens?.refreshToken)
      navigate("/");
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <SiteHeader />

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* FORM-LEVEL ERROR (backend / unexpected) */}
            {error && !fieldErrors.email && !fieldErrors.password && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error?.response?.data?.message ||
                  "Login failed. Please try again."}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              margin="normal"
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email}
              slotProps={{
                htmlInput: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={18} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={userData.password || ""}
              onChange={handleChange}
              margin="normal"
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password}
              slotProps={{
                htmlInput: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={18} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 3, py: 1.2 }}
              disabled={loading}
              loading={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?
            <Link
              className="font-semibold text-blue-600 hover:text-blue-700"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Login;
