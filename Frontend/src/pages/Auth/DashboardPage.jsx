import React from "react";
import { useAuth } from "../Frontend/src/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    function getInitials(name) {
        if (!name) return "?";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    }

    function formatBalance(balance) {
        return new Intl.NumberFormat("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(balance || 0);
    }

    // Mock recent transactions for demo
    const recentTransactions = [
        { id: 1, type: "TOP-UP", amount: 5000, status: "Successful", date: "Feb 22, 2026", direction: "credit" },
        { id: 2, type: "AIRTIME", amount: 1000, status: "Successful", date: "Feb 21, 2026", direction: "debit" },
        { id: 3, type: "DATA", amount: 2500, status: "Pending", date: "Feb 21, 2026", direction: "debit" },
        { id: 4, type: "TOP-UP", amount: 10000, status: "Successful", date: "Feb 20, 2026", direction: "credit" },
    ];

    const quickActions = [
        {
            title: "Top-Up",
            subtitle: "Fund your wallet",
            icon: "💳",
            className: "topup",
        },
        {
            title: "Airtime",
            subtitle: "Buy airtime",
            icon: "📱",
            className: "airtime",
        },
        {
            title: "Data",
            subtitle: "Buy data bundle",
            icon: "📡",
            className: "data",
        },
        {
            title: "History",
            subtitle: "View transactions",
            icon: "📋",
            className: "history",
        },
    ];

    return (
        <div className="dashboard-layout">
            <div className="bg-animated" />

            {/* Top Navigation */}
            <nav className="top-nav" id="dashboard-nav">
                <div className="nav-brand">ALFRAJ</div>
                <div className="nav-right">
                    <div className="nav-user">
                        <div className="nav-avatar">{getInitials(user?.name)}</div>
                        <div className="nav-user-info">
                            <div className="nav-user-name">{user?.name || "User"}</div>
                            <div className="nav-user-email">{user?.email || ""}</div>
                        </div>
                    </div>
                    <button
                        className="btn-logout"
                        onClick={handleLogout}
                        id="logout-btn"
                    >
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="dashboard-container page-enter">

                {/* Welcome */}
                <div className="welcome-section">
                    <div className="welcome-greeting">{getGreeting()}</div>
                    <h1 className="welcome-name">{user?.name || "User"} 👋</h1>
                </div>

                {/* Balance Card */}
                <div className="balance-card" id="balance-card">
                    <div className="balance-label">Available Balance</div>
                    <div className="balance-amount">
                        <span className="balance-currency">₦</span>
                        {formatBalance(user?.balance)}
                    </div>
                    <div className="balance-id">Account ID: {user?.id?.slice(-8)?.toUpperCase() || "--------"}</div>
                </div>

                {/* Quick Actions */}
                <h2 className="section-title">Quick Actions</h2>
                <div className="quick-actions" id="quick-actions">
                    {quickActions.map((action) => (
                        <div
                            className="action-card"
                            key={action.title}
                            id={`action-${action.className}`}
                            role="button"
                            tabIndex={0}
                        >
                            <div className={`action-icon ${action.className}`}>
                                {action.icon}
                            </div>
                            <div className="action-title">{action.title}</div>
                            <div className="action-subtitle">{action.subtitle}</div>
                        </div>
                    ))}
                </div>

                {/* Info Grid */}
                <div className="info-grid">
                    {/* Account Info */}
                    <div className="glass-card info-card" id="account-info-card">
                        <div className="info-card-header">
                            <div className="info-card-title">Account Info</div>
                            <span className="info-card-badge badge-active">Active</span>
                        </div>
                        <div className="info-item">
                            <span className="info-item-label">Full Name</span>
                            <span className="info-item-value">{user?.name || "—"}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-item-label">Email</span>
                            <span className="info-item-value">{user?.email || "—"}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-item-label">Phone</span>
                            <span className="info-item-value">{user?.phoneNumber || "Not set"}</span>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="glass-card info-card" id="transactions-card">
                        <div className="info-card-header">
                            <div className="info-card-title">Recent Transactions</div>
                        </div>
                        <div className="transactions-list">
                            {recentTransactions.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">📭</div>
                                    <div className="empty-state-text">No transactions yet</div>
                                </div>
                            ) : (
                                recentTransactions.map((tx) => (
                                    <div className="transaction-item" key={tx.id}>
                                        <div className={`transaction-icon ${tx.direction}`}>
                                            {tx.direction === "credit" ? "↗" : "↙"}
                                        </div>
                                        <div className="transaction-details">
                                            <div className="transaction-type">{tx.type}</div>
                                            <div className="transaction-date">{tx.date}</div>
                                        </div>
                                        <div className={`transaction-amount ${tx.direction}`}>
                                            {tx.direction === "credit" ? "+" : "-"}₦
                                            {tx.amount.toLocaleString()}
                                        </div>
                                        <span
                                            className={`transaction-status status-${tx.status.toLowerCase()}`}
                                        >
                                            {tx.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
