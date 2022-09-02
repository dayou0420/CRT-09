/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

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
 * 93
*/
function copy(value) {
    return value;
}
function getName(arg) {
    return arg.name;
}
// console.log({ name: "鈴木一郎" });

/******/ })()
;
//# sourceMappingURL=bundle.js.map