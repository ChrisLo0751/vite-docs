package main

import (
	"fmt"
	"log"
	"net/rpc/jsonrpc"
)

type Args struct {
	A string
	B string
}

func main() {
	client, err := jsonrpc.Dial("tcp", "127.0.0.1:1234")
	if err != nil {
		log.Fatal("Dialing:", err)
	}
	defer client.Close()

	// 远程调用
	var reply string
	err = client.Call("Arith.Multiply", Args{"Hello", "world"}, &reply)
	if err != nil {
		log.Fatal("Arith error:", err)
	}

	fmt.Printf("Result: %s\n", reply)
}
