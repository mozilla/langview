import spec from '../spec/Select.json';

class SelectComponent extends HTMLElement {
  constructor() {
    super();
    this._bindID = '';
  }

  connectedCallback() {
    this.render();
  }

  set bind(value) {
    this._bindID = value;
    this.subscribeEvents();
  }

  set items(value) {
    this._items = value;
  }

  set title(value) {
    this._title = value;
  }

  subscribeEvents() {
    if (!this._bindID) return;

    this.childNodes.forEach((node) => {
      node.addEventListener('click', (e) => {
        const event = new CustomEvent(this._bindID, {
          detail: e.target.innerText,
        });
        console.log(event);
        document.dispatchEvent(event);
      })
    })
  }

  render() {
    this.innerHTML = `
      <style>${this.styles}</style>
      ${ this._title ? `<h2>${this._title}</h2>` : '' }
      <ul>
        ${this._items.map((item) => (
          `<li>${item}</li>`
        )).join('')}
      </ul>
    `;

    this.subscribeEvents();
  }

  get styles() {
    return `
      lv-select {
        width: 250px;
        display: flex;
        flex-direction: column;
        background: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-sizing: border-box;
      }

      lv-select h2 {
        font-weight: 600;
        font-size: 14px;
        padding: 7px 15px 3px 15px;
      }

      lv-select ul {
        padding: 0;
        list-style: none;
        margin: 0;
      }

      lv-select ul li {
        border-top: 1px solid #ddd;
        padding: 15px;
        cursor: pointer;
      }

      lv-select ul li:hover {
        background: #f8f8f8;
      }
    `;
  }
}
customElements.define('lv-select', SelectComponent);

export default {
  spec: spec,
  component: SelectComponent,
}