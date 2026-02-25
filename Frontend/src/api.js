const API_BASE = "http://localhost:3000";

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("alfraj_token");

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();

    if (!res.ok) {
        // celebrate validation errors come in a specific shape
        if (data.validation) {
            const details = data.validation.body || data.validation.query || {};
            const message =
                details.message || "Validation failed. Please check your inputs.";
            throw new Error(message);
        }
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export async function registerUser({ name, email, phoneNumber, password, confirmPassword }) {
    return request("/users/register", {
        method: "POST",
        body: JSON.stringify({ name, email, phoneNumber, password, confirmPassword }),
    });
}

export async function loginUser({ email, password }) {
    return request("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function getAllUsers() {
    return request("/users");
}
