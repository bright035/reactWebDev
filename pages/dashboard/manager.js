import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import React, {useState,useEffect} from 'react';
import {Select,Form,Input, Table, Button, Modal, message, Space, Typography} from 'antd';
import {
  PlusOutlined 
} from '@ant-design/icons';
import "antd/dist/antd.css";
import AppLayout from '../../lib/component/layout';
import {axiosGetStudentsByPageAndQuery,axiosPostStudents,axiosGetCountries} from '../../lib/service';
import _ from 'lodash';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const {Search} = Input;
const {Link} = Typography;

export default function Manager() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const [studentData, setStudentData] = useState([]);
    const [paginationConfig, setPagination] = useState({
                                          current: 1,
                                          pageSize: 10,
                                          total: 10
                                      });

    const [searchInput, setSearch] = useState("");
    
    const [version, setVersion] = useState("1.02");

    const [countries, setCountries] = useState(["China","Australia"]);
                                      
    const columns = [
      {
        title:'No.',
        key: 'index',
        render: (_1, _2, index) => index + 1,
      },
      {
        title:'Name',
        dataIndex: 'name',
        width: "15%",
        render: (name,student) => {
          return (
            <Link href={`./student/${student.id}`}>{name}</Link>
          )
        },
        sorter: (a,b) => (a.name.charCodeAt(0)-b.name.charCodeAt(0))
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
        render:(courses) =>
        courses.map((subItem) => subItem.name).join(", ") 
      },
      {
        title: 'Student type',
        dataIndex: 'type',
        width: "15%",
        filters:[
          { text: "tester",
            value: "tester"},
          { text: "developer",
            value: "developer"}
        ],
        onFilter: (value,record) => record.type.name==value,
        render: (type) => type?.name
        // render:(type)=>!!type&&type.hasOwnProperty('name')?type.name:""
      },
      {
        title: 'Join time',
        dataIndex: 'createdAt',
        render: (createdAt) => formatDistanceToNow(new Date(createdAt), {includeSeconds: true, addSuffix: true})
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: () => {
          return (
                <>
                <Space>
                  <Link>Add</Link>
                  <Link>Delete</Link>
                </Space>
                
                </>
              )
        }
      },
    ];

    useEffect(() => {
      axiosGetStudentsByPageAndQuery(searchInput,paginationConfig.current,paginationConfig.pageSize).then((res) => {
        const students = res.data.data.students;
        // console.log(res.data.data);
        setStudentData(students);
        setPagination({
          ...paginationConfig,
          total: res.data.data.total
        });
        // console.log(paginationConfig)
      }).catch(e => message.info(e.message));
    }, [paginationConfig.current, searchInput]);
    
    useEffect(() => {
      axiosGetCountries().then((res) => {
        const countryList = res.data.data.map((country) => {
          return country?.en
          // return !!country&&country.hasOwnProperty('en')? country.en:""
          });
        localStorage?.setItem('CountryList',JSON.stringify(countryList)); 
      }
      )
    }, [version]);

    const onChange1 = page => {
      setPagination({
        ...paginationConfig,
        current: page
      });
    };
    
    const onInputSearch = event => {
      setPagination(
        {
          ...paginationConfig,
          current: 1
        }
      );
      setSearch(event.target.value);
    };
    const onSearch = value => {
      setPagination(
        {
          ...paginationConfig,
          current: 1
        }
      );
      setSearch(value);
    };

    const showModal = () => {
      setCountries(JSON.parse(localStorage.getItem("CountryList")));
      setVisible(true);
    };

    const modalFinish = (value) => {
      axiosPostStudents(value.name,value.country,value.email,value.type).then((res) => {
          setVisible(false);
          message.info("New student created");
        }
      ).catch((e) => {
        setVisible(false);
        message.info(e.message);
      })
    };
    
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
              current: paginationConfig.current,
              pageSize: paginationConfig.pageSize,
              total: paginationConfig.total,
              responsive: true,
              showSizeChanger: false,
              onChange: (page) => onChange1(page)
            }
          }
          rowKey="id"
          dataSource={studentData}
          columns={columns}
        ></Table>
        <Modal
          destroyOnClose={true}
          closable={false}
          visible={visible}
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
                  {countries?.map((country,index) => (
                    <Select.Option value={country} key={index}>
                      {country}
                    </Select.Option>
                  ))}
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
