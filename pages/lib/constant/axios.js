import axios, { AxiosError } from 'axios'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://cms.chtoma.com/api',
    responseType: 'json',
  });