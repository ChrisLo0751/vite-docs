package main

import (
	"fmt"
	"sync"
)

var total int
	var wg sync.WaitGroup

func Sum() {
	defer wg.Done()
    total += 1
}

func Sub() {
	defer wg.Done()
    total -= 1
}

func main() {
    for i := 0; i < 10000; i++ {
		wg.Add(2)
		go Sum()
    	go Sub()
	}

    wg.Wait()
    fmt.Printf("Total: %d", total)
}