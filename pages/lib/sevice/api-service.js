import axios, { AxiosError } from 'axios'
import {AES} from 'crypto-js'
import {axiosInstance} from '../constant'

export const axiosPost = async (values)=>{
    return (await axiosInstance.post('/login',{
      "email": "student@admin.com",
      "password": AES.encrypt("111111",'cms').toString(),
      "role": "student"
    }))
  }