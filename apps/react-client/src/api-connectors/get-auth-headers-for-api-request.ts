export function getAuthHeadersForApiRequest(authToken: string | undefined): { [key: string]: any } {

  return authToken
    ? {
      Authorization: `Bearer ${authToken}`,
    }
    : {};
}
