import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ExportOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css"


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function Student() {
  let [collapsed, setCollapsed] = useState(false)
  let [subCollapsed, setSubcollapsed] = useState(false)
  const menu = (
    <Menu>
      <Menu.Item>
        <a  href="/login">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const toggleCollapsed = () => {
    setSubcollapsed(!subCollapsed)
  };

    return (
      <Layout style={{minHeight:"100vh"}}>
        <Sider id="siderTrigger" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >CMS</div>
          <Menu 
            defaultSelectedKeys={['1']}
            //defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            collapsed={""+subCollapsed} 
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Overview
            </Menu.Item>
            <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="Student">
              <Menu.Item key="2">
                Student List
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Teacher
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div className="trigger1" onClick={toggle}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <ExportOutlined />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
}


