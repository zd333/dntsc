export const API_PREFIX = '/api/v1';

/**
 * Adds prefix to API resource path.
 * Use this to get URL for every API request.
 */
export function getApiUrl(path: string): string {
  if (!path || !path.length) {
    return API_PREFIX + '/';
  }

  let normalizedPath = path;

  if (path[0] !== '/') {
    normalizedPath = '/' + normalizedPath;
  }
  if (path[path.length - 1] !== '/') {
    normalizedPath = normalizedPath + '/';
  }

  return API_PREFIX + normalizedPath;
}
