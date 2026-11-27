interface Props {
  number: number;
  description: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function ImagePlaceholder({ number, description, width = '100%', height = '320px', className }: Props) {
  return (
    <div
      className={`img-placeholder${className ? ` ${className}` : ''}`}
      style={{ width, height }}
      role="img"
      aria-label={`Placeholder for image ${number}: ${description}`}
    >
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
        <p style={{ margin: 0, fontWeight: 600, color: 'oklch(0.72 0.06 210)' }}>
          Image #{number}
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>
          {description}
        </p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', opacity: 0.7 }}>
          Site under construction — an image will be here soon :)
        </p>
      </div>
    </div>
  );
}
