---
title: Go语言入门笔记
date: 2019-06-05 10:00:37
tags:
categories: Go
---

## 简介
之前几年一直在使用Python，后来一个偶然的机会让我对Go有了一些了解。诞生在本世纪的Go语言算是编程语言中的新青年了，相比C和Java，有着近似Python的简洁语句，相比Python，又有着编译型语言的速度。尤其是其为并发而生的特性极大地提升了计算能力。

## 基本规则

  ```go
  // test.go
  package main //作为可执行程序

  import "fmt"

  func main() { //主函数
      var mm = map[string]int{}
      mm["Python"] = 5
      delete(mm,"Python")
      fmt.Println(mm)

  }
  ```
<!--More-->

## 基本数据类型

### 声明变量

  ```go
  //普通赋值
  var num1 int = 1
  //平行赋值
  var num2,num3 int = 2,3
  //多行赋值
  var (num4 int=4
      num5 int =5
      unum6 uint64 = 65535
	)
  //简单赋值
  num7 := 7
  //打印变量
  fmt.Println(num1,num2,num3,num4,num5,unum6,num7)
  ```

### 常用类型

#### 整数

一共有10个，又分为两类，有符号int与无符号的uint，以及int8,int16,int32,int64,uint8等

  ```go
  var num1 int = 1
  var unum1 uint = 2
  ```
#### 浮点数

浮点数类型分为两个，即float32和float64.表达方法可以省掉不用的0，或者使用科学计数法


  ```go
	var float1 float32= 7.0
	var float2 float64= .032
	float3:= 3.7E-2
	float4:= 60
	fmt.Println(float1,float2,float3,float4)
  ```
#### 复数
复数同浮点数类似，分为complex32和complex64


  ```go
  var cplx = 3.7E+1 +5.98E-2i
  ```

#### Rune和Byte

Rune和byte属于别名类型，分别对应int32和uint8。rune可以表达一个Unicode字符


  ```go
  var char1 rune = '赞'
  char2:= '赞'
  ```
#### 字符串类型

一个字符串可以表达一个字符序列，表示方法如下。因为转义符"\"的存在，分为解释型表示法和原生表示法，其中原生表示法忽略转义符，所见即所得。

  ```go
  //解释型表示法
  var str1 string = "这是一条字符串\\"
  //原生表示法
  var str2 string = `这是一条字符串\\`
  fmt.Println(str1,str2)
  //输出结果
  这是一条字符串\ 这是一条字符串\\
  ```

## 高级数据类型

### 数组
    一个数组就是一个可以容纳多个相同类型元素的容器，这个容器的长度是固定的，在初始化中需要声明。


#### 初始化与类型声明

  ```go
  //声明长度
  var array1 = [3]int{}
  //初始化数组内容
  var array2 = [3]int{1,2,3}
  #不声明长度初始化
  var array3 = [...]int{1,3,5,6,9}
  ```
我们可以直接声明一个数组类型

  ```go
  type MyArray [5]int
  var array4 Myarray
  ```

#### 索引

索引方法与C和Python相同：

  ```go
  array4[0]  //array4第一个元素
  array4[1]  //array4第二个元素
  array4[2]  //array4第三个元素
  array[0] = 5
  ```

### 切片

切片与数组一样，也是可以容纳多个相同类型元素的容器。不同的是，无法通过切片类型来得知切片长度。

#### 初始化与类型声明

  ```go
  //类型声明
  type MyIntSlice []int
  type MyStrSlice []string

  //初始化与数组类似，但无需声明长度
  var slice1 = []int{1,2,3,5,7}

  //或者直接从数组取出
  var array3 = [...]int{1,3,5,6,9}
  var slice2 = array3[1:4] //返回[3,5,6]

  //声明空值
  var slice3 []int
  ```

#### 操作方法

  ```go
  //索引
  var slice4 = []int{1,3,5,7,9,13,2}
  slice5 = slice[1:4]  //[3,5,7]
  //添加append
  slice5 = append(slice4,1,2,1) //slice5 [3,5,7,1,2,1]
  //切片复制（地址复制）
  var a []int
  a = append(a,3,4,5)
  c := a
  c[0]=1
  fmt.Println(a,c)
  //值复制，copy函数
  var a []int
  a = append(a,3,4,5)
  c:=[]int{0}
  copy(a,c)
  fmt.Println(a,c) //[0 4 5] [0]
  b:=[]int{}
  copy(a,b)
  fmt.Println(a,b) //[0 4 5] []
  d:= []int{1,2,3,4}
  copy(a,d)
  fmt.Println(a,d)// [1 2 3] [1 2 3 4]
  ```

### 字典
字典（Dict）与Python类似，是哈希表的实现，用于键值存储的无序集合

声明变量

  ```go
  var dict = map[string]int{"Golang":1,"Python":0,"C":2}
  dict2 := map[string]int{}
  ```

添加

  ```go
  dict["Java"] = 5
  ```

索引

  ```go
  b := dict["Python"] //b = 0
  ```

删除

  ```go
  delete(dict,"Java")
  ```

注意当字典为空时或不存在该键值时，我们使用索引会返回nil,因此我们无法判断是该键值对应nil还是不存在该键值。这时我们可采用另一种写法

  ```go
  e,ok := dict["Lua"] // ok为False时表明不存在该键
  ```

### 通道
通道是Go中非常独特的数据结构，它的设计目的是为了在不同的goroutine中传递数据，并且是并发安全的。前面的数据类型都不是并发安全的，需要注意。

#### 初始化与赋值

与其他数据类型不同的是，我们无法通过var来赋值，而是采用内建函数make

    chStr := make(chan string,5)

其中第一个值是声明所存储数据类型，第二个值为声明长度,下面我们来将一个字符串传输到通道中

    chStr <- "Value1"

如果我们想接受字符串

    str_a := <- chStr

同字典相同，当我们检测通道状态及消除nil歧议，可采用

    str_b,ok := <- chStr

最后关闭通道

    close(chStr)

#### 缓冲与非缓冲通道

  ```go
  ch1 := make(chan string,2) //缓冲通道，可容纳两个值
  ch2 := make(chan string,0) //非缓冲通道
  ```
与缓冲通道不同的是，非缓冲通道在被发送数据后会立刻阻塞，直到数据被接收。同样，当缓冲通道接受数据长度大于缓冲区，也会阻塞



#### 单向与双向通道
一般来讲通道都是双向的，但是为了避免混淆我们可以将其声明为单向通道,声明方法如下

  ```go
  type Sender chan<- string
  type Receiver <-chan string

  var ch = make(chan string,3)
  var sender Sender = ch
  var recver Receiver = ch

  str := "hello"
  sender <- str
  str_recv := <-recver
  fmt.Println(str_recv)
  ```

## 进阶方法

### 结构体
学过C的话应该对结构体不陌生,在Go中，结构体更像Python的Class,它可以封装属性和操作（操作我们会在函数与方法中提到）

声明一个结构体, 一本书具有三个属性，名字，作者和页数

  ```go
  type Book struct{
      Name string
      Author string
      Pages int
  }
  ```

接下来创建一个实例

    book1 := Book{Name:"You Name it",Author:"Adam",Pages:541}

 如果书写顺序与声明顺序一致，可省略字段名称：如果有零值则不可省略

    book1 := Book{"You Name it","Adam",541}

### 函数

前面提到了各种数据类型，接下来是函数。在Go语言中，函数是一等类型，即和Python一样可以作为值来传递，同时Go的函数可以返回多个结果。

#### 函数声明及调用

我们下面来声明一个简单的函数

  ```go
  func add(num1 int,num2 int)(int){
      num3 := num1 + num2
      return num3
  }
  ```

函数声明的结构是 **func字段（形参1 类型， 形参2 类型）（输出类型）{函数语句}**
我们现在调用它

  ```go
  func main(){
      var num1,num2 int = 2,3
      num3:= add(num1,num2)
      fmt.Println(num3)
  }
  ```
#### 方法

除了作为函数使用，在面向对象编程中我们也可以将其作为方法封装，示例如下：

  ```go
  type Queue []int // 1. 定义一个类型
  func main() {

      var queue Queue //3. 创建Queue实例
      queue.Push(1)   //4. 调用Push方法
      fmt.Println(queue)

  }

  func (queue *Queue)Push(num int){ //2. 为类型Queue声明一个方法
      *queue = append(*queue,num)
  }
  ```
### 接口
在Go语言中，一个接口类型代表一系列行为的集合，声明过程如下:

  ```go
  type People interface{
      Grow()
      Say()
  }
  ```


我们先来看一个例子

  ```go
  package main
  import "fmt"
  //Human
  type Human struct{
      Age int
  }
  func (human *Human)Grow(){
      human.Age++
  }
  func (human Human)Say(){
      fmt.Println("Hello, I am a human")
  }
  //Animal
  type Animal struct{
      Age int
  }
  func (animal *Animal)Grow(){
      animal.Age++
  }
  //Robot
  type Robot struct{
  }
  func (robot Robot)Say(){
      fmt.Println("Hello, I am a robot")
  }
  //Define Interfaces
  type Talk interface{
      Say()
  }
  type AgeGrow interface{
      Grow()
  }
  ```

在这个例子中我们定义了三个类：Human,Animal, Robot, 其中Human,Animal具有年龄增长的方法Grow(),Human，Robot具有方法Say(),输出一个字符串。接下来我们分别把两个不同类型的Grow方法和Say方法放在AgeGrow和Talk接口里面，下面是调用的示例：

  ```go
  func main() {
      //1
      var talk Talk
      talk = new(Human)
      talk.Say()
      talk = new(Robot)
      talk.Say()
      //2
      var (human =Human{Age:21}
           animal =Animal{Age:8})
      fmt.Printf("The current age of human and animal are %d and %d\n",human.Age,animal.Age)
      AgeGrow.Grow(&human)
      AgeGrow.Grow(&animal)
      fmt.Printf("The current age of human and animal are %d and %d\n",human.Age,animal.Age)
  }
  ```
输出结果为

    Hello, I am a human
    Hello, I am a robot
    The current age of human and animal are 21 and 8
    The current age of human and animal are 22 and 9

#### **空接口**
空接口即为不包含任何方法声明的接口类型，用**interface{}**表示。也正因为空接口的定义，Go语言中包含预定义的任何数据类型都可以被看作是接口的实现

  ```go
  var everything [4]interface{}
  everything[0] = 1
  everything[1] = []int{1,2,3}
  everything[2] = "is a string"
  fmt.Println(everything)
  ```

输出结果

    [1 [1 2 3] is a string]

#### 断言

在类型字面量后面加一个**.(类型)**即可实现断言，作用类似于Python的isinstance

  ```go
  num,ok:=everything[0].(int)
  fmt.Println(num,ok)
  //返回结果
  1 true
  ```
第一行进行了两项操作，即将everything[0]的值1赋给num，并断言类型为int，断言结果返回给ok,为true

### 指针

#### 取址符与取值符

取址符为“&”，表示获取一个变量的内存地址。取值符为“\*”，表示获得该内存地址所储存的值。下面是一个简单的例子



  ```go
  var num int = 5
  ptr := &num
  fmt.Println(num,ptr,*ptr)
  num =6
  fmt.Println(num,ptr,*ptr)
  //返回结果
  //5 0xc000092000 5
  //6 0xc000092000 6
  ```
上面这段代码首先给变量num赋值5,然后创建变量ptr,值为num的内存地址0xc000092000。在println中我们同时也打印了*ptr的变量，得到的值为5，与num相同。之后我们再修改num为6,发现*ptr的值也变成了6.这是为什么呢？原因是我们的ptr储存了num的内存地址，*ptr取出来的值就是num的值。当num重新赋值时，内存地址没有改变，所以*ptr也相应变成了6。我们可以说ptr是指向num的指针。

#### 值拷贝与指针拷贝


  ```go
  var a int = 5
  b := a
  c:= &a
  a++
  fmt.Println(a,b,*c)
  ```

最后的返回结果是 6 5 6， a和c同时添加了1，而b没有。这是因为b变量是存储在另一个内存地址并被赋值a,我们称之为值拷贝，即将a的值复制给另一个变量b，相互独立。而c作为指针指向a,当a改变时，c也相应改变，我们称之为指针拷贝。


## 流程控制

### if条件语句
if语句根据条件表达式来决定执行分支语句,当a大于5时+1，否则-1

  ```go
  var a int = 5
  if a<10{
      a++
  }else{
      a--
  }
  ```

我们也可以省略else，因为如果a<10，不成立，通过else执行-1或者直接-1是一样的

  ```go
  if a<10{
      a++
  }
  a--
  ```
此外，它也支持串联：

  ```go
  if a<10{
      a++
  }else if a== 10{
      a = a + 2
  }else{
      a--
  }
  ```
表达式是自上而下的， 只有第一个满足的条件会被执行

### Switch
在选项变多的时候，使用if会比较繁琐，这时候我们可以使用switch:

  ```go
  var content string = "A"
  switch content{
  case "A":
  	fmt.Println("The letter is A")
  case "B":
  	fmt.Println("The letter is B")
        fallthrough
  case "C":
  	fmt.Println("The letter is C")

  default:
  	fmt.Println("Where is your letter")
  }
  ```
上面这段代码演示了几点：

- 当content为A或者C时，直接执行"The letter is A/C",然后跳出判断
- 在case B中，我们使用了fallthrough, 意味着执行完case "B"会进入到下一个case "C"中执行
- 当content不是A，B，C时，则执行default默认操作

### For循环

#### 基础用法

相比其他语言，Go中有一个更加广义灵活的for语句。for语句包含了一条for子句，字句可以包含初始化子句，条件子句和后置子句，如下：
  ```go
  var i,num int
  for i=1,i<100;i++{
      num++
  }
  ```
初始化子句和条件子句可以被省略：
  ```go
  //省略初始化子句
  var i,num int = 0,0
  for i<100,i++{
      num++
  }
  //省略后置子句
  for i:=0,i<100{
      i++
  }
  ```
由于Go语言没有While,想要实现while true这样的无限循环我们可以直接使用for:
  ```go
  i:=0
  for{
      i++
  }
  ```

#### range子句

对于字符串，切片，字典以及通道类型的值我们都可以使用range子句来迭代其中的每一个值。当使用range子句时，会返回两个值:
- string:返回index值 和 字符
- 切片: 返回index值 和切片元素
- 字典：返回key 和 value
- 注意这里通道只返回通道元素值


示例：

  ```go
  //切片
  ints :=[]int{1,2,3,4,5}
  for i,v := range ints{
      fmt.Println(i,v)
  }

  //字典
  var dict = map[string]int{"Golang":1,"Python":0,"C":2}
  for k,v := range dict{
      fmt.Println(k,v)
  }

  //通道
  for data := range ch{

  }
  ```

#### 注意

现在问题来了，当我们使用for时只使用一个变量，如下

  ```go
  //切片
  ints :=[]int{1,3，5，7，9}
  for v := range ints{
      fmt.Println(v)
  }
  ```

返回的结果时0 1 2 3 4，而不是1 3 5 7 9。这是因为返回的是index而并不是切片元素。如果需要返回元素就需要


    for i,v := range ints{

但是我们不使用i这个index,而go语法规定不允许未使用的变量存在，那我们怎么操作呢，我们前面出现过的"\_"可以解决这个问题，即占用一个位置但无法有效调用。

  ```go
  ints :=[]int{1,3，5，7，9}
  for _,v := range ints{
      fmt.Println(v)
  }
  ```
