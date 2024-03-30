package main

import (
	"fmt"
	"runtime"
)

// goroutines是并行还是并发？

var quit = make(chan int)

func loop() {
	for i:=0; i< 100; i++	 {
		runtime.Gosched()
		fmt.Println(i)
	}

	quit <- 0
}

func main() {
	runtime.GOMAXPROCS(2)
	go loop()
	go loop()

	for i:=0; i<2; i++ {
		<-quit
	}
}