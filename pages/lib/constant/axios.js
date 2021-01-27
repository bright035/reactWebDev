import axios, { AxiosError } from 'axios'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://cms.chtoma.com/api',
    responseType: 'json',
  });

export const axiosInstanceAuthen = axios.create({
    withCredentials: true,
    baseURL: 'https://cms.chtoma.com/api',
    responseType: 'json',
    headers:{
      "Authorization":
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjExNjM4MDI5LCJleHAiOjE2MTk0MTQwMjl9.Y0sx0PfFDjK1qZLhneaV7ArxktTRsbSixYjd5YvVIIE`
    }
  });