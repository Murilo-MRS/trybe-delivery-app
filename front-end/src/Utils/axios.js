import axios from 'axios';

const PORT = 3001;
const api = axios.create({ baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || PORT}` });

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const postRequest = async (endpoint, body, token) => {
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getRequest = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export default api;
