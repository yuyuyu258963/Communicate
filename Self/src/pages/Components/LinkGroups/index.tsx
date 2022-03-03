import { Menu } from 'antd'
import React, { Component } from 'react'

type Props = {}

type State = {}

export default class LinkGroups extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
    )
  }
}