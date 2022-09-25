class GeocodingInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('geocoding-input')!;
        this.hostElement = <HTMLDivElement>document.getElementById('app')!;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLFormElement>importedNode.firstElementChild;
        this.attach();
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const geoInput = new GeocodingInput();
