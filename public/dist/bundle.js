/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

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

/******/ })()
;
//# sourceMappingURL=bundle.js.map