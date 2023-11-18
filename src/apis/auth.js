// authService.js
import apiService from 'src/services/api-service';

import { apiBaseUrl } from 'src/constants/app-secrets';

const DEFAULT_AUTH_URL = `${apiBaseUrl}/backend/v1`;

export const loginApi = async ({ email, password } = {}) => {
  return apiService.post(`${DEFAULT_AUTH_URL}/login`, {
    email,
    password,
  });
};

export const resetPasswordApi = async (data = {}) => {
  const response = await apiService.post(`${DEFAULT_AUTH_URL}/reset-password`, {
    ...data,
  });
  return response.data;
};

export const changePasswordApi = async (data = {}) => {
  const response = await apiService.post(
    `${DEFAULT_AUTH_URL}/change-password`,
    {
      ...data,
    },
  );
  return response.data;
};

export const forgotPasswordApi = async (email = '') => {
  return axios.post(`${DEFAULT_AUTH_URL}/forget-password`, {
    email,
  });
};

export const logoutApi = async () => {
  const response = await apiService.post('/logout');
  return response;
};
