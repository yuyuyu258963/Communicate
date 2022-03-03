import { Avatar, Button, Input, message } from 'antd';
import React, { Component, Fragment } from 'react'
import { EnterOutlined,AudioOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'
import $ from 'jquery'
import "./index.css";
import axios from 'axios';

type Props = {}

type State = {
  sentences: {
    words: string,
    AvatarNum: string | number,
  }[],
  SelfAvatarNum:string | number,
}
// var SelfAvatarNum = String(Math.floor(Math.random() * 1000)) ;
var socket : WebSocket

function handelLiu(params:Function) {
  let ticker
  clearTimeout(ticker)
  ticker = setTimeout(() => {
    params()
  },300)
}

export default class TalkWindow extends Component<Props, State> {
  state = {
    sentences:[
      {
        words:"你好啊兄弟",
        AvatarNum: "0",
      },{
        words:"nice to meet you",
        AvatarNum: "2",
      },{
        words:"where are you from?",
        AvatarNum: "2",
      },
    ],
    SelfAvatarNum:"-1"
  }
  InputSentence!: Input | null;
  
  handelSendInformation = ()=>{
    const {value:newSentence} = (this.InputSentence as Input).state;
    const {SelfAvatarNum} = this.state;
    if(newSentence === ""){
      message.warn("请输入内容")
      return
    };
    socket.send(JSON.stringify({state:"communicate",sentence:newSentence,AvatarNum:SelfAvatarNum}));
    (this.InputSentence as Input).setValue("")
  }
  componentDidMount() {
    var SelfAvatarNum = String(Math.floor(Math.random() * 1000)) ;
    this.setState({SelfAvatarNum})
    // const SelfAvatarNum = Math.floor(Math.random() * 1000) ;
    socket = new WebSocket('ws://121.41.27.5:12345/ping');

    // Connection opened
    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify({state:"start",sentence:String(SelfAvatarNum)}));
    });

    socket.addEventListener('close', function (event) {
      // socket.send(JSON.stringify({state:"stop",sentence:String(SelfAvatarNum)}));
      console.dir("error websocket 连接失败")
    })

    // Listen for messages
    socket.addEventListener('message',  (event) =>{
      const {words,AvatarNum} = JSON.parse(event.data);
      this.setState({sentences:[...this.state.sentences,{words,AvatarNum}]},()=>{
        (this.InputSentence as Input).setValue("")
      })
      function d() { $('#TalkWindow-main').animate({ scrollTop: (document.querySelector('#TalkWindow-main') as HTMLElement).scrollHeight}, 1000); return false; };
      d()
    });

    axios({
      method: 'get',
      url: 'http://121.41.27.5:12345/init',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      const {data:sentences} = response.data;
      this.setState({sentences})
    });

    PubSub.subscribe("changeUser",(msg,uerName) => {
      SelfAvatarNum = uerName
      message.success("用户切换成功")
      this.setState({SelfAvatarNum:uerName})
    })
  }

  render() {
    const {sentences,SelfAvatarNum} = this.state ;

    return (
      <div
        className="TalkWindow"
          >
        <div id="TalkWindow-main" className="Talk-main">
          {
            sentences.map((t,index)=>{
              return <div key={index} 
                        style={{
                          marginBottom:"5px",
                          textAlign:t.AvatarNum === SelfAvatarNum ? "right" : "left"
                      }} >
                {t.AvatarNum === SelfAvatarNum ? 
                  <span 
                  className="Talk-Communicate-right"
                  >{t.words}</span> : 
                  ""}
                <Avatar
                  draggable={true}
                  style={{border: "1px solid #ccc"}}
                  src={"https://joeschmoe.io/api/v1/" + t.AvatarNum} />
                {t.AvatarNum !== SelfAvatarNum ? 
                <span 
                  className="Talk-Communicate-left"
                  >{t.words}</span> : ""}
                </div>
            })
          }
        </div>

        <div style={{width:"85%",margin:"0 auto",marginLeft:"10%"}}>
          <Input 
            className="Sentence-Input"
            style={{width:"60%",marginBottom:"10px",borderRadius:"5px"}} 
            placeholder="请输入您的内容"
            ref={(a)=>{this.InputSentence = a}}
            allowClear={true}
            prefix={<AudioOutlined />}
            onPressEnter={(e)=>{
              this.handelSendInformation()
            }}
          ></Input>
          &nbsp;
          <Button
            type="primary"
            style={{width:"35%"}}
            icon={<EnterOutlined />}
            onClick={()=>{
              this.handelSendInformation()
            }}
            >发送</Button>
        </div>
      </div>
    )
  }
}