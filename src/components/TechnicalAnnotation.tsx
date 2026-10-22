import type { CSSProperties } from 'react';

type TechnicalAnnotationProps = {
  number: string;
  children: string;
  className?: string;
  align?: 'left' | 'right';
  style?: CSSProperties;
};

export function TechnicalAnnotation({
  number,
  children,
  className = '',
  align = 'left',
  style,
}: TechnicalAnnotationProps) {
  return (
    <div
      className={`technical-annotation technical-annotation--${align} ${className}`}
      style={style}
    >
      <span className="technical-annotation__point" aria-hidden="true" />
      <span className="technical-annotation__rule" aria-hidden="true" />
      <span className="technical-annotation__copy">
        <small>{number}</small>
        <span>{children}</span>
      </span>
    </div>
  );
}
