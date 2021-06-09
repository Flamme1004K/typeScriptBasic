// TypeScript의 핵심 원칙 중 하나는 타입 검사 값의 형태에 초점을 맞추고 있다는 것이다.
// 이것을 DuckTyping 혹은 Structual subTyping이라고 한다.
// TypeScript의 interface는 타입들의 이름을 짓는 역할, 코드 안의 계약을 정의하는 것 뿐만 아니라, 프로젝트 외부에서 사용하는 코드의 계약을 정의하는 강력한 방법이다.

// 1. Our First Interface

function printLabel(labeledObj : { label : string}) {
    console.log(labeledObj.label);
}

let myObj = {size : 10, label : "Size 10 Object"}
printLabel(myObj);

// ---> interface

interface LabeledValue {
    label : string;
}

function printLabel2(labeledObj : LabeledValue) {
    console.log(labeledObj.label);
}

let myObj2 = {size : 10, label : "Size 10 Object"};
printLabel2(myObj2);

// 문자열 타입 Lavel을 꼭 가지고 있어야 한다.



// 2. Optional Property

interface SquareConfig {
    color? : string;
    width? : number;
    [proName: string] : any; //추가 프로퍼티 생성
}

function createSquare(config: SquareConfig) : {color : string, area : number} {
    let newSquare = {color : "white", area : 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;   
}

let mySquare =  createSquare({color: "Black"});


// 3. ReadOnly properties

interface Point {
    readonly x:number;
    readonly y:number;
}

let p1: Point = {x:10, y:20};
 // p1.x = 5; // 읽기 전용이기 때문에 오류

let a: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = a;
// a = ro; 불가능

a = ro as number[]; //타입 단언으로 오버라이드 가능

// ReadOnly vs Const 
// 변수에는 const 프로퍼티에는 ReadOnly 사용


// 4. Express Property Checks
// [proName: string] : any 추가 프로퍼티 사용

// 5. FunctionType

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString)
    return result > -1;
}

mySearch = function(src : string, sub : string) : boolean {
    let result = src.search(sub);
    return result > -1;
}

mySearch = function(src, sub) { // 추론 또한 가능
    let result = src.search(sub);
    return result > -1;
}

// 6. Indexable Type
// 인덱서블 타입은 인덱싱 할 때 해당 반환 유형과 함께 객체를 인덱싱하는 데 사용할 수 있는 타입을 기술하는 인덱스 시그니처(index sigature)을 가지고 있습니다.

interface StringArray {
    [index:number] :string;
}

let myArray:StringArray;

myArray = ["Bob", "Fred"];

let myStr : string = myArray[0];

/*
class Animal {
    name : string;
}

class Dog extends Animal {
    breed: string;
}

interface NotOkay{
    [x: number] : Animal;
    [y: string] : Dog
}

*/

interface NumberOrStringDictionary {
    [index : string] :number | string;
    length: number;
    name : string;
}



// 7. Class Type Interface

interface ClockInterface  {
    currentDate : Date
    setTime(d: Date) : void;
}

class Clock implements ClockInterface {
    currentDate: Date = new Date();
    setTime(d: Date) {
        this.currentDate = d;
    }
    constructor(h:number, n:number) {}
}

// 7-1 Diffrence between the static and instance sides of classes

interface ClockConstructor {
    new (hour : number , minute : number)
}

interface ClockInterface2 {
    tick() : void
}

function createClock(ctor : ClockConstructor, hour : number, minute : number) : ClockInterface2 {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface2 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface2 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 7 - 2 Extending Interface

interface Shape {
    color : string;
}

interface PenStroke {
    penWidth: number;
}


interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

interface Counter {
    (start: number): string;
    interval? : number;
    reset(): void
}

function getCounter(): Counter {
    // let counter = (function (start: number) { }) as Counter;
    let counter = <Counter>function (start: number) {return start + ""};
    // 이럴떄는.. 그냥 필수값을 해제하는 것도 정답이다..
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let asdf = getCounter();
asdf(10);
asdf.reset();
asdf.interval = 5.0;
