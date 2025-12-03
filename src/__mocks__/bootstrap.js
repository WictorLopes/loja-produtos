export class Modal {
    constructor(element) {
        this.element = element;
    }
    show = jest.fn();
    hide = jest.fn();
    dispose = jest.fn();
}
