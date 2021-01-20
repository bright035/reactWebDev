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
import { createServer } from "miragejs"

  // createServer({
  //   routes() {
  //     this.namespace = "/api"
  //     this.get(
  //         "/login", 
  //           () => [
  //             { id: "1", role: "Student", email: "ling@126.com", password: "123456" },
  //             { id: "2", role: "Teacher", email: "ling@126.com", password: "123456" },
  //             { id: "3", role: "Manager", email: "ling@126.com", password: "123456" },
          
  //     ])
  //   },
  // })

export default function Login() {
  let [users, setUsers] = useState([])
  let counter = false
  const [radioValue, setRadioValue] = useState("Student");
  const router= useRouter()



  // useEffect(() => {
  //     fetch("/api/login")
  //       .then((response) => response.json())
  //       .then((json) => setUsers(json))
  //   }, [])
  

  // const loginCheck=(values)=>{
  //    users.map((user) => {
  //      if(
  //        values.role===user.role
  //        &&values.email===user.email
  //        &&values.password===user.password){
  //          counter = true;
  //        }
  //    })
  //   return !counter
  // }

  
  const onFinish=(values)=>{     
    console.log('Received values of form: ', values);
    // if(loginCheck(values)){
        if(values.role==="Student"){
          router.push("/dashboard/student")
        } else if (values.role==="Teacher"){
          router.push("/dashboard/teacher")
        } else if (values.role==="Manager"){
          router.push("/dashboard/manager")
        }
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