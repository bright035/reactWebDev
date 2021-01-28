import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Select,Form,Input, Table, Button, Modal, message, Space} from 'antd';
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
import "antd/dist/antd.css";
import AppLayout from '../lib/component/layout';
import {axiosGetStudentsByPageAndQuery,axiosPostStudents} from '../lib/service';
import {useRouter} from 'next/router';
import _, {debounce} from 'lodash';

const { Search } = Input;


export default function Manager() {
    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
                                          current: 1,
                                          pageSize: 10,
                                          total: 10
                                      });
    const [search, setSearch] = useState("");
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
            dataIndex: 'country',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title:'Selected Curriculum',
            dataIndex:'courses',
            render:(courses)=>
            courses.map((subItem)=> subItem.name).toString()  
          },
          {
            title: 'Student type',
            dataIndex: 'type',
            render:(type)=>type.name
            
          },
          {
            title: 'Join time',
            dataIndex: 'createdAt',
          },
          {
            title: 'Action',
            dataIndex: 'action',
          },
    ];

    useEffect(() => {
      axiosGetStudentsByPageAndQuery(search,pagination.current,pagination.pageSize).then((res) => {
        const students = res.data.data.students;
        // console.log(res.data.data);
        setData(students);
        setPagination({
          ...pagination,
          total: res.data.data.total
        });
        // console.log(pagination)
      }).catch(e => message.info(e.message));
    }, [pagination.current, search])
    
    

    const onChange1 = page => {
      setPagination({
        ...pagination,
        current: page
      });
    };
    
    const onInputSearch = event => {
      setSearch(event.target.value)
      setPagination(
        {
          ...pagination,
          current: 1
        }
      )
    };
    const onSearch = value => {
      setSearch(value)
      setPagination(
        {
          ...pagination,
          current: 1
        }
      )
    };

    const showModal = () => {
      setVisible(true);
    };

    const modalFinish=(value) => {
      axiosPostStudents(value.name,value.country,value.email,value.type).then((res) => {
          setVisible(false);
          message.info("New student created");
        }
      ).catch((e) => {
        setVisible(false);
        message.info(e.message);
      })
    };
    const router= useRouter();
    
    return (
      <AppLayout>
        <p>breadCrumble</p>
      
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
            onChange={_.debounce(onInputSearch,1000)}
            enterButton />
          </div>
        </div>
        
        <Table
          pagination={
            {
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              responsive: true,
              showSizeChanger: false,
              onChange: (page) => onChange1(page)
            }
          }
          rowKey="id"
          dataSource={data}
          columns={columns}
        ></Table>
        <Modal
          destroyOnClose={true}
          closable={false}
          visible={visible}
          confirmLoading={confirmLoading}
          footer={null}
        >
          <div>
            <p>Add Student</p>
          </div>
          <div>
            <Form
            form={form}
            onFinish={modalFinish}
            labelCol={{span: 6, offset: 0}}
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
                message: 'email format invalid' 
              },
              {
                required: true 
              }]}
            >
              <Input 
                type="email" 
                placeholder="email" />
            </Form.Item>

            <Form.Item 
              label="Country" 
              name="country" 
              rules={[{ required: true }]}>
              <Select>
                  <Select.Option value={'1'} key={'1'}>
                    China
                  </Select.Option>
                  <Select.Option value={'2'} key={'2'}>
                    Japan
                  </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label="Student Type" 
              name="type" 
              rules={[{required:true}]}>
              <Select>
                <Select.Option value={1}>Tester</Select.Option>
                <Select.Option value={2}>Developer</Select.Option>
              </Select>
            </Form.Item>
            <Space>
               <Button 
                  type="primary" 
                  htmlType="submit"
               >
                  登记新学生
               </Button>
               <Button 
                  type="primary" 
                  onClick={() => {setVisible(false)}}
               >
                Cancel
               </Button>
            </Space>
          </Form>
          </div>
          </Modal>
      </AppLayout>
    );
}
