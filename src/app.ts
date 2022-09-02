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
 * 93, 94, 95
*/
function copy<T extends { name: string }, U extends keyof T>(value: T, key: U): T {
    value[key];
    return value;
}
// console.log(copy({ name: 'Quill', age: 38 }, 'name'));
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
/*
interface argTypes {
    name: string;
}
function getName<T extends argTypes>(arg: T): string {
    return arg.name;
}
console.log({ name: "鈴木一郎" });
*/
class LightDatabase<T extends string | number | boolean> {
    private data: T[] = [];
    add(item: T) {
        this.data.push(item);
    }
    remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
// console.log(stringLightDatabase.get());
/***
 * 97
*/
interface TmpDatabase<T> {
    id: number;
    data: T[]
}
const tmpDatebase: TmpDatabase<number> = {
    id: 3,
    data: [32]
}
/***
 * 98
*/
interface Todo {
    title: string;
    text: string;
}
type Todoable = Partial<Todo>
type ReadTodo = Readonly<Todo>
const featchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
});
featchData.then(data => {
    data.toUpperCase();
});
const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];
/***
 * 99
*/
interface ResponseDate<T extends { message: string } = any> {
    data: T;
    status: number;
}
let tmp2: ResponseDate;
/***
 * 100
*/
interface Vegetables {
    readonly tomato: string;
    pumpkin?: string;
}
let tmp3: keyof Vegetables;
type MappedTyped = {
    -readonly [P in keyof Vegetables]-?: string;
}
/***
 * 101
*/
type ConditionalType = 'tomato' extends string ? number : boolean;
type ConditionalTypeInfer = { tomato: string } extends { tomato: infer R } ? R : boolean;
type DistributiveConditionalTypes<T> = T extends 'tomato' ? number : boolean;
let tmp4: DistributiveConditionalTypes<'tomato' | 'pumpkin'>;
let tmp5: NonNullable<string | null>;
/***
 * 104, 105, 107
*/
function Logging(message: string) {
    return function (constructor: Function) {
        console.log(message);
        console.log(constructor);
    }
}
/***
 * 106, 107, 108
*/
function Component(template: string, selector: string) {
    return function<T extends { new(...args: any[]): { name: string }}>(constructor: T) {
        const mountedElement = document.querySelector(selector);
        const instance = new constructor();
        if (mountedElement) {
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1')!.textContent = instance.name;
        }
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                // console.log('Component');
                const mountedElement = document.querySelector(selector);
                const instance = new constructor();
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1')!.textContent = instance.name;
                }
            }
        }
    }
}
/***
 * 109
*/
function PropertyLogging(target: any, propertyKey: string) {
    console.log('PropertyLogging');
    console.log(target);
    console.log(propertyKey);
}
/***
 * 110
*/
function MethodLogging(target: any, propertyKey: string, descriptor: PropertyDecorator) {
    console.log('MethodLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
/***
 * 111
*/
function AccessorLogging(target: any, propertyKey: string, descriptor: PropertyDecorator) {
    console.log('AccessorLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
@Component('<h1>{{ name }}</h1>', '#app')
// @Logging('Logging User')
class User {
    // @PropertyLogging
    static name2 = 'Quill';
    name = 'Quill';
    constructor(private _age: number) {
        // console.log('User was created!');
    }
    // @AccessorLogging
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    // @MethodLogging
    greeting() {
        console.log('Hello!');
    }
}
// const user1 = new User(32);
// const user2 = new User(32);
// const user3 = new User(32);
