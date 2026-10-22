import { useState } from 'react';

type BikeImageProps = {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  decorative?: boolean;
};

export function BikeImage({
  src,
  alt,
  className = '',
  eager = false,
  decorative = false,
}: BikeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <img
        className={`bike-image bike-image--fallback ${className}`}
        src="/images/bike-fallback.svg"
        alt={decorative ? '' : `${alt}. Schematic fallback shown.`}
        aria-hidden={decorative || undefined}
      />
    );
  }

  return (
    <img
      className={`bike-image ${className}`}
      src={src}
      alt={decorative ? '' : alt}
      aria-hidden={decorative || undefined}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding={eager ? 'sync' : 'async'}
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}
