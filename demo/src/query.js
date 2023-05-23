import { createPrompt } from '@lang-view/core';
import { View, VStack, HStack, Card, Map, Select } from '@lang-view/web-components';

class DemoQuery extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async handleSubmit(e) {
    e.preventDefault();
    const input = this.querySelector('input[type="text"]');
    const query = input.value;
    input.value = '';
    const markup = await this.requestCompletion(query);
    const newEvent = new CustomEvent('markup', { bubbles: true, detail: markup });
    this.dispatchEvent(newEvent);
  }

  async requestCompletion(query) {
    const apiKey = this.getAttribute('openai-api-key');
    if (!apiKey) alert("Please enter an OpenAI API key.")
    
    const input = this.querySelector('input[type="text"]');
    input.disabled = true;
    input.placeholder = 'Please wait...'

    const withView = createPrompt([VStack, HStack, Card, Map, Select]);
    const prompt = withView(query);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
    const body = JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 200,
      temperature: 0,
    });
    const options = { method: 'POST', headers, body };

    const res = await fetch('https://api.openai.com/v1/completions', options);
    const json = await res.json();

    input.disabled = false;
    input.placeholder = 'Type a prompt, then hit enter to see results...'
    return json.choices[0].text;
  }

  render() {
    this.innerHTML = this.template;
    this.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  get template() {
    return `
      <form>
        <input type="text" value="" placeholder="Type a prompt, then hit enter to see results...">
        <input type="submit" value="Enter">
      </form>
    `;
  }
}

customElements.define('demo-query', DemoQuery);
