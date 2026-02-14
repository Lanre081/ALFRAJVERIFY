import "../../App.css";
import SiteFooter from "../../components/SiteFooter.jsx";
import SiteHeader from "../../components/SiteHeader.jsx";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth.js";
import { validateUserRegister } from "../../Validators/auth.validator.js";

function Signup() {
  const [userData, setUserData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const { data, error, loading, register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateUserRegister(userData);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    register(userData);
  };

  useEffect(() => {
    if (data?.success) {
      navigate("/login");
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <SiteHeader />

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Create account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign up to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* FORM-LEVEL ERROR */}
            {fieldErrors.form || error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {fieldErrors.form || error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={userData.username || ""}
              onChange={handleChange}
              margin="normal"
              error={Boolean(fieldErrors.username)}
              helperText={fieldErrors.username}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userData.email || ""}
              onChange={handleChange}
              margin="normal"
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email}
            />

            <TextField
              fullWidth
              label="Phone number (optional)"
              name="phoneNumber"
              value={userData.phoneNumber || ""}
              onChange={handleChange}
              margin="normal"
              error={Boolean(fieldErrors.phoneNumber)}
              helperText={fieldErrors.phoneNumber}
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
            />

            <TextField
              fullWidth
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={userData.confirmPassword || ""}
              onChange={handleChange}
              margin="normal"
              error={Boolean(fieldErrors.confirmPassword)}
              helperText={fieldErrors.confirmPassword}
            />

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 3, py: 1.2 }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              className="font-semibold text-blue-600 hover:text-blue-700"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Signup;
