import type { APIRoute } from 'astro';
import { buildInfo } from '../config/build';

export const prerender = true;

export const GET: APIRoute = () => new Response(JSON.stringify(buildInfo, null, 2), {
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});
