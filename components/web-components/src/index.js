import yaml from 'js-yaml';

export { default as Card } from './Card';
export { default as VStack } from './VStack';
export { default as Map } from './Map';
export { default as HStack } from './HStack';
export { default as Select } from './Select';

function toAttributeString(item) {
  const keys = Object.keys(item).filter((k) => k !== 'type');
  return keys.map((k) => `${k}="${item[k]}"`).join(' ');
}

// The primary view layer that instantiates the components given the YAML
// output of the model.
export class View extends HTMLElement {
  constructor() {
    super();
    this._children = [];
  }

  connectedCallback() {
    this.render();
  }

  set markup(markup) {
    const json = yaml.load(markup);
    this._children = json;
    this.render();
  }

  render() {
    if (!this._children.length) return;
    this.innerHTML = '';

    this.setAttribute('style', this.styles)
    
    this._children.forEach((x) => {
      const elem = document.createElement(`lv-${x.type.toLowerCase()}`);
      const propKeys = Object.keys(x).filter(key => key !== 'type');
      console.log(x, propKeys)
      propKeys.forEach((key) => elem[key] = x[key]);
      this.appendChild(elem);
    });
  }

  get styles() {
    return `
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
    `;
  }
}

customElements.define('lang-view', View);
