package main

import (
	_ "github.com/go-sql-driver/mysql"
)

// func linkMysql()(db *sql.DB) {
// 	dsn := "root:ywh@tcp(121.41.27.5:3306)/my_sql?charset=utf8"
// 	var err error
// 	//连接数据集
// 	db, err = sql.Open("mysql", dsn) //open不会检验用户名和密码
// 	if err != nil {
// 		fmt.Printf("dsn:%s invalid,err:%v\n", dsn, err)
// 	}
// 	return db
// }

// func insert_data(db *sql.DB,d ReceiveMessage) {
// 	var stmt *sql.Stmt
// 	var err error
// 	stmt, err = db.Prepare("insert into " +"communicate"+ " values(?,?)")
// 	if stmt == nil {
// 		fmt.Println("insert stmt is nil !!!!!!!!!!!!!!!!!!!!!")
// 		return
// 	}
// 	if err != nil {
// 		fmt.Println("insert stmt is nil !!!!!!!!!!!!!!!!!!!!!",err)
// 		return
// 	}

// 	_, err = stmt.Exec(
// 		d.Sentence,
// 		d.AvatarNum,
// 	)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// }

// func queryData(d *sql.DB)(data []SendMessage) {
// 	rows, err := d.Query("select * from communicate")
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	for rows.Next() {
// 		var sentence string
// 		var AvatarNum string
// 		err = rows.Scan(&sentence, &AvatarNum)
// 		if err != nil {
// 			fmt.Println(err)
// 		}
// 		data = append(data, SendMessage{sentence,AvatarNum})
// 	}
// 	return data
// }