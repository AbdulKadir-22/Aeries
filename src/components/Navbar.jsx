import React from "react";

export default function Navbar({ dark, setDark }) {
  const links = ["Home", "About Me", "Paintings", "Skills", "Projects", "Contact"];

  return (
    <nav style={{
      position: "fixed",
      top: "18px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      width: "min(900px, 94vw)",
      background: dark
        ? "rgba(60, 10, 90, 0.45)"
        : "rgba(255, 230, 245, 0.55)",
      backdropFilter: "blur(18px) saturate(160%)",
      WebkitBackdropFilter: "blur(18px) saturate(160%)",
      border: dark
        ? "1.5px solid rgba(180,100,230,0.25)"
        : "1.5px solid rgba(240,150,200,0.4)",
      borderRadius: "999px",
      padding: "0 28px",
      height: "58px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: dark
        ? "0 8px 40px rgba(120,0,180,0.22), 0 1.5px 0 rgba(200,100,255,0.08) inset"
        : "0 8px 40px rgba(236,72,153,0.13), 0 1.5px 0 rgba(255,255,255,0.5) inset",
      transition: "background 0.4s, box-shadow 0.4s, border 0.4s",
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 800,
        fontSize: "1.25rem",
        letterSpacing: "-0.02em",
        background: dark
          ? "linear-gradient(135deg, #e0aaff, #b56ed4)"
          : "linear-gradient(135deg, #db2777, #f472b6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        whiteSpace: "nowrap",
        cursor: "pointer",
        userSelect: "none",
      }}>✦ Ariont</div>

      {/* Links */}
      <ul style={{
        display: "flex",
        gap: "4px",
        listStyle: "none",
        margin: 0,
        padding: 0,
        alignItems: "center",
      }}>
        {links.map((l) => (
          <li key={l}>
            <a href="#" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: dark ? "#e0aaff" : "#9d174d",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "999px",
              display: "block",
              transition: "background 0.2s, color 0.2s",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => {
                e.target.style.background = dark ? "rgba(180,100,230,0.2)" : "rgba(236,72,153,0.1)";
                e.target.style.color = dark ? "#f0d4ff" : "#be185d";
              }}
              onMouseLeave={e => {
                e.target.style.background = "transparent";
                e.target.style.color = dark ? "#e0aaff" : "#9d174d";
              }}
            >{l}</a>
          </li>
        ))}
      </ul>

      {/* Dark/Light toggle */}
      <button
        onClick={() => setDark(!dark)}
        aria-label="Toggle dark mode"
        style={{
          background: dark
            ? "linear-gradient(135deg, #7e22ce, #b56ed4)"
            : "linear-gradient(135deg, #f472b6, #db2777)",
          border: "none",
          borderRadius: "999px",
          width: "42px",
          height: "24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: dark ? "flex-end" : "flex-start",
          padding: "3px",
          transition: "background 0.4s",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <span style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}>{dark ? "🌙" : "☀️"}</span>
      </button>
    </nav>
  );
}
