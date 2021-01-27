import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { 
  Row,
  Col,
  Form,
  Input, 
  Checkbox, 
  Button, 
  Radio 
} from "antd"
import "antd/dist/antd.css"
import {axiosPost} from './lib/sevice'



export default function Login() {
  const router= useRouter()
  
  const onFinish= async (values)=>{
    try{
      const res= await axiosPost(values)
      // console.log(res)
      if(200<=res.status&&res.status<300){
          localStorage.setItem('token',res.data.data.token)
          if(values.role==="student"){
            router.push("/dashboard/student")
          } else if (values.role==="teacher"){
            router.push("/dashboard/teacher")
          } else if (values.role==="manager"){
            router.push("/dashboard/manager")
          }
      }
    } catch(e) {
      console.log(e.message)
    }
    
    
    
  }

    return (
     <Row justify='center'>
         <Col md={8} sm={16}>

            <Form
                layout="vertical"
                onFinish={onFinish}
            >

              <Form.Item>
                  <p id="formHeader">课程管理助手</p>
              </Form.Item>

              <Form.Item
                name="role"
                initialValue="student"
              >
                   <Radio.Group> 
                      <Radio.Button value="student">Student</Radio.Button>
                      <Radio.Button value="teacher">Teacher</Radio.Button>
                      <Radio.Button value="manager">Manager</Radio.Button>
                  </Radio.Group>
              </Form.Item>

              <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: '输入邮箱不符合Email格式',
                    },
                    {
                      required: true,
                      message: '请输入您的邮箱',
                    },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的密码',
                    },
                    {
                      min:4,
                      message:'至少输入4位密码',
                    },
                    {
                      max:16,
                      message:'至多输入16位密码',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
              </Form.Item>

              <Form.Item  
                name="remember"
                valuePropName="checked"
              >
                  <Checkbox>记住我</Checkbox>
              </Form.Item>  

              <Form.Item>
                <Button 
                  id="formBtn" 
                  type="primary" 
                  htmlType="submit"
                >
                  登录
                </Button>
              </Form.Item>            
            </Form>
         </Col>
     </Row>
    )
  }