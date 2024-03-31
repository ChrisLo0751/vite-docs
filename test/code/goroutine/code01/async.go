package main

import (
	"fmt"
	"sync"
	"time"
)

func main () {
    var wg sync.WaitGroup
    startTime := time.Now()

    for i := 0; i < 1000000; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Println(n)
        }(i)
    }

    wg.Wait()
    elapsedTime := time.Since(startTime)
	fmt.Println("Total time:", elapsedTime)
}