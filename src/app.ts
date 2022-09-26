declare var Chart: any;
interface Validatable {
    value: string;
    required: boolean;
    minLength?: number;
}
function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    return isValid;
}
class GeocodingInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    addressInputElement: HTMLInputElement;
    constructor(private apiKey: string,) {
        this.templateElement = <HTMLTemplateElement>document.getElementById('geocoding-input')!;
        this.hostElement = <HTMLDivElement>document.getElementById('app')!;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLFormElement>importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.addressInputElement = <HTMLInputElement>this.element.querySelector('#address')!;
        this.configure();
        this.attach();
    }
    private getherUserInput(): [string] | void {
        const enterdAddress = this.addressInputElement.value;
        const addressValidatable: Validatable = {
            value: enterdAddress,
            required: true,
            minLength: 1
        }
        if (!validate(addressValidatable)) {
            alert('Input value is not valid. Please retry.');
            return;
        } else {
            return [enterdAddress];
        }
    }
    private clearInputs() {
        this.addressInputElement.value = '';
    }
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.getherUserInput();
        if (Array.isArray(userInput)) {
            const [address] = userInput;
        }
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
        this.clearInputs();
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    private async getGeocoding(address: string) {
        const body = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${
                this.apiKey
            }`
        );
        const data = await body.json();
        return {
            lat: data[0].lat,
            lon: data[0].lon
        };
    }
    private async getWeather(latitude: number, longitude: number) {
        const body = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
                this.apiKey
            }`
        );
        const data = await body.json();
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
    }
}
const API_KEY = '219228b2383f8240a93b11492d102a52';
const geoInput = new GeocodingInput(API_KEY);
