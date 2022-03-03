import React, { Component } from 'react'
import { Carousel,Image,Modal,Tooltip } from 'antd';

import { CustomerServiceTwoTone,ExclamationCircleOutlined,CustomerServiceFilled } from '@ant-design/icons';
import "./index.css"
import { Button } from 'antd/lib/radio';

type Props = {}

type State = {}

const IMAGESSRC = [
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.yuntu.cn%2Fd%2Ffile%2F1906%2F74dcf29899868775f521b6518ec4145a.jpg&refer=http%3A%2F%2Fwww.yuntu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648782201&t=c298bfe331c757c5d5800d5192521f4a",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.yuntu.cn%2Fd%2Ffile%2F1906%2F2fca89181ca55263846be461c0b949ec.jpg&refer=http%3A%2F%2Fwww.yuntu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648782201&t=4596649e57833de6385a634c91f565a9",
  "https://img1.baidu.com/it/u=3507166857,246956260&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
  "https://img1.baidu.com/it/u=2702611587,2162384966&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
]


const contentStyle = {
  height: '160px',
  color: 'black',
  lineHeight: '160px',
  textAlign: 'center',
  // background: '#ccc',
};

export default class ImageGroups extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div id="Head"  >
        <div  style={{display: 'inline-block',float: 'left',width:"70%",height:"100%"}}>
          <br/><br/><br/>
          <span id="Head-title">个人博客
          </span>
          &nbsp;&nbsp;
          <Tooltip title="播放音乐" color={"green"} >
            <CustomerServiceTwoTone 
              className="Music-icon"
              twoToneColor="#52c41a"
              style={{scale:2,width:"50px"}}
              onClick={() =>{

                Modal.confirm({
                  title: '选择播放音乐',
                  icon: <CustomerServiceFilled  />,
                  content: <audio
                            controls
                            src=""
                            >
                              <source src="/src/pages/Components/ImageGroups/Luvea - 生日快乐.mp3" type="audio/mpeg"></source>
                            </audio>,
                  
                  okText: '确认',
                  cancelText: '取消',
                });
              }}
            />
          </Tooltip>
        </div>
        <Carousel 
          autoplay
          style={{width:"25%",height:"150px",right:"0px",display: 'block',float: 'right'}}
        >
        {
          IMAGESSRC && IMAGESSRC.map((item,index) => {
            return <div key={index}>
            <Image className="img-head" src={item} style={{width:"100%",height:"150px"}} ></Image>
          </div>
          })
        }
      </Carousel>
      </div>
    )
  }
}