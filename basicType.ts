
//Boolean
let isDone : boolean = false;

//Number
let demical : number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

//String
let color : string = "blue";
color = "red";

let fullName : string = `Flamme`;
let age : number = 29;
let sentence : string = `Hello, my name is ${fullName}. I'll be ${ age + 1} years old next month `;

//Array
let list : number[] = [1,2,3];
let list2 : Array<number> = [1,2,3];

//Tuple
let x : [string, number];
x  = ["hello", 5];

console.log(x[0].substring(1));

//Enum
enum Color {RED, GREEN, BLUE}
let c : Color = Color.BLUE;

enum IPONE {IPONE11 = 1, IPONE12 = 2, IPONE13 = 3}
let d : IPONE = IPONE.IPONE11;

/*
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // 값이 2인 'Green'이 출력됩니다.
*/

//Any
let notSure : any = 4;
notSure.ifItExitsts(); // 성공, ifItExitsts는 런타임에 존재함.
notSure.toFixed(); // 성공, toFixed 는 존재함.(컴파일러는 검사하지 않음.)
notSure = "maybe a string instread";
notSure = false;

let prettySure : Object = 4;
 // prettySure.toFixed(); // toFixed()는 Object에 존재하지 않음.

 //Void 어떤 타입도 존재하지 않음을 뜻함.

 function warnUser() : void {
    console.log("this is my warning message");
 }

 let unusable : void = undefined;
 unusable = null;


 //Null and Undefined
let u : undefined = undefined;
let n : null = null;

//Naver // 절대 발생할 수 없는 타입
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
    throw new Error(message);
}

// 반환 타입이 never로 추론된다.
function fail() {
    return error("Something failed");
}

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
    while (true) {
    }
}

// Object 
// 원시 타입이 아닌 타입 -> number, string,  boolean, bigint, symbol, null 또는 undefined가 아닌 나머지를 의미

declare function create(o: object | null): void;

create({prop : 0});
create(null);

/* 실패 예시
create(42);
create("string");
create(false);
create(undefined);
*/

//Type assertions

let someValue : any = "this is String";
let strLength : number = (<string>someValue).length;

let someValue2 : any = "this is String2";
let strLength2 : number = (someValue2 as string).length;
// typescript와 jsx를 같이 사용할 떄는 as로 사용되어 진다.

