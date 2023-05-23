const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const apiKeyElem = document.querySelector('#apikey');
const submitButton = document.querySelector('#apikey-submit');
const queryElem = document.querySelector('demo-query');
const viewSection = document.querySelector('.view-section');
const viewElem = document.querySelector('lang-view');
const dialogelem = document.querySelector('.apikey-dialog');

viewElem.setAttribute('google-maps-api-key', GOOGLE_MAPS_API_KEY);

submitButton.addEventListener('click', () => {
  if (!apiKeyElem.value) return;
  queryElem.setAttribute('openai-api-key', apiKeyElem.value);
  dialogelem.style.visibility = 'hidden';
});

document.addEventListener('markup', (e) => {
  console.log(e.detail);
  // viewSection.style.display = 'block';
  viewElem.markup = e.detail;
});

function authorize(key) {
  queryElem.setAttribute('openai-api-key', e.target.value);
}