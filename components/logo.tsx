interface LogoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function AppLogo({ width, height, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Memoire logo"
    >
      <circle cx="100" cy="100" r="90" fill="#4A90E2" />

      <rect x="60" y="50" width="80" height="100" rx="4" fill="#FFFFFF" />

      <circle cx="70" cy="65" r="3" fill="#4A90E2" />
      <circle cx="70" cy="85" r="3" fill="#4A90E2" />
      <circle cx="70" cy="105" r="3" fill="#4A90E2" />
      <circle cx="70" cy="125" r="3" fill="#4A90E2" />

      <line
        x1="85"
        y1="65"
        x2="125"
        y2="65"
        stroke="#4A90E2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="85"
        y1="85"
        x2="125"
        y2="85"
        stroke="#4A90E2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="85"
        y1="105"
        x2="115"
        y2="105"
        stroke="#4A90E2"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <g transform="translate(100, 87) rotate(30)">
        <rect
          x="0"
          y="0"
          width="8"
          height="35"
          fill="#FFB84D"
          stroke="#E89B3C"
          strokeWidth="1"
        />
        <polygon points="0,35 4,42 8,35" fill="#333333" />
        <rect x="0" y="-6" width="8" height="6" fill="#FF6B6B" />
        <rect x="0" y="-2" width="8" height="2" fill="#C0C0C0" />
      </g>
    </svg>
  );
}
