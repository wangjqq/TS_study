let isHandsome: boolean = true //布尔型

let age: number = 18 //数字型

let niceName: string = 'jq' //字符串型
let fullName: string = `w ${niceName}` //支持模板字符串

let u: undefined = undefined //undefined类型
let n: null = null //null类型

age = null //默认情况下null和undefined是所有类型的子类型
niceName = undefined //但是如果指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自，不然会报错。

let notSure: any = 4 //不清楚用什么类型,可以使用any类型

function divide(params: unknown) {
  return (params as number) / 2 //使用any不会报错 使用unknown会报错 使用类型断言as解决问题
}

function welcome(): void {
  console.log('hello')
} //void表示没有任何类型,如函数没有明确返回值,默认返回void类型

function fn(msg: string): never {
  throw new Error(msg)
} //never类型表示永不存在的值的类型 例如:一个函数执行时抛出了异常,那么函数永远不存在返回值,因为抛出异常会直接中断程序运行
// 没有类型可以赋值给never,never可以赋值给任何类型

let list: number[] = [1, 2, 3] //数组里的项写错类型会报错
list.push(4) //push时类型对不上也会报错
console.log(list)

let tuple: [number, string] = [21, 'wang'] //元组类型允许表示一个已知元素数量和类型的数组,各元素的类型不必相同,写错类型会报错,越界会报错

tuple.push(1) //但是可以push,push不会越界报错,但是类型要合规

function add(x: number, y: number): number {
  return x + y
} //函数类型需要定义输入参数类型和输出类型,输出类型可以忽略
// 函数没有明确返回值,默认返回void类型
add(1, 2)

let add2 = (x: number, y: number): number => {
  return x + y
} //箭头函数的写法

function add3(x: number, y: number, z?: number): number {
  return x + y
} //参数后加个问号,代表这个参数是可选的,可选参数要放在形参的最后面

function add4(x: number = 100, y: number): number {
  return x + y
} //默认参数可以不放在形参的最后面
console.log(add4(undefined, 100)) //但是如果不在最后面,前面的参数要用undefined占位

function add5(x: number[]): number
function add5(x: string[]): string
function add5(x: any): any {
  if (typeof x[0] === 'string') {
    return x.join()
  }
  if (typeof x[0] === 'number') {
    return x.reduce((acc, cur) => acc + cur)
  }
} //函数重载,需要多次声明这个函数,先定义后实现

interface Person1 {
  name: string
  age: number
  gender?: string //加上?代表可选的
  readonly id: number //加上readonly代表只读,不可改变
} //接口 可以对对象的内容类型进行描述

const p2: Person1 = {
  name: 'wang',
  age: 21,
  id: 1,
} //少写错写属性报错

interface ISum {
  (x: number, y: number): number
} //interface可以用来描述函数类型

const add6: ISum = (num1, num2) => {
  return num1 + num2
}

interface RandomKey {
  [propName: string]: string
} //一个对象上有多个不确定数量的属性,这样写

const obj: RandomKey = {
  a: 'hello',
  b: 'wang',
  c: 'welcome',
}

interface LikeArray {
  [propName: number]: string
} //如果把属性定义为number类型,就是一个类数组了,看上去和数组一模一样

const arr: LikeArray = ['hello', 'wang']
arr[0] //可以用下标访问值,但是这不是真正的数组,数组的方法它是没有的

class Person {
  public name: string //  public 公有的,一个类里默认所有方法和属性都是public 可写可不写
  // private,私有的,只属于这个类自己,它的实例和继承它的子类都访问不到
  // protected 受保护的,继承它的子类可以访问,实例不能访问
  // static 是静态属性,是类上的一些常量,实例不能访问
  constructor(name: string) {
    this.name = name
  }
  speak() {
    console.log(`${this.name} is speaking`)
  }
} //定义了一个Person类,有属性name和方法speak

const p1 = new Person('wang') //新建实例

p1.name //访问属性和方法
p1.speak()

class Student extends Person {
  grade: number //子类有自己的属性,要用super把父类的属性继承过来
  constructor(name: string, grade: number) {
    super(name)
    this.grade = grade
  }
  study() {
    console.log(`${this.name} needs study`)
  }
  speak() {
    return `Student ${super.speak()}`
  } //子类对父类方法进行重写
}

const s1 = new Student('wangjingqi', 21)

s1.study()

s1.speak()

abstract class Animal {
  constructor(name: string) {
    this.name = name
  }
  public name: string
  public abstract sayHi(): void
} //抽象类,不能被实例化

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  public sayHi() {
    console.log('wang')
  } //继承自抽象类,必须实现抽象类的抽象方法,否则报错
}

class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }
  public sayHi() {
    console.log('miao')
  } //父类定义一个抽象方法,在多个子类中有不同的实现,运行的时候不同的子类就对应不同的操作
}

class StudyStep {
  step1() {
    console.log('listen')
    return this
  }
  step2() {
    console.log('write')
    return this
  }
}

const s = new StudyStep()

s.step1().step2() //类的成员方法可以直接返回一个this,可以方便的链式调用

interface MusicInterface {
  playMusic(): void
}

class Cellphone implements MusicInterface {
  playMusic(): void {} //定义约束后,class必须要满足接口上的所有条件
}

interface CircleStatic {
  new (radius: number): void
  pi: number
} //implements只能约束类实例上的属性和方法,要约束构造函数和静态属性,需要这样写

const Circle: CircleStatic = class Circle {
  static pi: 3.14 //未定义静态属性pi,会报错
  public radius: number
  public constructor(radius: number) {
    //构造函数形参类型不对,会报错
    this.radius = radius
  }
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
} //枚举成员会被赋值为从0开始递增的数字
console.log(Direction.Up) //0
console.log(Direction.Down) //1
// 枚举会对枚举值进行反向映射
console.log(Direction[0]) //Up
console.log(Direction[1]) //Down

enum FileAccess {
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
}
//枚举中的成员可以被计算,比如经典的使用位运算合并权限,可以这样写
console.log(FileAccess.Read)
console.log(FileAccess.Write)
console.log(FileAccess.ReadWrite)
console.log((0b0000 & 0b10) == 0b10)
console.log(7 & 8)

const enum Direction1 { //常量枚举,编译的代码会简介很多,提高了性能,但是常量枚举成员不能计算
  Up = 'UP',
  Down = 'DOWM',
  Left = 'LEFT',
  Right = 'RIGHT',
} //字符串枚举,意义在于,提供有具体语义的字符串,可以更容易的理解代码和调试

const value = 'UP'
if (value === Direction1.Up) {
  console.log('yes')
}

let a

a = 18
a = 'wang' // 定义时不赋值,就会被TS自动推导成any类型,之后随便怎么赋值都不会报错

let userName = 'wang' //定义时赋了值 就自动推导出是string类型 更改时是其他类型就会报错
//函数设置默认参数值,也会自动推导 决定函数返回值时,也会自动推导

let num: number | string //一个变量支持多个类型,用联合类型定义

//num.toString() //不确定是哪个类型时,只能访问共有的方法

interface Person {
  name: string
  age: number
}
type Student1 = Person & { grade: number } //对对象属性进行拓展,用&,交叉类型进行定义
let s2: Student1 //s2有了Person的属性

type Name = string //类型别名 type 给类型起别名
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

// type和interface的区别
// 相同点:都可以定义一个对象和函数 都允许继承
// 不同点:interface是TS设计出来用于定义对象类型的,可以对对象的形状进行描述
// type是类型别名,用于给各种类型定义别名,让TS写起来更简洁、清晰
// type可以声明基本类型、联合类型、交叉类型、元组,interface不行
// interface可以合并重复声明,type不行

function getLength(arg: number | string): number {
  if (typeof arg === 'string') {
    return arg.length
  } else {
    return arg.toString().length
  }
} //类型保护 用typeof关键字判断变量的类型

function getLength1(arg: number | string): number {
  const str = arg as string
  if (str.length) {
    return str.length
  } else {
    const number = arg as number
    return number.toString().length
  }
} //类型断言 '值 as 类型' 使用类型断言告诉TS,开发者比编译器更清楚这个参数是什么类型
// 类型断言不是类型转换,把一个类型断言成联合类型中不存在的类型会报错

type ButonSize = 'mini' | 'small' | 'normal' | 'large'
type Sex = '男' | '女' //字面量类型 只能从定义的常量中取值

function print<T>(arg: T): T {
  console.log(arg)
  return arg
} // 可以用泛型解决输入输出要一致的问题
// 泛型的语法是<>里写类型参数,一般可以用T来表示,如果类型一致,就不会报错

print<string>('hello') //定义要使用的类型 定义T为string
print('hello') //TS 类型推断,自动推导出类型 为string

type Print = <T>(arg: T) => T
const printFn: Print = function print(arg) {
  console.log(arg)
  return arg
} //type使用泛型

interface Iprint<T = number> {
  //给泛型添加默认参数
  (arg: T): T
}
function print<T>(arg: T) {
  console.log(arg)
  return arg
}
const myPrint: Iprint<number> = print //interface使用泛型

function swap(tuple) {
  return [tuple[1], tuple[0]]
} //丧失了类型

function swap1<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
} //使用泛型改造
const res = swap1(['lin', 18])

function request(url: string) {
  return fetch(url).then((res) => res.json())
}

request('user/info').then((res) => {
  console.log(res)
}) //此时返回的结果是any类型
