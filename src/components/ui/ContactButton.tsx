import type { CSSProperties, MouseEvent } from 'react';

interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

const baseStyle: CSSProperties = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow:
    '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
  outline: '2px solid white',
  outlineOffset: '-3px',
};

export default function ContactButton({
  label = 'Contact Me',
  href = '#contact',
  onClick,
  className = '',
  style,
  ariaLabel,
}: ContactButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base transition-transform duration-200 hover:scale-[1.02] ${className}`}
      style={{ ...baseStyle, ...style }}
    >
      {label}
    </a>
  );
}
