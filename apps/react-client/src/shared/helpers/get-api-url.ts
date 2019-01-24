const API_PREFIX = '/api/v1';

/**
 * Use this helper in API connectors to get full/complete URL path of the resource.
 * It adds constant prefix part to API resource path.
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
