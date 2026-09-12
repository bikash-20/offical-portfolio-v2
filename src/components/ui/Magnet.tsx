import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  /** Higher = stiffer (less movement). */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: CSSProperties;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
  style,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState('');
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = e;

    const insideX =
      clientX >= rect.left - padding && clientX <= rect.right + padding;
    const insideY =
      clientY >= rect.top - padding && clientY <= rect.bottom + padding;

    if (!insideX || !insideY) {
      if (active) {
        setActive(false);
        setTransform('');
      }
      return;
    }

    const offsetX = clientX - (rect.left + rect.width / 2);
    const offsetY = clientY - (rect.top + rect.height / 2);
    if (!active) setActive(true);
    setTransform(
      `translate3d(${offsetX / strength}px, ${offsetY / strength}px, 0)`
    );
  };

  const handleMouseLeave = () => {
    setActive(false);
    setTransform('');
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
