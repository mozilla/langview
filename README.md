# LangView

While large language models are increasing in their breadth of utility &mdash; with new models emerging, support for plugins, and agent-based behaviour through chaining &mdash; their responses are still limited largely to text. How sad!

LangView is an open-source GUI layer for large language models, that uses a set of conventions allowing models to respond in YAML which can then be interpreted as live GUI components.

LangView ships with a default set of simple & flexible components, which can be extended upon to suit any specific domain.

## Goals

- **Platform & language agnostic:** LangView is designed to work with any GUI implementation of its components. The model only needs to know a YAML schema of the components it has to work with, and the rest can be implemented by the component library.
- **Model agnostic:** As long as a model can follow the structured format of LangView's spec, it can output GUIs.
- **Extendable:** Components can easily be extended and passed to LangView, to broaden & customise a model's graphical vocabulary.
- **Controllable:** While it's possible for language models to write code describing an arbitrary interface, LangView aims to offer a set of constraints so designers can control the space of allowed interfaces.

## Components

Components are defined in an implementation-agnostic YAML specification files in `/components`, and then can be implemented for any architecture.

Specification format is as follows:

```yaml
name: ... # Component name
description: ... # Natural language description of the component, for the model to determine its behaviour
properties:
  my-property: ... # Natural langauge description of each property you'd like the model to be able to set for this component (type & behaviour)
```

Currently, the only implemnentation is for the web, with a minimal set of components:

- HStack / VStack
- Card
- Map
- Select

## Caveats

This is an experimental, demo-stage project to explore how generative UI might be standardized. You'll likely find the model requires experimentation with prompting & component descriptions to get desired results. Please file an issue or pull request if you'd like to work on making this more robust, or exploring a production use case.

## Demo

To run the demo, add a `.env` file in `/demo` with your Google Maps API key:

```
VITE_GOOGLE_MAPS_API_KEY="your_google_maps_api_key_here"
```

Then run `npm run build` in the `/demo` folder, enter your OpenAI API key in the webpage that opens, and test out a request.
