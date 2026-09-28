import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// --- INJECTEUR GLOBAL DE STYLE CYBERPUNK ---
if (typeof window !== "undefined") {
  // 1. Injection de Tailwind CSS
  if (!document.getElementById("tailwind-cdn")) {
    const script = document.createElement("script");
    script.id = "tailwind-cdn";
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }

  // 2. Injection de la police Inter et des effets Glassmorphism globaux
  if (!document.getElementById("custom-premium-styles")) {
    const style = document.createElement("style");
    style.id = "custom-premium-styles";
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
      
      body {
        font-family: 'Inter', sans-serif !important;
        margin: 0;
        background: radial-gradient(circle at top right, #110c28, #050510) !important;
        background-attachment: fixed;
        color: #d1d5db;
        min-height: 100vh;
      }
      
      .glass-card {
        background-color: rgba(13, 12, 32, 0.6) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      
      .glass-card:hover {
        border-color: rgba(0, 242, 254, 0.4) !important;
        box-shadow: 0 0 20px rgba(0, 242, 254, 0.25) !important;
      }
    `;
    document.head.appendChild(style);
  }
}
// -------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)