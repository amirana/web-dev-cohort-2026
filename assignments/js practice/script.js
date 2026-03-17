const toggleBtn = document.getElementById("toggle-btn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "Toggle to Light Mode";
} else {
    toggleBtn.textContent = "Toggle to Dark Mode";
}

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    toggleBtn.textContent = isDark ? "Toggle to Light Mode" : "Toggle to Dark Mode";
    
});
