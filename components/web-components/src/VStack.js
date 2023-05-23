import spec from '../spec/VStack.json';

class VStackComponent extends HTMLElement {
  constructor() {
    super();
    this._children = [];
  }
  
  connectedCallback() {
    this.render();
  }

  set children(value) {
    this._children = value;
  }

  render() {
    this.setAttribute('style', this.styles);

    this._children.forEach((x) => {
      const elem = document.createElement(`lv-${x.type.toLowerCase()}`);
      const propKeys = Object.keys(x).filter(key => key !== 'type');
      propKeys.forEach((key) => elem[key] = x[key]);
      this.appendChild(elem);
    });
  }

  get styles() {
    return `
      display: flex;
      flex-direction: column;
      gap: 15px;
    `
  }
}
customElements.define('lv-vstack', VStackComponent);


export default {
  spec: spec,
  component: VStackComponent,
}