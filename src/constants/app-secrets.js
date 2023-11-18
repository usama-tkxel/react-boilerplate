const SECRETS = {
  apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  originUrl: import.meta.env.VITE_APP_ORIGIN_URL,
};

export const { originUrl, apiBaseUrl } = SECRETS;

export default SECRETS;
