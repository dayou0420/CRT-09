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
    // console.log('LOGGER ファクトリ');
    return function (constructor) {
        // console.log(logString);
        // console.log(constructor);
    };
}
/***
 * 107、108, 112
*/
function withTemplate(template, hookId) {
    // console.log('TEMPLATE ファクトリ');
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                // console.log('テンプレートを表示');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
/***
 * 108
*/
// @Logger('ログ出力中 - PERSON')
// @Logger('ログ出力中')
// @withTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
    constructor() {
        this.name = 'Max';
        // console.log('Personオブジェクトを作成中...');
    }
}
const pers = new Person();
// console.log(pers);
/***
 * 109
*/
function Log(target, propertyName) {
    console.log('Property デコレータ');
    console.log(target, propertyName);
}
/***
 * 110
*/
function Log2(target, name, descriptor) {
    console.log('Accessor デコレータ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method デコレータ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter デコレータ');
    console.log(target);
    console.log(name);
    console.log(position);
}
/***
 * 111
*/
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    // @Log2
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('不正な価格です - 0以下は設定できません');
        }
    }
    // @Log3
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
const p1 = new Product('Book', 100);
const p2 = new Product('Book', 200);
/***
 * 114
*/
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'クリックしました！';
    }
    // @Autobind
    showMessage() {
        console.log(this.message);
    }
}
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createCourse = new Course(title, price);
    if (!validate(createCourse)) {
        alert('正しく入力してください！');
    }
    console.log(createCourse);
});


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