import React, { useState } from "react";

function Settings() {
  const [theme, setTheme] = useState("light");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.style.setProperty("--primary-color", "#2c3e50");
      root.style.setProperty("--secondary-color", "#9b59b6");
      root.style.setProperty("--background-color", "#34495e");
      root.style.setProperty("--text-color", "#ecf0f1");
    } else if (newTheme === "blue") {
      root.style.setProperty("--primary-color", "#3498db");
      root.style.setProperty("--secondary-color", "#2ecc71");
      root.style.setProperty("--background-color", "#f4f4f4");
      root.style.setProperty("--text-color", "#333");
    } else {
      // Light theme
      root.style.setProperty("--primary-color", "#f39c12");
      root.style.setProperty("--secondary-color", "#16a085");
      root.style.setProperty("--background-color", "#ecf0f1");
      root.style.setProperty("--text-color", "#2c3e50");
    }
  };

  return (
    <div>
      <button onClick={() => changeTheme("light")}>Aydınlık Tema</button>
      <button onClick={() => changeTheme("dark")}>Karanlık Tema</button>
      <button onClick={() => changeTheme("blue")}>Mavi Tema</button>

      <div
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <h1 style={{ color: "var(--primary-color)" }}>Dinamik Tema Seçimi</h1>
        <p style={{ color: "var(--secondary-color)" }}>
          Seçilen tema: {theme.charAt(0).toUpperCase() + theme.slice(1)} Tema
        </p>
      </div>
    </div>
  );
}

export default Settings;
