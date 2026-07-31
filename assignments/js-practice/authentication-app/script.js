async function registerUser(email, password, username, role = "USER") {
  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
          username,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Response
    const newUser = data.data.user;
    console.log("Registered User:", newUser);
    return newUser;
  } catch (error) {
    console.error(`Registration Error: ${error.message}`);
    throw error;
  }
}

async function loginUser(username, password) {
  try {
    const response = await fetch("https://api.freeapi.app/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        username,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);

    return data;
  } catch (error) {
    console.error(`Login Error: ${error.message}`);
    throw error;
  }
}

async function logout() {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/logout",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error(`Logout Error: ${error.message}`);
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/current-user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Current user failed");
    }

    return data;
  } catch (error) {
    console.error(`Logout Error: ${error.message}`);
    throw error;
  }
}

const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    try {
      const user = await registerUser(email, password, username);
      window.location.href = "login.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const result = await loginUser(username, password);
      console.log("Logged In", result);
      window.location.href = "welcome.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    try {
      const logoutUser = await logout();
      console.log("Logged In", logoutUser);
      window.location.href = "login.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

const protectedContent = document.getElementById("welcome-title");

if (protectedContent) {
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const result = await getCurrentUser();
      protectedContent.textContent = `Hey, ${result.data.username}✦`;
    } catch (error) {
      window.location.href = "login.html";
    }
  });
}
