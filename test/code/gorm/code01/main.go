package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const (
	// 数据库账号
	username = "root"
	// 数据库密码
	password = "root"
	// 数据库地址
	hsot = "localhost"
	// 数据库端口
	port = 3306
	// 数据库名称
	dbName = "test"
	// 超时时间
	timeout = "10s"
)

func main() {
	// 设置数据库连接信息
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local&timeout=%s", username, password, hsot, port, dbName, timeout)
	fmt.Println(dsn)
	// 连接到数据库
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("连接数据库失败:", err)
		return
	}

	fmt.Println("数据库连接成功:", db)
}
