import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { saveAccessToken, saveRefreshToken } from "../../Helpers/Auth/tokens";
import { validateUserLogin } from "../../Validators/auth.validator";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, data, error, loading } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validateUserLogin(form);
        setFormErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        login(form);
    }

    useEffect(() => {
        if (!data?.success || !data?.tokens) return;

        saveAccessToken(data.tokens.accessToken);
        saveRefreshToken(data.tokens.refreshToken);
        navigate("/");
    }, [data, navigate]);


    const backendErrorMessage = useMemo(() => (
        error?.response?.data?.message ||
        error?.response?.data?.validation?.body?.message ||
        error?.message ||
        ""
    ), [error]);

    return (
        <div className="auth-layout">
            <div className="bg-animated" />

            {/* Left branding panel */}
            <div className="auth-panel-left">
                <div className="auth-brand">
                    <h1>ALFRAJ Verify</h1>
                    <p>Your trusted partner for instant airtime, data, and top-up services.</p>
                </div>
                <div className="auth-features">
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">⚡</div>
                        <span>Lightning-fast transactions</span>
                    </div>
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">🔒</div>
                        <span>Bank-grade security</span>
                    </div>
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">💎</div>
                        <span>Best rates guaranteed</span>
                    </div>
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">🌍</div>
                        <span>Available 24/7 nationwide</span>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="auth-panel-right">
                <div className="auth-card glass-card page-enter">
                    <div className="auth-card-header">
                        <div className="auth-logo">ALFRAJ</div>
                        <h2>Welcome back</h2>
                        <p>Sign in to your account to continue</p>
                    </div>

                    {backendErrorMessage && (
                        <div className="alert alert-error" id="login-error">
                            <span>⚠</span> {backendErrorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} id="login-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-email">Email address</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="login-email"
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                                <span className="form-icon">✉</span>
                            </div>
                            {formErrors.email && <small className="form-error-text">{formErrors.email}</small>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="login-password">Password</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="login-password"
                                    className="form-input"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                />
                                <span className="form-icon">🔑</span>
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>
                            </div>
                            {formErrors.password && <small className="form-error-text">{formErrors.password}</small>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                            id="login-submit"
                        >
                            {loading ? <span className="spinner" /> : "Sign In"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account?{" "}
                        <Link to="/signup">Create one</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
