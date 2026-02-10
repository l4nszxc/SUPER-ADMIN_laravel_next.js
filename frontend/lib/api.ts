/**
 * Utility function to make authenticated API requests
 * Automatically includes the HttpOnly cookie token in requests
 */

interface FetchOptions extends RequestInit {
  includeAuth?: boolean;
}

export async function authenticatedFetch(
  url: string,
  options?: FetchOptions
): Promise<Response> {
  const { includeAuth = true, ...fetchOptions } = options || {};

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(fetchOptions.headers || {}),
  };

  return fetch(url, {
    ...fetchOptions,
    headers,
    credentials: 'include', // Important: includes HttpOnly cookies in the request
  });
}

/**
 * Make a request to the backend API with automatic token inclusion
 */
export async function backendFetch(
  path: string,
  options?: FetchOptions
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const url = `${baseUrl}/api${path.startsWith('/') ? path : '/' + path}`;

  return authenticatedFetch(url, {
    ...options,
    credentials: 'include',
  });
}
