/**
 * Base API client configuration
 */

// Define base URL configurations for different environments
const API_URLS = {
  development: 'https://api-dev.mvuvi.co.ke',
  production: 'https://api.mvuvi.co.ke',
  test: 'https://api-test.mvuvi.co.ke',
} as const;

// Get the current environment
const ENV = process.env.NODE_ENV || 'development';
const BASE_URL = API_URLS[ENV as keyof typeof API_URLS];

/**
 * Fetch API wrapper with error handling
 * @param endpoint - API endpoint path
 * @param options - Fetch options
 */
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Handle HTTP errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  
  // Parse and return the response data
  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, data: unknown, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data)
    }),
  
  put: <T>(endpoint: string, data: unknown, options?: RequestInit) => 
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  
  delete: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};
