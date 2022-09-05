import { Foodable } from "./interfaces.js";
import { Score } from "./score.js";

export class Food implements Foodable {
    constructor(public element: HTMLDivElement) {
        element.addEventListener('click', this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
        this.element.classList.toggle('food--active');
        const sore = Score.getInstance();
        sore.render();
    }
}
