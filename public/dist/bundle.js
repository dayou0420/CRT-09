/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

/***
 * 15, 17
*/
const person = {
    name: 'yota',
    age: 30,
    hobbies: ['Sports', 'Cooking']
};
// console.log(person);
let favoriteActivities;
favoriteActivities = ['Sports'];
for (const hobbies of person.hobbies) {
    console.log(hobbies.toUpperCase());
}
/***
 * 10, 11, 12, 13, 14
*/
function add(n1, n2, showResult, phrase) {
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //     throw new Error('入力値が正しくありません');
    // }
    const result = n1 + n2;
    if (showResult) {
        return phrase + result;
    }
    else {
        return result;
    }
}
let number1;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result: ';
add(number1, number2, printResult, resultPhrase);

/******/ })()
;
//# sourceMappingURL=bundle.js.map