import type { CSSProperties } from 'react';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export default function LiveProjectButton({
  href = '#',
  label = 'Live Project',
  className = '',
  style,
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] sm:px-10 sm:py-3.5 sm:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className}`}
      style={style}
    >
      {label}
    </a>
  );
}
