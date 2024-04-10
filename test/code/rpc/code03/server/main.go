package main

import (
	"log"
	"net"
	"net/http"
	"net/rpc"
)

// 参数
type Args struct {
	A string
	B string
}

type Arith struct{}

// 定义服务
func (t *Arith) Multiply(args *Args, reply *string) error {
	*reply = args.A + args.B
	return nil
}

func main() {
	// 注册服务
	arith := new(Arith)
	rpc.Register(arith)

	// 使用 HTTP 协议
	rpc.HandleHTTP()

	// 启动服务
	listener, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal("Listen error:", err)
	}

	if err := http.Serve(listener, nil); err != nil {
		log.Fatal("Error serving:", err)
	}
}
