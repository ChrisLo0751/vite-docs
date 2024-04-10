欢迎您阅读本篇文章，本文将为您介绍 Go 语言的高并发编程，面试必问的哦。

## 认识协程

在 Go 语言中，协程（Coroutine）指的是一种轻量级的线程，也称为 goroutine。协程可以看作是一种并发执行的单元，它由 Go 语言的运行时环境（runtime）管理，而不是由操作系统管理。下面是关于 Go 协程的一些重要概念和特点：

1. **轻量级**：与传统的线程相比，协程的创建和销毁成本非常低，因此可以轻松创建大量的协程而不会消耗太多系统资源。
2. **并发性**：Go 协程可以在单个线程上并发执行，因此能够有效利用多核处理器的性能，实现并发编程。
3. **协作式调度**：Go 语言的运行时环境使用了一种称为"协作式调度"的策略，即协程之间相互配合，在特定的时机主动让出执行权，让其他协程有机会执行。这种调度方式避免了传统线程中的抢占式调度，减少了上下文切换的开销。
4. **通道通信**：协程之间通过通道（Channel）进行通信，通道是一种并发安全的数据结构，能够在不同协程之间传递数据，实现协程间的同步与通信。
5. **简洁的语法**：Go 语言提供了简洁的语法来创建和管理协程，例如使用关键字`go`加上函数调用就可以创建一个新的协程。

话不多说，我们直接来使用，如下所示，通过 go 关键字，我们就可以轻松的启动 Go 的协程，也就是 Goroutine。

```go
package main

import (
	"fmt"
	"time"
)

func sayHello() {
	fmt.Println("Hello from goroutine!")
}

func main() {
	// 创建一个新的协程
	go sayHello()

	// 主线程继续执行
	fmt.Println("Main thread continues...")

	// 等待一段时间，以便观察协程执行
	time.Sleep(time.Second)
}
```

## 认识 WaitGroup

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int) {
	fmt.Printf("Worker %d starting\n", id)
	time.Sleep(time.Second) // 模拟耗时操作
}

func main() {
	for i := 1; i <= 5; i++ {
		go worker(i)
	}

	fmt.Println("All workers done")
}
```

输出结果：

```sh
Worker 4 starting
Worker 1 starting
Worker 2 starting
All workers done
```

从输出结果，可以看到，只有三个 goroutine 的打印了信息，说明主程序在 goroutine 没有全部执行完就退出了。

那么保证全部 goroutine 执行完，才会结束主进程？

这里，就需要使用到了，go 提供的同步原语`sync.WaitGroup`

`sync.WaitGroup`包含三个主要方法：

1. `Add(delta int)`：向计数器添加或减去给定的整数值，通常用于指定需要等待的 goroutine 数量。
2. `Done()`：减少计数器的值，表示一个 goroutine 已经完成了其任务。
3. `Wait()`：阻塞主线程或调用者，直到计数器的值减少到零，即所有添加的 goroutine 都已完成。

话不多说，立即修改刚刚的代码

```go
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
```

输出结果：

```
Worker 5 starting
Worker 1 starting
Worker 4 starting
Worker 2 starting
Worker 3 starting
All workers done
```

到目前位置，我们已经掌握了 goroutine 以及 waitGroup 的使用，接下来我们来玩个大，直接启动一百万个协程来试试它的威力！

运行以下代码时，你会发现，此时 CPU 的占用率会急速暴涨（注意哦，你的电脑可能会出现卡顿

```go
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
```

输出结果：

```sh
Total time: 2m34.1300276s // 娱乐效果！注意，时间的多少，很大程度取决于机器的配置
```

## 互斥锁

锁是并发编程中很重要的概念。下面我们以一个实际的例子来进行体现

```go
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
```

实际输出结果：

```sh
$ go run lock.go
Total: 19
$ go run lock.go
Total: 117
$ go run lock.go
Total: -12
$ go run lock.go
Total: 0
```

在多次执行的情况下，打印出来的值各不相同，这是为什么呢？

在理想情况下，确实每次执行完 `Sum()` 和 `Sub()` 后 `total` 应该都会变为 0。然而，问题出现在并发情况下可能导致的竞态条件。

竞态条件指的是多个 goroutine 同时访问共享资源，而且对资源的访问顺序不确定，从而导致程序的行为出现问题。在你的代码中，`total` 变量被多个 goroutine 并发地修改，而没有使用同步机制来保护这个共享变量，这就产生了竞态条件。

具体来说，当多个 goroutine 同时执行 `Sum()` 和 `Sub()` 时，可能会出现以下情况：

1. 两个 goroutine 同时读取 `total` 的值。
2. 其中一个 goroutine 执行完 `total += 1` 或 `total -= 1`，但还没有更新 `total` 的值。
3. 另一个 goroutine 也执行完 `total += 1` 或 `total -= 1`，并更新了 `total` 的值。
4. 第一个 goroutine 最终更新 `total` 的值，但这个值已经被第二个 goroutine 修改过了，导致最终的结果不是预期的 0。

为了解决这个问题，需要使用互斥锁（Mutex）或其他同步机制来保护 `total` 变量的读写操作，确保每次对 `total` 的修改都是原子的，不会被其他 goroutine 打断。这样才能保证最终的结果是正确的。

## 读写锁

接下来我们来聊聊关于 Go 语言的读写锁。

在常规的 Web 系统中，通常来说，读会比写更加频繁，以电商活动举例，假设在双十一，同时有一百万个人在读取商品的数据，这个时候我们需要锁吗？

实际上是不需要的，读取商品数据时，每个用户之间是没有关联关系的，所以我们可以尽情的读取数据（通过并发的方式。

但是，在活动期间，商品的数据极有可能的发生变更。可能商家需要修改商品的价格或者 SKU(规格)

此时，会发生一个情况，那就是，用户下单一件商品时，假设价格是一百元，但是支付时，价格被修改为九十九元，一般支付在后端，都会校验一次价格，此时就会发生校验失败，订单支付失败，用户体验非常的差。

当数据发生变更时，所有读取商品数据的用户，都会被锁住，直到数据变更完成，用户才可以继续读取数据，这个时候，就需要用到我们的读写锁。

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var rwLock sync.RWMutex
var wg sync.WaitGroup

func read() {
	defer wg.Done()
	rwLock.RLock()
	fmt.Println("Satrt: Reading")
	time.Sleep(time.Second)
	fmt.Println("Readed: ", "Some data")
	rwLock.RUnlock()
}

func write() {
	defer wg.Done()
	rwLock.Lock()
	fmt.Println("Satrt: Writing")
	time.Sleep(time.Second * 10)
	fmt.Println("Wrote: ", "New data")
	rwLock.Unlock()
}

func main() {
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go read()
	}

	for i := 0; i < 1; i++ {
		wg.Add(1)
		go write()
	}

	wg.Wait()
}
```
