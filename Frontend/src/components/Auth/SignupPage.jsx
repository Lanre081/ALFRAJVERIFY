import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { validateUserRegister } from "../../Validators/auth.validator";

export default function SignupPage() {
    const navigate = useNavigate();
    const { register, data, error, loading } = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validateUserRegister(form);
        setFormErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        register(form);
    }

    useEffect(() => {
        if (!data?.success) return;

        const timer = setTimeout(() => navigate("/login"), 2000);
        return () => clearTimeout(timer);
    }, [data, navigate]);

    const successMessage = useMemo(() => (
        data?.success ? (data?.message || "Account created successfully! Redirecting to login...") : ""
    ), [data]);

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
                    <p>Join thousands of users enjoying seamless digital transactions.</p>
                </div>
                <div className="auth-features">
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">🚀</div>
                        <span>Get started in minutes</span>
                    </div>
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">💰</div>
                        <span>Competitive pricing</span>
                    </div>
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">📱</div>
                        <span>All networks supported</span>
                    </div>
                    <div className="auth-feature-item">
                        <div className="auth-feature-icon">🎯</div>
                        <span>99.9% success rate</span>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="auth-panel-right">
                <div className="auth-card glass-card page-enter">
                    <div className="auth-card-header">
                        <div className="auth-logo">ALFRAJ</div>
                        <h2>Create account</h2>
                        <p>Start your journey with ALFRAJ Verify</p>
                    </div>

                    {backendErrorMessage && (
                        <div className="alert alert-error" id="signup-error">
                            <span>⚠</span> {backendErrorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="alert alert-success" id="signup-success">
                            <span>✓</span> {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} id="signup-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-name">Full name</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="signup-name"
                                    className="form-input"
                                    type="text"
                                    name="username"
                                    placeholder="John Doe"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                                <span className="form-icon">👤</span>
                            </div>
                            {formErrors.username && <small className="form-error-text">{formErrors.username}</small>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-email">Email address</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="signup-email"
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
                            <label className="form-label" htmlFor="signup-phone">
                                Phone number <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(optional)</span>
                            </label>
                            <div className="form-input-wrapper">
                                <input
                                    id="signup-phone"
                                    className="form-input"
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="08012345678"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                />
                                <span className="form-icon">📞</span>
                            </div>
                            {formErrors.phoneNumber && <small className="form-error-text">{formErrors.phoneNumber}</small>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-password">Password</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="signup-password"
                                    className="form-input"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Min. 8 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
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

                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-confirm">Confirm password</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="signup-confirm"
                                    className="form-input"
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Re-enter password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                                <span className="form-icon">🔒</span>
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    aria-label={showConfirm ? "Hide password" : "Show password"}
                                >
                                    {showConfirm ? "🙈" : "👁"}
                                </button>
                            </div>
                            {formErrors.confirmPassword && <small className="form-error-text">{formErrors.confirmPassword}</small>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                            id="signup-submit"
                        >
                            {loading ? <span className="spinner" /> : "Create Account"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
