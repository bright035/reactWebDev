import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React, {useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Select,Form,Input, Table, Button, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ExportOutlined,
  AudioOutlined,
  PlusOutlined 
} from '@ant-design/icons';
import "antd/dist/antd.css"
import AppLayout from '../lib/component/layout'
import {axiosGetStudentsByPage} from '../lib/sevice'
import { axiosInstance } from '../lib/constant'
import {useRouter} from 'next/router'

const { Search } = Input;
const columns=[
  {
    title:'No.',
    key: 'index',
    render: (_1, _2, index) => index + 1,
  },
  {
    title:'Name',
    dataIndex: 'name',
  },
  {
    title: 'Area',
    dataIndex: 'area',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title:'Selected Curriculum',
    dataIndex: 'courses',
  },
  {
    title: 'Student type',
    dataIndex: 'typeName',
  },
  {
    title: 'Join time',
    dataIndex: 'ctime',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const onSearch = value => console.log(value);

                
  


export default function Manager() {
    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const [data, setData] = useState([])
    const studentData= async ()=>{
      let page=1
      let limit=10
      try{
        const ans = await axiosGetStudentsByPage(page,limit)
        console.log(ans)
        //const data2 = ans.data.data.students
        const data2 =ans.data.data.students.map((item)=>{
          return {
            'name':item.name,
            'area':item.country,
            'email':item.email,
            'courses': item.courses.map((subItem)=>{return subItem.name}).toString(),
            'typeName':item.type.name,
            'ctime':item.createdAt
          }
        })
        console.log(data2)
        setData(data2)
      } catch(e){
        console.log(e.message)
      }
      return true
    }
    
    useEffect(() => {
      axiosGetStudentsByPage(1,10).then((res) => {
        const students = res.data.data.students.map((item)=>{
          return {
            'name':item.name,
            'area':item.country,
            'email':item.email,
            'courses': item.courses.map((subItem)=>{return subItem.name}).toString(),
            'typeName':item.type.name,
            'ctime':item.createdAt
          }
        })
        console.log(students)
        setData(students);
      }).catch(e=>console.log(e.message))
    }, [])
    const onChange=()=>{

    }
    const showModal = () => {
      setVisible(true);
    };
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };
    const modalFinish=()=>{

    }
    const router= useRouter()
    
    return (
      <AppLayout>
        <p>Crumble</p>
      
        <div>
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}>
                Add
          </Button>
          <div id='studentSearch'>
            <Search 
            placeholder="通过名称搜索" 
            onSearch={onSearch} 
            onChange={onChange}
            enterButton />
          </div>
        </div>
        
        <Table
          rowKey="id"
          dataSource={data}
          columns={columns}
        ></Table>
        <Modal
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            onFinish={modalFinish}
          >
            <Form.Item 
              label="Name" 
              name="name" 
              rules={[{ required: true }]}>
              <Input 
                type="text" 
                placeholder="student name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ 
                type: 'email', 
                message: 'email format invalid' }]}
            >
              <Input 
                type="email" 
                placeholder="email" />
            </Form.Item>

            <Form.Item 
              label="Area" 
              name="area" 
              rules={[{ required: true }]}>
              <Select>
                  <Select.Option value={'1'} key={'1'}>
                    1
                  </Select.Option>
                  <Select.Option value={'2'} key={'2'}>
                    2
                  </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label="Student Type" 
              name="type" 
              rules={[{ required: true }]}>
              <Select>
                <Select.Option value={1}>Tester</Select.Option>
                <Select.Option value={2}>Developer</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
                <Button 
                  id="formBtn" 
                  type="primary" 
                  htmlType="submit"
                >
                  登记新学生
                </Button>
              </Form.Item>
          </Form>
        </Modal>
      </AppLayout>
    );
}
