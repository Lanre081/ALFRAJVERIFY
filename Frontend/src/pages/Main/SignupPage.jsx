import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export default function SignupPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    }

    function validate() {
        if (form.name.trim().length < 3) return "Name must be at least 3 characters";
        if (!form.email.trim()) return "Email is required";
        if (form.password.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(form.password))
            return "Password must include uppercase, lowercase, number, and special character";
        if (form.password !== form.confirmPassword) return "Passwords do not match";
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await registerUser(form);
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

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

                    {error && (
                        <div className="alert alert-error" id="signup-error">
                            <span>⚠</span> {error}
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success" id="signup-success">
                            <span>✓</span> {success}
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
                                    name="name"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                                <span className="form-icon">👤</span>
                            </div>
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
