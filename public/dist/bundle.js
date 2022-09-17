/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

/***
 * 94
*/
const names = []; // string[]
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
 * 95
*/
function merge(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
    // return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Max' }, { age: 30 });
mergedObj.age;

/******/ })()
;
//# sourceMappingURL=bundle.js.map