/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function() {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
;
const quill = {
    name: 'Quill',
    role: 'front-end',
    follower: 1000
};
function toUpperCase(x) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return x;
}
const upperHello = function (x) { return 0; };
let unionFunc;
unionFunc = function (a) { return 'hi'; };
function describeProfile(nomadWorker) {
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
    constructor() {
        this.kind = 'dog';
    }
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    constructor() {
        this.kind = 'bird';
    }
    speak() {
        return 'tweet-tweet';
    }
    fly() {
        return 'flutter';
    }
}
function havePet(pet) {
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
const input = document.getElementById('input');
const desiner = {
    name: 'Quill',
    role: 'web'
};
const downloadedData = {
    id: 1
};
// console.log(downloadedData.user?.name?.first);
/***
 * 80
*/
const userData = (_a = downloadedData.user) !== null && _a !== void 0 ? _a : 'no-user';
/***
 * 82
*/
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["BLUE"] = 1] = "BLUE";
})(Color || (Color = {}));
class AdvancedPerson {
    constructor() {
        this.name = 'Peter';
        this.age = 35;
    }
}
class AdvancedCar {
    constructor() {
        this.name = 'Prius';
        this.age = 5;
    }
}
let target = new AdvancedPerson();
let source = new AdvancedCar();
// target = source;
/***
 * 87, 88
*/
function advancedFn(...args) {
}
advancedFn(0, 1);
/***
 * 89
*/
const milk = 'milk';
let drink = milk;
const array = [10, 20];
const perter = {
    name: 'Perter',
    age: 38
};
/***
 * 93, 94, 95
*/
function copy(value, key) {
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
class LightDatabase {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    remove(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
const stringLightDatabase = new LightDatabase();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
const tmpDatebase = {
    id: 3,
    data: [32]
};
const featchData = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
});
featchData.then(data => {
    data.toUpperCase();
});
const vegetables = ['Tomato', 'Broccoli', 'Asparagus'];
let tmp2;
let tmp3;
let tmp4;
let tmp5;
/***
 * 104, 105, 107
*/
function Logging(message) {
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
/***
 * 106, 107, 108
*/
function Component(template, selector) {
    return function (constructor) {
        const mountedElement = document.querySelector(selector);
        const instance = new constructor();
        if (mountedElement) {
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1').textContent = instance.name;
        }
        return class extends constructor {
            constructor(...args) {
                super(...args);
                // console.log('Component');
                const mountedElement = document.querySelector(selector);
                const instance = new constructor();
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1').textContent = instance.name;
                }
            }
        };
    };
}
/***
 * 109
*/
function PropertyLogging(target, propertyKey) {
    console.log('PropertyLogging');
    console.log(target);
    console.log(propertyKey);
}
/***
 * 110
*/
function MethodLogging(target, propertyKey, descriptor) {
    console.log('MethodLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
/***
 * 112
*/
function enumerable(isEnumerable) {
    return function (target, propertyKey, descriptor) {
        return {
            enumerable: isEnumerable
        };
    };
}
/***
 * 111
*/
function AccessorLogging(target, propertyKey, descriptor) {
    console.log('AccessorLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
let User = 
// @Logging('Logging User')
class User {
    constructor(_age) {
        this._age = _age;
        this.name = 'Quill';
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
};
// @PropertyLogging
User.name2 = 'Quill';
__decorate([
    enumerable(false)
    // @MethodLogging
], User.prototype, "greeting", null);
User = __decorate([
    Component('<h1>{{ name }}</h1>', '#app')
    // @Logging('Logging User')
], User);
// const user1 = new User(32);
// const user2 = new User(32);
// const user3 = new User(32);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map