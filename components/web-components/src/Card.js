import spec from '../spec/Card.json';

class CardComponent extends HTMLElement {
  constructor() {
    super();
    this._title = '';
    this._content = '';
  }

  connectedCallback() {
    this.render();
  }

  set title(value) {
    this._title = value;
  }

  set content(value) {
    this._content = value;
  }

  render() {
    this.innerHTML = `
      <style>${this.styles}</style>
      <h1>${this._title}</h1>
      <p>${this._content}</p>
    `;
  }

    get styles() {
    return `
      lv-card {
        margin: 0 auto;
        width: 350px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 30px;
      }

      lv-card h1 {
        font-size: 18px;
      }
    `;
  }
}
customElements.define('lv-card', CardComponent);

export default {
  spec: spec,
  component: CardComponent,
}