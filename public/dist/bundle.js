/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

/***
 * 94
*/
// const names: Array<string> = []; // string[]
// names[0].split(' ');
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('終わりました！');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
/***
 * 95, 96
*/
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
function countAndDescribe(element) {
    let descriptionText = '値がありません。';
    if (element.length > 0) {
        descriptionText = '値は' + element.length + '個です。';
    }
    return [element, descriptionText];
}
// console.log(countAndDescribe(['Sports', 'Cooking']));
/***
 * 98
*/
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key];
}
extractAndConvert({ name: 'Max' }, 'name');
/***
 * 99
*/
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Data1');
textStorage.addItem('Data2');
textStorage.removeItem('Data1');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
function createCourceGoal(title, description, date) {
    let courceGoal = {};
    courceGoal.title = title;
    courceGoal.description = description;
    courceGoal.completeUntil = date;
    return courceGoal;
}
const names = ['Max', 'Annna'];
// names.push('Manu');
// names.pop();

/******/ })()
;
//# sourceMappingURL=bundle.js.map