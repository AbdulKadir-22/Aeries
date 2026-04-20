import React from "react";

export default function TulipSVG({ dark }) {
  const stemColor = dark ? "#7c3f8e" : "#d46fa0";
  const petalMain = dark ? "#b56ed4" : "#f472b6";
  const petalEdge = dark ? "#7e22ce" : "#db2777";
  const petalLight = dark ? "#e0aaff" : "#fce7f3";
  const leafColor = dark ? "#5b8a5e" : "#6db07d";

  return (
    <svg
      viewBox="0 0 200 340"
      width="200"
      height="340"
      style={{ filter: "drop-shadow(0 8px 32px #f472b640)", display: "block" }}
    >
      {/* Stem */}
      <path
        d="M100 320 Q98 260 100 200"
        stroke={stemColor}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        style={{ animation: "stemSway 4s ease-in-out infinite alternate" }}
      />
      {/* Left leaf */}
      <path
        d="M100 260 Q70 230 55 200 Q80 220 100 248"
        fill={leafColor}
        opacity="0.85"
        style={{ animation: "leafSway 4s ease-in-out infinite alternate" }}
      />
      {/* Right leaf */}
      <path
        d="M100 245 Q130 215 148 185 Q122 208 100 235"
        fill={leafColor}
        opacity="0.85"
        style={{ animation: "leafSway2 4s ease-in-out infinite alternate" }}
      />

      {/* Tulip petals - outer back */}
      <ellipse
        cx="100"
        cy="130"
        rx="28"
        ry="58"
        fill={petalEdge}
        opacity="0.55"
        style={{ transform: "rotate(-18deg)", transformOrigin: "100px 190px", animation: "petalSway 4s ease-in-out infinite alternate" }}
      />
      <ellipse
        cx="100"
        cy="130"
        rx="28"
        ry="58"
        fill={petalEdge}
        opacity="0.55"
        style={{ transform: "rotate(18deg)", transformOrigin: "100px 190px", animation: "petalSway2 4s ease-in-out infinite alternate" }}
      />

      {/* Tulip petals - middle */}
      <ellipse cx="78" cy="140" rx="22" ry="52" fill={petalMain} opacity="0.8"
        style={{ transform: "rotate(-8deg)", transformOrigin: "100px 195px", animation: "petalSway 4s 0.2s ease-in-out infinite alternate" }} />
      <ellipse cx="122" cy="140" rx="22" ry="52" fill={petalMain} opacity="0.8"
        style={{ transform: "rotate(8deg)", transformOrigin: "100px 195px", animation: "petalSway2 4s 0.2s ease-in-out infinite alternate" }} />

      {/* Center petal */}
      <ellipse cx="100" cy="125" rx="23" ry="55" fill={petalLight} opacity="0.7"
        style={{ animation: "petalCenter 4s ease-in-out infinite alternate" }} />

      {/* Inner glow */}
      <ellipse cx="100" cy="155" rx="14" ry="20" fill={petalEdge} opacity="0.3" />

      {/* Stamens */}
      <line x1="100" y1="175" x2="100" y2="155" stroke="#f9a8d4" strokeWidth="2" opacity="0.7" />
      <circle cx="100" cy="152" r="3" fill="#fce7f3" opacity="0.9" />
      <line x1="94" y1="178" x2="93" y2="159" stroke="#f9a8d4" strokeWidth="2" opacity="0.6" />
      <circle cx="93" cy="156" r="2.5" fill="#fce7f3" opacity="0.8" />
      <line x1="106" y1="178" x2="107" y2="159" stroke="#f9a8d4" strokeWidth="2" opacity="0.6" />
      <circle cx="107" cy="156" r="2.5" fill="#fce7f3" opacity="0.8" />

      <style>{`
        @keyframes petalSway {
          from { transform: rotate(-18deg); }
          to { transform: rotate(-14deg); }
        }
        @keyframes petalSway2 {
          from { transform: rotate(18deg); }
          to { transform: rotate(14deg); }
        }
        @keyframes petalCenter {
          from { transform: scaleX(1); }
          to { transform: scaleX(1.04); }
        }
        @keyframes stemSway {
          from { transform: rotate(-1.5deg); transform-origin: 100px 320px; }
          to { transform: rotate(1.5deg); transform-origin: 100px 320px; }
        }
        @keyframes leafSway {
          from { transform: rotate(-3deg); transform-origin: 100px 260px; }
          to { transform: rotate(0deg); transform-origin: 100px 260px; }
        }
        @keyframes leafSway2 {
          from { transform: rotate(3deg); transform-origin: 100px 245px; }
          to { transform: rotate(0deg); transform-origin: 100px 245px; }
        }
      `}</style>
    </svg>
  );
}
