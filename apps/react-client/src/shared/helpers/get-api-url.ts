const API_PREFIX = '/api/v1';

/**
 * Use this helper in API connectors to get full/complete URL path of the resource.
 * It adds constant prefix part to API resource path.
 */
export function getApiUrl(params: {
  readonly path: string;
  readonly queryParams?: Array<
    | string
    | {
        readonly name: string;
        // This is really any
        /* tslint:disable-next-line:no-any */
        readonly value: any;
      }
  >;
}): string {
  const { path, queryParams = [] } = params;
  let queryString = queryParams
    .map(paramItem =>
      typeof paramItem === 'string'
        ? paramItem
        : `${paramItem.name}=${paramItem.value}`,
    )
    .join('&');

  if (queryString.length) {
    queryString = '?' + queryString;
  }

  if (!path || !path.length) {
    return API_PREFIX + '/' + queryString;
  }

  let normalizedPath = path;

  if (path[0] !== '/') {
    normalizedPath = '/' + normalizedPath;
  }
  if (path[path.length - 1] !== '/') {
    normalizedPath = normalizedPath + '/';
  }

  return API_PREFIX + normalizedPath + queryString;
}
