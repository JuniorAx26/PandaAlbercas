type Props = {
  className?: string;
  size?: number;
  variant?: "light" | "dark";
};

/**
 * Logo minimalista — panda asomando en una alberca con salvavidas naranja.
 * Variante `light` para fondos oscuros, `dark` para fondos claros.
 */
export function PandaLogo({ className, size = 44, variant = "dark" }: Props) {
  const water  = variant === "light" ? "#FBFCFD" : "#1E8FB8";
  const waterDeep = variant === "light" ? "#D9F0F8" : "#0A5572";
  const ink    = variant === "light" ? "#FBFCFD" : "#0B0D10";
  const fur    = variant === "light" ? "#FBFCFD" : "#FBFCFD";
  const ring   = "#F36D2A"; // salvavidas naranja
  const ringB  = "#FBFCFD";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Triana's clean — panda con salvavidas en alberca"
    >
      {/* fondo alberca circular */}
      <circle cx="48" cy="48" r="46" fill={water} />
      <path
        d="M2 60 Q24 50 48 60 T94 60 L94 94 L2 94 Z"
        fill={waterDeep}
        opacity="0.55"
      />
      {/* salvavidas */}
      <g>
        <circle cx="48" cy="55" r="28" fill={ring} />
        <circle cx="48" cy="55" r="17" fill={ringB} />
        {/* franjas blancas del salvavidas */}
        <rect x="46" y="27" width="4" height="11" fill={ringB} />
        <rect x="46" y="72" width="4" height="11" fill={ringB} />
        <rect x="20" y="53" width="11" height="4" fill={ringB} />
        <rect x="65" y="53" width="11" height="4" fill={ringB} />
      </g>
      {/* panda dentro del salvavidas */}
      <g>
        {/* cabeza */}
        <circle cx="48" cy="55" r="14" fill={fur} />
        {/* orejas */}
        <circle cx="36" cy="44" r="5.2" fill={ink} />
        <circle cx="60" cy="44" r="5.2" fill={ink} />
        {/* parches ojos */}
        <ellipse cx="42.5" cy="54" rx="3.6" ry="4.4" fill={ink} transform="rotate(-12 42.5 54)" />
        <ellipse cx="53.5" cy="54" rx="3.6" ry="4.4" fill={ink} transform="rotate(12 53.5 54)" />
        {/* ojos */}
        <circle cx="42.5" cy="54" r="1.3" fill={fur} />
        <circle cx="53.5" cy="54" r="1.3" fill={fur} />
        {/* nariz */}
        <ellipse cx="48" cy="60" rx="1.6" ry="1.1" fill={ink} />
        {/* boca */}
        <path d="M46 62.5 Q48 64.5 50 62.5" stroke={ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
      {/* burbujas */}
      <circle cx="22" cy="78" r="2" fill={ringB} opacity="0.85" />
      <circle cx="76" cy="74" r="1.6" fill={ringB} opacity="0.7" />
      <circle cx="82" cy="84" r="1.2" fill={ringB} opacity="0.6" />
    </svg>
  );
}
