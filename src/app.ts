/***
 * 122, 123, 124, 125, 126
*/
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
function autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid =
            isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
        validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid =
            isValid && validatableInput.value >= validatableInput.min;
    }
    if (
        validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid =
            isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
/***
 * 127
*/
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById(
            'project-list'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(
            'app'
        )! as HTMLDivElement;
        const importedNode = document.importNode(
            this.templateElement.content, true
        );
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type === 'active' ? '実行中プロジェクト': '完了プロジェクト';
    }
    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    mandayInputElement: HTMLInputElement;
    constructor() {
        this.templateElement = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(
            'app'
        )! as HTMLDivElement;
        const importedNode = document.importNode(
            this.templateElement.content, true
        );
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector(
            '#title'
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            '#description'
        ) as HTMLInputElement;
        this.mandayInputElement = this.element.querySelector(
            '#manday'
        ) as HTMLInputElement;
        this.configure();
        this.attach();
    }
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredManday = this.mandayInputElement.value;
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const mandayValidatable: Validatable = {
            value: +enteredManday,
            required: true,
            min: 1,
            max: 1000
        };
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(mandayValidatable)
        ) {
            alert('入力値が正しくありません。再度お試しください。');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredManday];
        }
    }
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.mandayInputElement.value = '';
    }
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            console.log(title, desc, manday);
            this.clearInputs();
        }
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
/***
 * OpenWeatherMap
*/
declare var Chart: any;
interface WeatherDataType {
    name: string,
    weather: [{
        main: string,
        description: string
    }],
    main: {
        temp: number,
        feels_like: number,
        humidity: number,
        temp_max: number,
        temp_min: number,
    },
    wind: {
        speed: number
    }
}
type GeocodingDataType = [
    data: {
        lat: number,
        lon: number
    }
];
class WeatherClient {
    constructor(private apiKey: string, private cityName: string) {
        this.getGeocoding(this.cityName);
        this.getData();
    }
    private async getGeocoding(city: string) {
        const body = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
                this.apiKey
            }`
        );
        const data: GeocodingDataType = await body.json();
        return {
            lat: data[0].lat,
            lon: data[0].lon
        }
    }
    private async getWeather(latitude: number, longitude: number) {
        const body = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
                this.apiKey
            }`
        );
        const data: WeatherDataType = await body.json();
        return {
            city: data.name,
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,
            speed: data.wind.speed
        }
    }
    private async getWeatherForecast(latitude: number, longitude: number) {
        const body = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${
                this.apiKey
            }`
        );
        const data = await body.json();
        const time: string[] = data.list.map((m: any) => m.dt_txt);
        const temp: number[] = data.list.map((m: any) => m.main.temp);
        const temp_max: number[] = data.list.map((m: any) => m.main.temp_max);
        const temp_min: number[] = data.list.map((m: any) => m.main.temp_min);
        const feels_like: number[] = data.list.map((m: any) => m.main.feels_like);
        const humidity: number[] = data.list.map((m: any) => m.main.humidity);
        const deg: number[] = data.list.map((m: any) => m.wind.deg);
        const gust: number[] = data.list.map((m: any) => m.wind.gust);
        const speed: number[] = data.list.map((m: any) => m.wind.speed);
        const daily = {
            labels: time,
            datasets:
            [
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
            datasets:
            [
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
    }
    private getData() {
        this.getGeocoding(this.cityName)
        .then(data => {
            this.getWeather(data.lat, data.lon)
            .then(d => {
                console.log(d);
                const city = <HTMLElement>document.getElementById('city')!;
                const main = <HTMLElement>document.getElementById('main')!;
                const des = <HTMLElement>document.getElementById('des')!;
                const temp = <HTMLElement>document.getElementById('temp')!;
                const humidity = <HTMLElement>document.getElementById('humidity')!;
                const speed = <HTMLElement>document.getElementById('speed')!;
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
const wc = new WeatherClient(API_KEY, 'Shinagawa');
