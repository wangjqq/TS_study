let isHandsome = true; //布尔型
let age = 18; //数字型
let niceName = 'jq'; //字符串型
let fullName = `w ${niceName}`; //支持模板字符串
let u = undefined; //undefined类型
let n = null; //null类型
age = null; //默认情况下null和undefined是所有类型的子类型
niceName = undefined; //但是如果指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自，不然会报错。
let notSure = 4; //不清楚用什么类型,可以使用any类型
function divide(params) {
    return params / 2; //使用any不会报错 使用unknown会报错 使用类型断言as解决问题
}
function welcome() {
    console.log('hello');
} //void表示没有任何类型,如函数没有明确返回值,默认返回void类型
function fn(msg) {
    throw new Error(msg);
} //never类型表示永不存在的值的类型 例如:一个函数执行时抛出了异常,那么函数永远不存在返回值,因为抛出异常会直接中断程序运行
// 没有类型可以赋值给never,never可以赋值给任何类型
let list = [1, 2, 3]; //数组里的项写错类型会报错
list.push(4); //push时类型对不上也会报错
console.log(list);
let tuple = [21, 'wang']; //元组类型允许表示一个已知元素数量和类型的数组,各元素的类型不必相同,写错类型会报错,越界会报错
tuple.push(1); //但是可以push,push不会越界报错,但是类型要合规
function add(x, y) {
    return x + y;
} //函数类型需要定义输入参数类型和输出类型,输出类型可以忽略
// 函数没有明确返回值,默认返回void类型
add(1, 2);
let add2 = (x, y) => {
    return x + y;
}; //箭头函数的写法
function add3(x, y, z) {
    return x + y;
} //参数后加个问号,代表这个参数是可选的,可选参数要放在形参的最后面
function add4(x = 100, y) {
    return x + y;
} //默认参数可以不放在形参的最后面
console.log(add4(undefined, 100)); //但是如果不在最后面,前面的参数要用undefined占位
function add5(x) {
    if (typeof x[0] === 'string') {
        return x.join();
    }
    if (typeof x[0] === 'number') {
        return x.reduce((acc, cur) => acc + cur);
    }
} //函数重载,需要多次声明这个函数,先定义后实现
const p2 = {
    name: 'wang',
    age: 21,
    id: 1,
}; //少写错写属性报错
const add6 = (num1, num2) => {
    return num1 + num2;
};
const obj = {
    a: 'hello',
    b: 'wang',
    c: 'welcome',
};
const arr = ['hello', 'wang'];
arr[0]; //可以用下标访问值,但是这不是真正的数组,数组的方法它是没有的
class Person {
    // private,私有的,只属于这个类自己,它的实例和继承它的子类都访问不到
    // protected 受保护的,继承它的子类可以访问,实例不能访问
    // static 是静态属性,是类上的一些常量,实例不能访问
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} is speaking`);
    }
} //定义了一个Person类,有属性name和方法speak
const p1 = new Person('wang'); //新建实例
p1.name; //访问属性和方法
p1.speak();
class Student extends Person {
    constructor(name, grade) {
        super(name);
        this.grade = grade;
    }
    study() {
        console.log(`${this.name} needs study`);
    }
    speak() {
        return `Student ${super.speak()}`;
    } //子类对父类方法进行重写
}
const s1 = new Student('wangjingqi', 21);
s1.study();
s1.speak();
class Animal {
    constructor(name) {
        this.name = name;
    }
} //抽象类,不能被实例化
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    sayHi() {
        console.log('wang');
    } //继承自抽象类,必须实现抽象类的抽象方法,否则报错
}
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    sayHi() {
        console.log('miao');
    } //父类定义一个抽象方法,在多个子类中有不同的实现,运行的时候不同的子类就对应不同的操作
}
class StudyStep {
    step1() {
        console.log('listen');
        return this;
    }
    step2() {
        console.log('write');
        return this;
    }
}
const s = new StudyStep();
s.step1().step2(); //类的成员方法可以直接返回一个this,可以方便的链式调用
class Cellphone {
    playMusic() { } //定义约束后,class必须要满足接口上的所有条件
}
const Circle = class Circle {
    constructor(radius) {
        //构造函数形参类型不对,会报错
        this.radius = radius;
    }
};
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {})); //枚举成员会被赋值为从0开始递增的数字
console.log(Direction.Up); //0
console.log(Direction.Down); //1
// 枚举会对枚举值进行反向映射
console.log(Direction[0]); //Up
console.log(Direction[1]); //Down
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
})(FileAccess || (FileAccess = {}));
//枚举中的成员可以被计算,比如经典的使用位运算合并权限,可以这样写
console.log(FileAccess.Read);
console.log(FileAccess.Write);
console.log(FileAccess.ReadWrite);
console.log((0b0000 & 0b10) == 0b10);
console.log(7 & 8);
const value = 'UP';
if (value === "UP" /* Direction1.Up */) {
    console.log('yes');
}
let a;
a = 18;
a = 'wang'; // 定义时不赋值,就会被TS自动推导成any类型,之后随便怎么赋值都不会报错
let userName = 'wang'; //定义时赋了值 就自动推导出是string类型 更改时是其他类型就会报错
//函数设置默认参数值,也会自动推导 决定函数返回值时,也会自动推导
let num; //一个变量支持多个类型,用联合类型定义
let s2; //s2有了Person的属性
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
// type和interface的区别
// 相同点:都可以定义一个对象和函数 都允许继承
// 不同点:interface是TS设计出来用于定义对象类型的,可以对对象的形状进行描述
// type是类型别名,用于给各种类型定义别名,让TS写起来更简洁、清晰
// type可以声明基本类型、联合类型、交叉类型、元组,interface不行
// interface可以合并重复声明,type不行
function getLength(arg) {
    if (typeof arg === 'string') {
        return arg.length;
    }
    else {
        return arg.toString().length;
    }
} //类型保护 用typeof关键字判断变量的类型
function getLength1(arg) {
    const str = arg;
    if (str.length) {
        return str.length;
    }
    else {
        const number = arg;
        return number.toString().length;
    }
} //类型断言 '值 as 类型' 使用类型断言告诉TS,开发者比编译器更清楚这个参数是什么类型
function print(arg) {
    console.log(arg);
    return arg;
} // 可以用泛型解决输入输出要一致的问题
// 泛型的语法是<>里写类型参数,一般可以用T来表示,如果类型一致,就不会报错
print('hello'); //定义要使用的类型 定义T为string
print('hello'); //TS 类型推断,自动推导出类型 为string
const printFn = function print(arg) {
    console.log(arg);
    return arg;
}; //type使用泛型
function print(arg) {
    console.log(arg);
    return arg;
}
const myPrint = print; //interface使用泛型
function swap(tuple) {
    return [tuple[1], tuple[0]];
} //丧失了类型
function swap1(tuple) {
    return [tuple[1], tuple[0]];
} //使用泛型改造
const res = swap1(['lin', 18]);
function request(url) {
    return fetch(url).then((res) => res.json());
}
request('user/info').then((res) => {
    console.log(res);
}); //此时返回的结果是any类型
