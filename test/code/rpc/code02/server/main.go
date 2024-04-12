package main

import (
	"fmt"
	"log"
	"net"
	"net/rpc"
	"net/rpc/jsonrpc"
)

// 参数
type Args struct {
	A string
	B string
}

type Arith struct{}

func (t *Arith) Multiply(args *Args, reply *string) error {
	*reply = args.A + args.B
	return nil
}

func main() {
	arith := new(Arith)
	rpc.Register(arith)

	listener, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal("Listen error:", err)
	}
	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting:", err)
			continue
		}
		go jsonrpc.ServeConn(conn)
	}
}
