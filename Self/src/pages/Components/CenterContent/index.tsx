import React, { Component } from 'react'
import { Button, Card, Input, message } from 'antd';
import PubSub from 'pubsub-js'
import "./index.css"

type Props = {}

type State = {
  year:number,
  month:number,
  day:number,
  week:string,
}

export default class CenterContent extends Component<Props, State> {
  state = {
    year:2022,
    month:3,
    day:0,
    week:"",
  }
  InputName: Input | null | undefined;

  getData = () => { 
    var myDate = new Date();
    const year =  myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    const month =  myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    const day =  myDate.getDate();        //获取当前日(1-31)
    const weekSeed = myDate.getDay();
    var week:string
      // myDate.getDay();
    //获取时间
    switch (weekSeed) {
        case 1: week = "星期一 "; break;
        case 2: week = "星期二 "; break;
        case 3: week = "星期三 "; break;
        case 4: week = "星期四 "; break;
        case 5: week = "星期五 "; break;
        case 6: week = "星期六 "; break;
        case 0: week = "星期日 "; break;
        default: week = ""; break;
    }
    // console.log(year);
    // console.log(month);
    // console.log(day);
    // console.log(week);
    this.setState({year,month,day,week});
  }
  componentDidMount() {
    this.getData()
  }

  render() {
    const {year,month,day,week} = this.state;
    return (
        <Card className="CenterContent-info" style={{width:"98%",margin:"10px 10px",height:"120px"}}>
          <span id="Time-id" style={{fontSize:"22px",top:"50px"}}>Time</span>
          &nbsp;&nbsp;
          <span style={{fontSize:"20px",color:"green"}}>
            {year}
          </span>&nbsp;年&nbsp;
          <span style={{fontSize:"20px",color:"green"}}>
            {month}
          </span>&nbsp;月&nbsp;
          <span style={{fontSize:"20px",color:"green"}}>
            {day}
          </span>&nbsp;日&nbsp;&nbsp;
          <span style={{fontSize:"18px",color:"#aaa"}}>
            {week}
          </span>
          <div style={{marginTop:"10px"}}>
            <label htmlFor="#das" >用户名:</label>
            <Input id="das" style={{width:"55%"}} ref={(a)=>{this.InputName = a}} allowClear={true} ></Input>
            <Button onClick={()=>{
              const {value:UserName} = (this.InputName as Input).state;
              if (UserName === "") {
                message.warn("Please Input Name")
                return
              }
              PubSub.publish("changeUser",UserName);
            }} >确认</Button>
          </div>
        </Card>
    )
  }
}