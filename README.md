# Domper

Introducing Domper, your new companion for effortless and efficient DOM manipulation and Web Components creation.

## Features

- **Effortless DOM Manipulation**: Create, select, and modify DOM elements with a simple API.
- **Web Components**: Quickly define and manage custom elements with `defineElement`.
  
## Installation

```bash
npm install domper
```

or

```bash
yarn add domper
```

## Basic Usage

### Import the Library

```js
// Import the entire library
import * as Domper from 'domper';

// Or import individual functions
import { defineElement, create } from 'domper';
```

### Define a Custom Element with `defineElement`

Easily create Web Components using the `defineElement` function.

#### Example

```js
import { defineElement } from 'domper';

defineElement('my-element', ({ props }) => {
  return `<div>${props.text}</div>`;
}, {
  style: '.my-element { color: red; }',
  afterRender: () => { console.log('Component has been rendered'); }
});
```

#### Parameters

- `tagName` (String): The name of the custom element.
- `componentFn` (Function): A function that returns the HTML template.

#### Options

- `style` (String): CSS styles.
- `afterRender` (Function): A function called after the component is rendered.

#### Usage

```html
<my-element data-props='{"text": "Hello, world!"}'></my-element>
```

### Accessing and Modifying `props` and `state`

#### Get and Set `props`

```js
// Get current props
const myElement = document.querySelector('my-element');
const currentProps = JSON.parse(myElement.getAttribute('data-props'));

// Set new props
const newProps = { text: 'New text!' };
myElement.setAttribute('data-props', JSON.stringify(newProps));
```

#### Get and Set `state` 

State is managed internally and can be set using `setState` within the `componentFn`.

```js
defineElement('my-element', ({ state, setState }) => {
  // Set new state
  setState({ count: state.count + 1 });

  // Your render logic
  return `<div>${state.count}</div>`;
});
```

### Create an Element (`create`)

Create new DOM elements with optional configurations.

#### Example

```js
import { create } from 'domper';

const newDiv = create('div', {
  classes: ['myClass1', 'myClass2'],
  attributes: { id: 'myId', 'data-test': 'testValue' },
  text: 'Hello, world!'
});

// This creates a new <div> element with:
//  - Classes 'myClass1' and 'myClass2'
//  - An ID of 'myId'
//  - A 'data-test' attribute with value 'testValue'
//  - Text content 'Hello, world!'
```

#### Parameters

- `tag` (String): The tag name of the element.
- `options` (Object): Optional configurations like classes, attributes, text, shadow root, and more.

### Select Element (`select` and `selectAll`)

Select single or multiple elements based on your selector queries.

#### Example

```js
import { select, selectAll } from 'domper';

const myElement = select(document.body, ['#myElement']);
const allElements = selectAll(document.body, ['.myClass']);
```

#### Parameters

- `parent` (HTMLElement | ShadowRoot): The parent element or shadow root to search within.
- `selector` (Array): An array of selectors to be used for searching.

### Get and Set Property (`getProperty` and `setProperty`)

Retrieve and set properties of DOM elements, supporting different data types.

#### Example

```js
import { getProperty, setProperty } from 'domper';

// Get a property
const id = getProperty(element, 'id');

// Set a property
setProperty(element, { id: 'newId' });
```

#### Parameters

- `target` (HTMLElement | ShadowRoot): Target element or shadow root.
- `properties` (Object): An object containing key-value pairs for setting properties.
- `type` (String): Optional type for value conversion (e.g., 'object', 'number').

### Insert Template (`insertTemplate`)

Insert an HTML template into a target element.

#### Example

```js
import { insertTemplate } from 'domper';

insertTemplate('<p>Hello, world!</p>', element);
```

### Add Style (`addStyle`)

Add a style element to a target element.

#### Example

```js
import { addStyle } from 'domper';

addStyle('.myClass { color: red; }', element);
```

### Toggle, Add, and Remove Classes (`toggleClass`, `addClass`, `removeClass`)

Toggle, add, or remove a class from an element.

#### Example

```js
import { toggleClass, addClass, removeClass } from 'domper';

toggleClass(element, 'myClass');
addClass(element, 'anotherClass');
removeClass(element, 'myClass');
```

## License

This project is licensed under the [MIT License](LICENSE).