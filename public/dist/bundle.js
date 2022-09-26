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
var GeocodingStatus;
(function (GeocodingStatus) {
    GeocodingStatus[GeocodingStatus["Active"] = 0] = "Active";
    GeocodingStatus[GeocodingStatus["Finished"] = 1] = "Finished";
})(GeocodingStatus || (GeocodingStatus = {}));
class Geocoding {
    constructor(id, city, main, description, temp, humidity, speed, status) {
        this.id = id;
        this.city = city;
        this.main = main;
        this.description = description;
        this.temp = temp;
        this.humidity = humidity;
        this.speed = speed;
        this.status = status;
    }
}
class GeocodingState {
    constructor() {
        this.listeners = [];
        this.geocodings = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GeocodingState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addGeocoding(city, main, description, temp, humidity, speed) {
        const newGeocoding = new Geocoding(Math.random().toString(), city, main, description, temp, humidity, speed, GeocodingStatus.Active);
        this.geocodings.push(newGeocoding);
        for (const listenerFn of this.listeners) {
            listenerFn(this.geocodings.slice());
        }
    }
}
const geocodingState = GeocodingState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    return isValid;
}
class GeocodingList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById('geocoding-list');
        this.hostElement = document.getElementById('app');
        this.assignedGeocodings = [];
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-geocodings`;
        geocodingState.addListener((geocodings) => {
            const relevantGeocodings = geocodings.filter(geo => {
                if (this.type === 'active') {
                    return geo.status === GeocodingStatus.Active;
                }
                return geo.status === GeocodingStatus.Finished;
            });
            this.assignedGeocodings = relevantGeocodings;
            this.renderGeocodings();
        });
        this.attach();
        this.renderContent();
    }
    renderGeocodings() {
        const listEl = document.getElementById(`${this.type}-geocoding-list`);
        listEl.innerHTML = '';
        for (const geoItem of this.assignedGeocodings) {
            const listItem = document.createElement('li');
            listItem.textContent = geoItem.city;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-geocoding-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type === 'active' ? 'Active Address' : 'Finished Address';
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
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
    getherUserInput() {
        const enterdAddress = this.addressInputElement.value;
        const addressValidatable = {
            value: enterdAddress,
            required: true,
            minLength: 1
        };
        if (!validate(addressValidatable)) {
            alert('Input value is not valid. Please retry.');
            return;
        }
        else {
            return [enterdAddress];
        }
    }
    clearInputs() {
        this.addressInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getherUserInput();
        if (Array.isArray(userInput)) {
            const [address] = userInput;
        }
        this.getGeocoding(this.addressInputElement.value)
            .then(data => {
            this.getWeather(data.lat, data.lon)
                .then(d => {
                geocodingState.addGeocoding(d.city, d.main, d.description, d.temp, d.humidity, d.speed);
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
        this.clearInputs();
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
const activeGeo = new GeocodingList('active');
const finishedGeo = new GeocodingList('finished');


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