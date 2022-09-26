/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function() {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class GeocodingInput {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.templateElement = document.getElementById('geocoding-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.addressInputElement = this.element.querySelector('#address');
        this.configure();
        this.attach();
    }
    submitHandler(event) {
        event.preventDefault();
        this.getGeocoding(this.addressInputElement.value)
            .then(data => {
            this.getWeather(data.lat, data.lon)
                .then(d => {
                console.log(d);
            })
                .catch(e => {
                console.log(e.message);
            });
        })
            .catch(err => {
            console.log(err.message);
        });
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    getGeocoding(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${this.apiKey}`);
            const data = yield body.json();
            return {
                lat: data[0].lat,
                lon: data[0].lon
            };
        });
    }
    getWeather(latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`);
            const data = yield body.json();
            return {
                city: data.name,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                humidity: data.main.humidity,
                speed: data.wind.speed
            };
        });
    }
}
const API_KEY = '219228b2383f8240a93b11492d102a52';
const geoInput = new GeocodingInput(API_KEY);


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