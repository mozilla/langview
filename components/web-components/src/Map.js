import spec from '../spec/Map.json';

class MapComponent extends HTMLElement {
  constructor() {
    super();
    this._query = '';
    this.apikey = document.querySelector('lang-view').getAttribute('google-maps-api-key');
  }

  connectedCallback() {
    this.render();
  }

  set query(value) {
    this._query = value;
    this.render();
  }

  set bind(value) {
    document.addEventListener(value, (e) => {
      this.query = e.detail;
      console.log('Changing map to ' + e.detail);
    });
  }

  render() {
    this.innerHTML = `
      <style>${this.styles}</style>
      <iframe
        width="400"
        height="400"
        style="border:0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=${this.apikey}&q=${this._query}">
      </iframe>
    `;
  }

  get styles() {
    return `
      lv-map iframe {
        border: 1px solid #ccc !important;
        border-radius: 10px;
      }
    `;
  }
}
customElements.define('lv-map', MapComponent);

export default {
  spec: spec,
  component: MapComponent,
}