import axios, { AxiosError } from 'axios'
import {AES} from 'crypto-js'
import {axiosInstance,axiosInstanceAuthen} from '../constant'

export const axiosPost = async (values)=>{
    return (
        await axiosInstance.post('/login',{
            "email": values.email,
            "password": AES.encrypt(values.password,'cms').toString(),
            "role": values.role
    }))
  }

export const axiosGetStudentByID = async (uid) =>{
    return (
        await axiosInstanceAuthen.get('/courses?uid='+uid))
}