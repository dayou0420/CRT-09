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
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class GeocodingState extends State {
    constructor() {
        super();
        this.geocodings = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GeocodingState();
        return this.instance;
    }
    addGeocoding(city, main, description, temp, humidity, speed) {
        const newGeocoding = new Geocoding(Math.random().toString(), city, main, description, temp, humidity, speed, GeocodingStatus.Active);
        this.geocodings.push(newGeocoding);
        this.updateListeners();
    }
    moveGeocoding(geocodingId, newStatus) {
        const geocoding = this.geocodings.find(geo => geo.id === geocodingId);
        if (geocoding && geocoding.status !== newStatus) {
            geocoding.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.geocodings.slice());
        }
    }
}
const geocodingState = GeocodingState.getInstance();
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
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    return isValid;
}
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}
class GeocodingItem extends Component {
    constructor(hostId, geocoding) {
        super('single-geocoding', hostId, false, geocoding.id);
        this.geocoding = geocoding;
        this.configure();
        this.renderContent();
    }
    get temp() {
        return this.geocoding.temp.toString() + ' °';
    }
    get humidity() {
        return this.geocoding.humidity.toString() + ' %';
    }
    get speed() {
        return this.geocoding.speed.toString() + ' m/h';
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.geocoding.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('#city').textContent = this.geocoding.city;
        this.element.querySelector('#main').textContent = this.geocoding.main;
        this.element.querySelector('#description').textContent =
            this.geocoding.description.slice(0, 1).toUpperCase() + this.geocoding.description.slice(1);
        this.element.querySelector('#temp').textContent = this.temp;
        this.element.querySelector('#humidity').textContent = this.humidity;
        this.element.querySelector('#speed').textContent = this.speed;
    }
}
__decorate([
    autobind
], GeocodingItem.prototype, "dragStartHandler", null);
__decorate([
    autobind
], GeocodingItem.prototype, "dragEndHandler", null);
class GeocodingList extends Component {
    constructor(type) {
        super('geocoding-list', 'app', false, `${type}-geocodings`);
        this.type = type;
        this.assignedGeocodings = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const geoId = event.dataTransfer.getData('text/plain');
        geocodingState.moveGeocoding(geoId, this.type === 'active' ? GeocodingStatus.Active : GeocodingStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
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
    }
    renderContent() {
        const listId = `${this.type}-geocoding-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type === 'active' ? 'Searching Weather' : 'Searched Weather';
    }
    renderGeocodings() {
        const listEl = document.getElementById(`${this.type}-geocoding-list`);
        listEl.innerHTML = '';
        for (const geoItem of this.assignedGeocodings) {
            new GeocodingItem(listEl.id, geoItem);
        }
    }
}
__decorate([
    autobind
], GeocodingList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], GeocodingList.prototype, "dropHandler", null);
__decorate([
    autobind
], GeocodingList.prototype, "dragLeaveHandler", null);
class GeocodingInput extends Component {
    constructor(apiKey) {
        super('geocoding-input', 'app', true, 'user-input');
        this.apiKey = apiKey;
        this.addressInputElement = this.element.querySelector('#address');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
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
        this.getherUserInput();
        this.getGeocoding(this.addressInputElement.value)
            .then(data => {
            this.getWeather(data.lat, data.lon)
                .then(d => {
                geocodingState.addGeocoding(d.city, d.main, d.description, d.temp, d.humidity, d.speed);
            })
                .catch(e => {
                console.log(e.message);
            });
            if (typeof myChart !== 'undefined' && myChart) {
                myChart.destroy();
            }
            this.getWeatherForecast(data.lat, data.lon);
        })
            .catch(err => {
            console.log(err.message);
        });
        this.clearInputs();
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
            window.myChart = new Chart(document.getElementById('daily'), {
                type: 'line',
                data: daily
            });
        });
    }
}
__decorate([
    autobind
], GeocodingInput.prototype, "submitHandler", null);
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