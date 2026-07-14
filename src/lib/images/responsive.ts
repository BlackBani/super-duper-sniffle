import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { getPublicImageMetadata } from './metadata';

export function getResponsiveImageData(publicPath: string, requestedWidths = [320, 480, 640, 800, 900, 1200]) {
  const metadata = getPublicImageMetadata(publicPath);
  const stem = publicPath.replace(/^\/images\//, '').replace(extname(publicPath), '').replaceAll('/', '-');
  const candidates = requestedWidths
    .filter((width) => width <= metadata.width)
    .map((width) => ({ width, src: `/images/generated/${stem}-${width}.webp` }))
    .filter(({ src }) => existsSync(join(process.cwd(), 'public', src.replace(/^\//, ''))));
  return {
    ...metadata,
    srcset: candidates.map(({ width, src }) => `${src} ${width}w`).join(', '),
  };
}
