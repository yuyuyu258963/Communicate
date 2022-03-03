package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var DB *sql.DB

func init() {
	DB = linkMysql()
}

// type WebSocketConnect *websocket.Conn
type WbConnect struct {
	connect *websocket.Conn
	SelfAvatarNum string
}
type WbConnects []WbConnect

var connections WbConnects

func (c *WbConnects) index(i WbConnect )(id int) {
	for index, elem := range *c {
		if elem.connect == i.connect {
			return index
		}
	}
	return -1
}

type ReceiveMessage struct {
	State string `json:"state"`
	Sentence string `json:"sentence"`
	AvatarNum string `json:"AvatarNum"`
}

type SendMessage struct {
	Message string `json:"words"`
	AvatarNum string `json:"AvatarNum"`
}

func linkMysql()(db *sql.DB) {
	dsn := "root:ywh@tcp(121.41.27.5:3306)/my_sql?charset=utf8"
	var err error
	//连接数据集
	db, err = sql.Open("mysql", dsn) //open不会检验用户名和密码
	if err != nil {
		fmt.Printf("dsn:%s invalid,err:%v\n", dsn, err)
	}
	return db
}

func insert_data(db *sql.DB,d ReceiveMessage) {
	var stmt *sql.Stmt
	var err error
	stmt, err = db.Prepare("insert into " +"communicate"+ " values(?,?)")
	if stmt == nil {
		fmt.Println("insert stmt is nil !!!!!!!!!!!!!!!!!!!!!")
		return
	}
	if err != nil {
		fmt.Println("insert stmt is nil !!!!!!!!!!!!!!!!!!!!!",err)
		return
	}

	_, err = stmt.Exec(
		d.Sentence,
		d.AvatarNum,
	)
	if err != nil {
		fmt.Println(err)
	}
}

func queryData(d *sql.DB)(data []SendMessage) {
	rows, err := d.Query("select * from communicate")
	if err != nil {
		fmt.Println(err)
	}
	for rows.Next() {
		var sentence string
		var AvatarNum string
		err = rows.Scan(&sentence, &AvatarNum)
		if err != nil {
			fmt.Println(err)
		}
		data = append(data, SendMessage{sentence,AvatarNum})
	}
	return data
}

//设置websocket
//CheckOrigin防止跨站点的请求伪造
var upGrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

//websocket实现
func ping(c *gin.Context) {
	//升级get请求为webSocket协议
	ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	if connections.index(WbConnect{ws,"0"}) != -1{
		fmt.Println("重复连接")
		return
	}
	connections = append(connections, WbConnect{ws,"0"})
	defer ws.Close() //返回前关闭

	fmt.Println(len(connections))
	
	for {
		//读取ws中的数据
		var data *ReceiveMessage
		err := ws.ReadJSON(&data)
		if err != nil {
			fmt.Println("我断开连接", err)
			break
		}
		fmt.Println(data)
		if data.State == "start" {
			connections[len(connections)-1].SelfAvatarNum = data.Sentence
			continue
		}
		if data != nil {
			insert_data(DB, *data)
		}
		// fmt.Println(connections)
		//写入ws数据
		for index, elemContent := range connections {
			conn,_ := elemContent.connect,elemContent.SelfAvatarNum
			// 如不是启动的话，就视作消息
			if data.State != "start" && data.State != "close"  {
				err = conn.WriteJSON(SendMessage{data.Sentence,data.AvatarNum})
				if err != nil {
					connections = append(connections[:index], connections[index+1:]...)
					fmt.Println("发送数据失败",err)
					continue
				}
			}
		}
		fmt.Println(len(connections))
	}
	fmt.Println("所有的都断开连接了")
}
func getInitData(c *gin.Context) {
	data := queryData(DB)
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(200, gin.H{
		"message": "init",
		"data": data,
	})
}
func geDefaltPage(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}


func main() {
	r := gin.Default()
	r.LoadHTMLFiles("./static/index.html")
	r.StaticFile("/umi.js","./static/umi.js")
	r.StaticFile("/umi.css","./static/umi.css")

	// r.Static("./static", "")
	r.GET("/ping", ping)
	r.GET("/init", getInitData)
	r.GET("/", geDefaltPage)
	r.Run(":12345")
}