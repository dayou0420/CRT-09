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
/***
 * OpenWeatherMap
*/
interface WeatherDataType {
    name: string,
    weather: [{
        main: string
    }],
    main: {
        temp: number,
        feels_like: number,
        humidity: number,
        temp_max: number,
        temp_min: number,
    }
}
class WeatherClient {
    private latitude = 34.6937;
    private longitude = 135.5023;
    constructor(private apiKey: string) {
        this.getWeatherData();
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
            weather: data.weather[0].main,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
        }
    }
    private getWeatherData() {
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
