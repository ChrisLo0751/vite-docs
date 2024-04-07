package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func consumer(ch chan int) {
	defer wg.Done()
	data := <-ch
	fmt.Println("consumer: ", data)
}

func main() {
	var ch1 = make(chan int, 1)

	ch1 <- 1

	wg.Add(1)
	go consumer(ch1)
	wg.Wait()

	fmt.Println("Hello channel")
}

// 在主协程中，channel ch1 是一个无缓冲的channel，所以在第 10 行代码中，向 ch1 中写入数据会阻塞，导致主协程无法继续执行，从而导致 panic。
