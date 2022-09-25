/***
 * 122, 123, 124, 125, 126, 127, 128, 129, 130, 134
*/
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
enum ProjectStatus {
    Active, Finished
}
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public manday: number,
        public status: ProjectStatus
    ) {}
}
type Listner<T> = (items: T[]) => void;
class State<T> {
    protected listeners: Listner<T>[] = [];
    addListener(listenerFn: Listner<T>) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {
        super();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title: string, description: string, manday: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            manday,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
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
 * 127, 131
*/
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor(
        templatedId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(
            templatedId
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(
            hostElementId
        )! as T;
        const importedNode = document.importNode(
            this.templateElement.content, true
        );
        this.element = importedNode.firstElementChild as U;
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
/***
 * 132, 133, 134, 136
*/
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;
    get manday() {
        if (this.project.manday < 20) {
            return this.project.manday.toString() + '人日';
        } else {
            return (this.project.manday / 20).toString() + '人月';
        }
    }
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    @autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
    dragEndHandler(_: DragEvent) {
        console.log('Drag終了');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.manday;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
/***
 * 135, 136
*/
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];
    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
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
    dropHandler(event: DragEvent) {
        console.log(event.dataTransfer!.getData('text/plain'));
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
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type === 'active' ? '実行中プロジェクト': '完了プロジェクト';
    }
    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(listEl.id, prjItem);
        }
    }
}
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    mandayInputElement: HTMLInputElement;
    constructor() {
        super('project-input', 'app', true, 'user-input');
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
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
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
            projectState.addProject(title, desc, manday);
            console.log(title, desc, manday);
            this.clearInputs();
        }
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
    private async getDailyWeather(latitude: number, longitude: number) {
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
            this.getDailyWeather(data.lat, data.lon)
            .then(d => {
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
new WeatherClient(API_KEY, 'Shinagawa');
