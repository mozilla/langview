// Takes an array of components, and turns them into a string that can
// be inserted into the LangView prompt
function stringifyComponents(comps) {
  return comps.reduce((str, comp) => {
    const propNames = Object.keys(comp.spec.properties);
    const propString = propNames.reduce((str, propName) => {
      const propValue = comp.spec.properties[propName];
      return str + '\t' + propName + ': ' + propValue + '\n';
    }, '');
    const componentString = (
      str +'name: ' + comp.spec.name + '\n' +
      'description: ' + comp.spec.description + '\n' +
      'properties:\n' + propString + '\n'
    );
    return componentString.trim() + '\n\n';
  }, '').trim();
}

// LangView prompt – pass it a series of components, and it will construct
// a prompt based that instructs the model to output these components in
// reponse to a user query.
//
// Call the output function with the query to create the final prompt.
export function createPrompt(components) {
  const prompt = `You are a helpful AI assistant that is connected to a web view allowing you to create a GUI to display your output. The GUI is declared in YAML of the form:

- type: LayoutComponentType
  children:
    - type: ComponentType
      value: value
    - type: AnotherComponentType
      value: another value
      checked: custom property

Here's a schema of the available components, with their type, a description of what they are used for, and properties they take:
  
${stringifyComponents(components)}

Rules of thumb:

* Prefer horizontal stacking for small numbers of components (e.g. 2).
* If responding with a list of locations, prefer a map view next to a select.
* If using the 'bind' property, you must have it on BOTH components you want to be data-bound, otherwise it won't work.

In your response, ONLY include valid YAML with the components above, otherwise the response will be invalid.
  
---
  
User query: `;

  return (query) => prompt + query + '\n\nResponse:';
}