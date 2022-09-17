/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

var _a;
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
/***
 * 88
*/
const result = add('Hello', 'TypeScript');
result.split(' ');
function printEmployeeInformation(emp) {
    // console.log(emp.name);
    if ('privileges' in emp) {
        // console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        // console.log('StartDate: ' + emp.startDate);
    }
}
printEmployeeInformation({ name: 'Manu', startDate: new Date() });
class Car {
    drive() {
        // console.log('運転中...');
    }
}
class Truck {
    drive() {
        // console.log('トラックを運転中...');
    }
    loadCargo(amount) {
        // console.log('荷物を載せています ...' + amount)
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    // console.log('移動速度: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
/***
 * 86
*/
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
const userInputElement = document.getElementById("user-input");
if (userInputElement) {
    userInputElement.value = 'こんにちは';
}
const errorBag = {
    email: '正しいメールアドレスではありません',
    username: 'ユーザ名に記号を含めることはできません'
};
/***
 * 89
*/
const fetchedUserData = {
    id: 'u1',
    name: 'user1',
    job: {
        title: 'Developer',
        description: 'TypeScript'
    }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
/***
 * 90
*/
const userInput = '';
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT';
console.log(storedData);

/******/ })()
;
//# sourceMappingURL=bundle.js.map