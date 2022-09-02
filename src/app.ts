/***
 * 72
*/
interface Engineer {
    name: string;
    role: string;
}
interface Blogger {
    name: string;
    follower: number;
}
// type EngineerBlogger = Engineer & Blogger;
interface EngineerBlogger extends Engineer, Blogger {};
const quill: EngineerBlogger = {
    name: 'Quill',
    role: 'front-end',
    follower: 1000
};
type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber;
/***
 * 73, 78, 84
*/
function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return x;
}
interface TmpFunc {
    (x: string): number;
    (x: number): number;
}
const upperHello: TmpFunc = function (x: string | number) { return 0 };
/***
 * 85
*/
// interface FuncA {
//     (a: number, b: string): number;
//     (a: string, b: number): number;
// }
// interface FuncB {
//     (a: string): number;
// }
// let intersectionFunc: FuncA & FuncB;
// intersectionFunc = function(a: number | string, b?: number | string){ return 0 };
/***
 * 86
*/
interface FuncA {
    (a: number): number;
}
interface FuncB {
    (a: string): string;
}
let unionFunc: FuncA | FuncB;
unionFunc = function (a: string) { return 'hi' };
// const upperHello = toUpperCase('hello');
// const upperHello = toUpperCase;
// upperHello('hi');
//  upperHello(32);
type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
    console.log(nomadWorker.name);
    if ('role' in nomadWorker) {
        console.log(nomadWorker.role);
    }
    if ('follower' in nomadWorker) {
        console.log(nomadWorker.follower);
    }
}
/***
 * 74
*/
class Dog {
    kind: 'dog' = 'dog';
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    kind: 'bird' = 'bird';
    speak() {
        return 'tweet-tweet';
    }
    fly() {
        return 'flutter';
    }
}
type Pet = Dog | Bird;
function havePet(pet: Pet) {
    pet.speak();
    switch (pet.kind) {
        case 'bird':
            pet.fly();
    }
    if (pet instanceof Bird) {
        pet.fly();
    }
}
havePet(new Bird());
/***
 * 75, 76
*/
const input = document.getElementById('input') as HTMLInputElement;
// const input = document.getElementById('input')!;
// input.value = 'initial input value';
/***
 * 77
*/
interface Desiner {
    name: string;
    [index: string]: string;
}
const desiner: Desiner = {
    name: 'Quill',
    role: 'web'
}
/***
 * 79
*/
interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}
const downloadedData: DownloadedData = {
    id: 1
};
// console.log(downloadedData.user?.name?.first);
/***
 * 80
*/
const userData = downloadedData.user ?? 'no-user';
/***
 * 81
*/
type id = DownloadedData["id" | "user"];
/***
 * 82
*/
enum Color {
    RED,
    BLUE
}
class AdvancedPerson {
    name: string = 'Peter';
    age: number = 35;
}
class AdvancedCar {
    name: string = 'Prius';
    age: number = 5;
}
let target = new AdvancedPerson();
let source = new AdvancedCar();
// target = source;
/***
 * 87, 88
*/
function advancedFn(...args: readonly number[]) {
}
advancedFn(0, 1);
/***
 * 89
*/
const milk = 'milk' as const;
let drink = milk;
const array = [10, 20] as const;
const perter = {
    name: 'Perter',
    age: 38
} as const;
/***
 * 90
*/
type PerterType = typeof perter;
/***
 * 93
*/
function copy<T>(value: T): T {
    return value;
}
// console.log(copy({ name: 'Quill' }));
// https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4
// number型
/*
function test(arg: number): number {
    return arg;
}
// string型
function test2(arg: string): string {
    return arg;
}
console.log(test(1));
console.log(test2("文字列"));
*/
/*
function test<T>(arg: T): T {
    return arg;
}
console.log(test<number>(1));
console.log(test<string>("文字列"));
console.log(test("文字列2"));
*/
/*
function test<T, U, P>(arg1: T, arg2: U, args3: P): P {
    return args3;
}
console.log(test("文字列", true, 4));
*/
/*
class Klass<T> {
    item: T;
    constructor(item: T) {
        this.item = item;
    }
    getItem(): T {
        return this.item;
    }
}
let strObj = new Klass<string>("文字列1");
console.log(strObj.getItem());
let numObj = new Klass<number>(5);
console.log(numObj.getItem());
*/
/*
interface KeyValue<T, U> {
    key: T;
    value: U;
}
let obj: KeyValue<string, number> = { key: "文字列", value: 2 }
console.log(obj);
*/
interface argTypes {
    name: string;
}
function getName<T extends argTypes>(arg: T): string {
    return arg.name;
}
// console.log({ name: "鈴木一郎" });
