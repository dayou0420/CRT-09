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
/***
 * 105, 106
*/
function Logger(logString) {
    console.log('LOGGER ファクトリ');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
/***
 * 107
*/
function withTemplate(template, hookId) {
    console.log('TEMPLATE ファクトリ');
    return function (constructor) {
        console.log('テンプレートを表示');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1').textContent = p.name;
        }
    };
}
/***
 * 108
*/
// @Logger('ログ出力中 - PERSON')
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('Personオブジェクトを作成中...');
    }
};
Person = __decorate([
    Logger('ログ出力中'),
    withTemplate('<h1>Personオブジェクト</h1>', 'app')
], Person);
const pers = new Person();
console.log(pers);


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