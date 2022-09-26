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
            this.getWeatherForecast(data.lat, data.lon);
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
            const body = yield fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${this.apiKey}`);
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
    getWeatherForecast(latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`);
            const data = yield body.json();
            const time = data.list.map((m) => m.dt_txt);
            const temp = data.list.map((m) => m.main.temp);
            const temp_max = data.list.map((m) => m.main.temp_max);
            const temp_min = data.list.map((m) => m.main.temp_min);
            const feels_like = data.list.map((m) => m.main.feels_like);
            const humidity = data.list.map((m) => m.main.humidity);
            const daily = {
                labels: time,
                datasets: [
                    {
                        label: 'Temperature',
                        data: temp,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.2
                    },
                    {
                        label: 'Temp Max',
                        data: temp_max,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.2
                    },
                    {
                        label: 'Temp Min',
                        data: temp_min,
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.2
                    },
                    {
                        label: 'Feels Like',
                        data: feels_like,
                        borderColor: 'rgb(255, 159, 64)',
                        tension: 0.2
                    },
                    {
                        label: 'Humidity',
                        data: humidity,
                        borderColor: 'rgb(153, 102, 255)',
                        tension: 0.2
                    }
                ]
            };
            new Chart(document.getElementById('daily'), {
                type: 'line',
                data: daily
            });
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