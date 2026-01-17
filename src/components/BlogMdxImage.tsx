import Image, { type ImageProps } from 'next/image';

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function shimmerSvg(width: number, height: number) {
  // Lightweight, dependency-free blur placeholder.
  // Inspired by common Next.js shimmer placeholder patterns.
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgba(255,255,255,0.06)" offset="20%" />
      <stop stop-color="rgba(255,255,255,0.14)" offset="50%" />
      <stop stop-color="rgba(255,255,255,0.06)" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="rgba(255,255,255,0.06)" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1.2s" repeatCount="indefinite" />
</svg>`.trim();
}

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export default function BlogMdxImage(props: ImageProps) {
  const width = toNumber(props.width) ?? 896;
  const height = toNumber(props.height) ?? Math.round((896 * 9) / 16);

  // Most blog images are rendered inside a max-w-4xl (~896px) article.
  // Providing realistic `sizes` prevents the browser from downloading overly-large srcset variants.
  const sizes =
    props.sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px';

  return (
    <Image
      {...props}
      sizes={sizes}
      quality={props.quality ?? 72}
      placeholder={props.placeholder ?? 'blur'}
      blurDataURL={props.blurDataURL ?? svgToDataUrl(shimmerSvg(width, height))}
    />
  );
}
