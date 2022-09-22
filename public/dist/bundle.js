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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function autobind(_, _2, descriptor) {
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
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid =
            isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid =
            isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid =
            isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.mandayInputElement = this.element.querySelector('#manday');
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredManday = this.mandayInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const mandayValidatable = {
            value: +enteredManday,
            required: true,
            min: 1,
            max: 1000
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(mandayValidatable)) {
            alert('入力値が正しくありません。再度お試しください。');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredManday];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.mandayInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            console.log(title, desc, manday);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
/***
 * OpenWeatherMap
*/
class WeatherClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.latitude = 34.6937;
        this.longitude = 135.5023;
        this.getWeatherData();
    }
    getWeather(latitude, longitude) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`);
            const data = yield body.json();
            return {
                city: data === null || data === void 0 ? void 0 : data.name,
                weather: (_a = data === null || data === void 0 ? void 0 : data.weather[0]) === null || _a === void 0 ? void 0 : _a.main,
                temp: (_b = data === null || data === void 0 ? void 0 : data.main) === null || _b === void 0 ? void 0 : _b.temp,
                feels_like: (_c = data === null || data === void 0 ? void 0 : data.main) === null || _c === void 0 ? void 0 : _c.feels_like,
                humidity: (_d = data === null || data === void 0 ? void 0 : data.main) === null || _d === void 0 ? void 0 : _d.humidity,
                temp_max: (_e = data === null || data === void 0 ? void 0 : data.main) === null || _e === void 0 ? void 0 : _e.temp_max,
                temp_min: (_f = data === null || data === void 0 ? void 0 : data.main) === null || _f === void 0 ? void 0 : _f.temp_min,
            };
        });
    }
    getWeatherData() {
        this.getWeather(this.latitude, this.longitude)
            .then(data => {
            console.log(data);
        })
            .catch(err => {
            console.log(err.message);
        });
    }
}
const API_KEY = '219228b2383f8240a93b11492d102a52';
const wc = new WeatherClient(API_KEY);


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