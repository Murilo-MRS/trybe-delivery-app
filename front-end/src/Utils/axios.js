import axios from 'axios';
import { getUser } from './LocalStorage';

const PORT = 3001;
const api = axios.create({ baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || PORT}` });

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const postRequest = async (endpoint, body) => {
  const { token } = getUser() || { token: '' };
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getRequest = async (endpoint) => {
  const { token } = getUser() || { token: '' };
  setToken(token);
  const { data } = await api.get(endpoint);
  return data;
};

export const patchRequest = async (endpoint, body) => {
  const { token } = getUser() || { token: '' };
  setToken(token);
  const { data } = await api.patch(endpoint, body);
  return data;
};

export const deleteRequest = async (endpoint) => {
  const { token } = getUser() || { token: '' };
  setToken(token);
  return api.delete(endpoint);
};

export default api;
