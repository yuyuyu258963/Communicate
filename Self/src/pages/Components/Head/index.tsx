import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;
import 'antd/dist/antd.css';
import "./index.css";

type Props = {}

type State = {}

export default class Head extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="Head-content" >
        <span id="Head-title">个人博客</span>
        &nbsp;&nbsp;
      </div>
    )
  }
}