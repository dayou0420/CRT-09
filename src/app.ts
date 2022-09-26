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
    private submitHandler(event: Event) {
        event.preventDefault();
        this.getGeocoding(this.addressInputElement.value)
        .then(data => {
            this.getWeather(data.lat, data.lon)
            .then(d => {
                console.log(d);
            })
            .catch(e => {
                console.log(e.message);
            })
        })
        .catch(err => {
            console.log(err.message);
        })
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    private async getGeocoding(address: string) {
        const body = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${
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
}
const API_KEY = '219228b2383f8240a93b11492d102a52';
const geoInput = new GeocodingInput(API_KEY);
