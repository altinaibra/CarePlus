interface Props {
  width?: string;
  height?: string;
}

export default function ApplicationLogo({ width, height }: Props) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>

        <linearGradient id="right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
      </defs>

      <path
        d="M150 220L80 150C40 110 40 60 80 30C115 5 150 25 150 60"
        fill="url(#left)"
      />

      <path
        d="M150 220L220 150C260 110 260 60 220 30C185 5 150 25 150 60"
        fill="url(#right)"
      />

      <rect x="130" y="100" width="40" height="90" rx="8" fill="#fff" />
      <rect x="100" y="130" width="100" height="40" rx="8" fill="#fff" />
    </svg>
  );
}
