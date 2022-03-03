
import React, { Component,Fragment } from 'react'
import Head from "./Components/Head"
import LinkGroups from "./Components/LinkGroups"
import CenterContent from "./Components/CenterContent"
import ImageGroups from "./Components/ImageGroups"
import TalkWindow from "./Components/TalkWindow"

import { Layout } from 'antd';

import "./index.css"
const { Header, Footer, Sider, Content } = Layout;
type Props = {}

type State = {}

export default class IndexPage extends Component<Props, State> {
  state = {}

  render() {

    
    
    return (
      <div className="index-page" >
        {/* <Head /> */}
        <ImageGroups />
        {/* <CenterContent /> */}
        <div id="B-content"  >
          <CenterContent />
          <TalkWindow />
        </div>
      </div>

    )
  }
}
