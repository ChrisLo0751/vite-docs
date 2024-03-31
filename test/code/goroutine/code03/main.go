package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func worker(id int) {
	defer wg.Done() // 在函数退出时减少计数器值
	fmt.Printf("Worker %d starting\n", id)
	time.Sleep(time.Second) // 模拟耗时操作
}

func main() {
	for i := 1; i <= 5; i++ {
		wg.Add(1) // 每启动一个goroutine，增加计数器值
		go worker(i)
	}

	wg.Wait() // 等待所有goroutine完成
	fmt.Println("All workers done")
}