class GeocodingInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    addressInputElement: HTMLInputElement;
    constructor() {
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
        console.log(this.addressInputElement.value);
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const geoInput = new GeocodingInput();
