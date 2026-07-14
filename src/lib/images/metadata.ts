import { readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

export interface PublicImageMetadata {
  width: number;
  height: number;
  type: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif' | 'image/svg+xml';
}

function pngSize(buffer: Buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpegSize(buffer: Buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error('JPEG dimensions not found');
}

export function getPublicImageMetadata(publicPath: string): PublicImageMetadata {
  const path = publicPath.split('?')[0];
  const extension = extname(path).toLowerCase();
  if (extension === '.svg') return { width: 512, height: 512, type: 'image/svg+xml' };
  const buffer = readFileSync(join(process.cwd(), 'public', path.replace(/^\//, '')));
  if (extension === '.png') return { ...pngSize(buffer), type: 'image/png' };
  if (extension === '.jpg' || extension === '.jpeg') return { ...jpegSize(buffer), type: 'image/jpeg' };
  if (extension === '.webp') return { width: 1200, height: 630, type: 'image/webp' };
  if (extension === '.avif') return { width: 1200, height: 630, type: 'image/avif' };
  throw new Error(`Unsupported public image type: ${publicPath}`);
}
