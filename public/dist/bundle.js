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
/***
 * 122, 123, 124, 125, 126
*/
/***
 * 127, 128
*/
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, manday) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            manday: manday
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
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
/***
 * 127
*/
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.assignedProjects = [];
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
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
            projectState.addProject(title, desc, manday);
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
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
class WeatherClient {
    constructor(apiKey, cityName) {
        this.apiKey = apiKey;
        this.cityName = cityName;
        this.getGeocoding(this.cityName);
        this.getData();
    }
    getGeocoding(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apiKey}`);
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
            const deg = data.list.map((m) => m.wind.deg);
            const gust = data.list.map((m) => m.wind.gust);
            const speed = data.list.map((m) => m.wind.speed);
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
            const wind = {
                labels: time,
                datasets: [
                    {
                        label: 'Deg',
                        data: deg,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.2
                    },
                    {
                        label: 'Gust',
                        data: gust,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.2
                    },
                    {
                        label: 'Speed',
                        data: speed,
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.2
                    },
                ]
            };
            new Chart(document.getElementById('wind'), {
                type: 'line',
                data: wind
            });
        });
    }
    getData() {
        this.getGeocoding(this.cityName)
            .then(data => {
            this.getWeather(data.lat, data.lon)
                .then(d => {
                console.log(d);
                const city = document.getElementById('city');
                const main = document.getElementById('main');
                const des = document.getElementById('des');
                const temp = document.getElementById('temp');
                const humidity = document.getElementById('humidity');
                const speed = document.getElementById('speed');
                city.innerText = d.city;
                main.innerText = d.main;
                des.innerText = d.description;
                temp.innerText = String(d.temp);
                humidity.innerText = String(d.humidity);
                speed.innerText = String(d.speed);
            })
                .catch(e => {
                throw new Error(e.message);
            });
            this.getWeatherForecast(data.lat, data.lon);
        })
            .catch(err => {
            throw new Error(err.message);
        });
    }
}
const API_KEY = '219228b2383f8240a93b11492d102a52';
new WeatherClient(API_KEY, 'Shinagawa');


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