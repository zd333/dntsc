const STATIC_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Use this helper in API connectors that require authentication to get auth headers.
 * Returns headers as object.
 * If you need any other headers - then you have to merge result headers object with your headers object.
 */
export const getAuthHeadersForApiRequest = (
  authToken: string | undefined,
): { readonly [key: string]: string } =>
  authToken
    ? {
        ...STATIC_HEADERS,
        Authorization: `Bearer ${authToken}`,
      }
    : STATIC_HEADERS;
