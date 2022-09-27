declare var Chart: any;
declare var myChart: any;
type GeocodingType = [
    data: {
        lat: number,
        lon: number
    }
];
type WeatherType = {
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
        temp_min: number
    },
    wind: {
        speed: number
    }
}
type WeatherForecastType = {
    list: [
        dt_txt: string,
        main: {
            temp: number,
            temp_max: number,
            temp_min: number,
            feels_like: number,
            humidity: number
        }
    ]
}
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
enum GeocodingStatus {
    Active, Finished
}
class Geocoding {
    constructor(
        public id: string,
        public city: string,
        public main: string,
        public description: string,
        public temp: number,
        public humidity: number,
        public speed: number,
        public status: GeocodingStatus
    ) {}
}
type Listener<T> = (items: T[]) => void;
class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}
class GeocodingState extends State<Geocoding> {
    private geocodings: Geocoding[] = [];
    private static instance: GeocodingState;
    private constructor() {
        super();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GeocodingState();
        return this.instance;
    }
    addGeocoding(
        city: string,
        main: string,
        description: string,
        temp: number,
        humidity: number,
        speed: number
    ) {
        const newGeocoding = new Geocoding(
            Math.random().toString(),
            city,
            main,
            description,
            temp,
            humidity,
            speed,
            GeocodingStatus.Active
        );
        this.geocodings.push(newGeocoding);
        this.updateListeners();
    }
    moveGeocoding(geocodingId: string, newStatus: GeocodingStatus) {
        const geocoding = this.geocodings.find(geo => geo.id === geocodingId);
        if (geocoding && geocoding.status !== newStatus) {
            geocoding.status = newStatus;
            this.updateListeners();
        }
    }
    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.geocodings.slice());
        }
    }
}
const geocodingState = GeocodingState.getInstance();
interface Validatable {
    value: string;
    required: boolean;
    minLength?: number;
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
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    return isValid;
}
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
        this.hostElement = <T>document.getElementById(hostElementId)!;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <U>importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    abstract configure(): void;
    abstract renderContent(): void;
    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend',
            this.element
        );
    }
}
class GeocodingItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private geocoding: Geocoding;
    get temp() {
        return this.geocoding.temp.toString() + ' °';
    }
    get humidity() {
        return this.geocoding.humidity.toString() + ' %';
    }
    get speed() {
        return this.geocoding.speed.toString() + ' m/h';
    }
    constructor(hostId: string, geocoding: Geocoding) {
        super('single-geocoding', hostId, false, geocoding.id);
        this.geocoding = geocoding;
        this.configure();
        this.renderContent();
    }
    @autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.geocoding.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
    @autobind
    dragEndHandler(_: DragEvent) {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('#city')!.textContent = this.geocoding.city;
        this.element.querySelector('#main')!.textContent = this.geocoding.main;
        this.element.querySelector('#description')!.textContent =
            this.geocoding.description.slice(0, 1).toUpperCase() + this.geocoding.description.slice(1);
        this.element.querySelector('#temp')!.textContent = this.temp;
        this.element.querySelector('#humidity')!.textContent = this.humidity;
        this.element.querySelector('#speed')!.textContent = this.speed;
    }
}
class GeocodingList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedGeocodings: Geocoding[];
    constructor(private type: 'active' | 'finished') {
        super('geocoding-list', 'app', false, `${type}-geocodings`);
        this.assignedGeocodings = [];
        this.configure();
        this.renderContent();
    }
    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @autobind
    dropHandler(event: DragEvent) {
        const geoId = event.dataTransfer!.getData('text/plain');
        geocodingState.moveGeocoding(
            geoId,
            this.type === 'active' ? GeocodingStatus.Active : GeocodingStatus.Finished
        );
    }
    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        geocodingState.addListener((geocodings: Geocoding[]) => {
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
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type === 'active' ? 'Searching Weather' : 'Searched Weather';
    }
    private renderGeocodings() {
        const listEl = <HTMLUListElement>document.getElementById(`${this.type}-geocoding-list`)!;
        listEl.innerHTML = '';
        for (const geoItem of this.assignedGeocodings) {
            new GeocodingItem(listEl.id, geoItem);
        }
    }
}
class GeocodingInput extends Component<HTMLDivElement, HTMLFormElement> {
    addressInputElement: HTMLInputElement;
    constructor(private apiKey: string) {
        super('geocoding-input', 'app', true, 'user-input');
        this.addressInputElement = <HTMLInputElement>this.element.querySelector('#address')!;
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
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
    @autobind
    private submitHandler(event: Event) {
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
    private async getGeocoding(address: string) {
        const body = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${
                this.apiKey
            }`
        );
        const data: GeocodingType = await body.json();
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
        const data: WeatherType = await body.json();
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
        const data: WeatherForecastType = await body.json();
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
        window.myChart = new Chart(document.getElementById('daily'), {
            type: 'line',
            data: daily
        });
    }
}
const API_KEY = '219228b2383f8240a93b11492d102a52';
const geoInput = new GeocodingInput(API_KEY);
const activeGeo = new GeocodingList('active');
const finishedGeo = new GeocodingList('finished');
