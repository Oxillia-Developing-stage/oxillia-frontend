import { environment } from '../../environments/environment';

/**
 * Resolves the `/api/v1` base used by the Express API (dev: full origin, prod: same-origin path).
 */
export function apiV1Base(): string {
  const raw = environment.apiUrl.replace(/\/$/, '');
  if (raw === '') {
    return '/api/v1';
  }
  if (raw.endsWith('/api/v1')) {
    return raw;
  }
  return `${raw}/api/v1`;
}

export function isApiV1Request(url: string): boolean {
  const base = apiV1Base();
  return url.startsWith(base) || url.startsWith('/api/v1');
}
