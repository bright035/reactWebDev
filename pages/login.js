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
  let [users, setUsers] = useState([])
  let [response, setResponse] = useState({})
  let counter = false
  const [radioValue, setRadioValue] = useState("Student");
  const router= useRouter()
  
  const onFinish= async (values)=>{
    //同步问题没有解决,刷新后第一次的hook值undefined     
    const res= await axiosPost(values)
                .then((res)=>{setResponse(res.data);
                              setTimeout(1000)
                            })
                .catch((err)=>console.log(err.message))
    console.log(response.data)
    // if(loginCheck(values)){
        // if(values.role==="Student"){
        //   router.push("/dashboard/student")
        // } else if (values.role==="Teacher"){
        //   router.push("/dashboard/teacher")
        // } else if (values.role==="Manager"){
        //   router.push("/dashboard/manager")
        // }
    // }
    
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
                initialValue="Student"
              >
                   <Radio.Group> 
                      <Radio.Button value="Student">Student</Radio.Button>
                      <Radio.Button value="Teacher">Teacher</Radio.Button>
                      <Radio.Button value="Manager">Manager</Radio.Button>
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
                name="check"
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