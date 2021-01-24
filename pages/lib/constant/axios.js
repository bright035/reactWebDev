import axios, { AxiosError } from 'axios'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://cms.chtoma.com/api',
    responseType: 'json',
  });

export const axiosInstanceAuthen = axios.create({
    withCredentials: true,
    baseURL: 'http://cms.chtoma.com/api',
    responseType: 'json',
    headers:{
      "Authorization":
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAYWRtaW4uY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MiwiaWF0IjoxNjExNDM2ODQ2LCJleHAiOjE2MTkyMTI4NDZ9.3dFrr0AAem7ZiLRBk0vPn71QtoGZH7KK97PLeo0D1z4"
    }
  });