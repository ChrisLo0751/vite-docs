package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func consumer(ch chan int) {
	defer wg.Done()
	for {
		data, ok := <-ch
		if !ok {
			break
		}
		fmt.Println(data)
		time.Sleep(2 * time.Second)
	}
}

func main() {
	var ch1 = make(chan int, 1)

	ch1 <- 1
	close(ch1)

	wg.Add(1)

	go consumer(ch1)

	wg.Wait()
}
