# Domper

Introducing Domper, your new companion for effortless and efficient DOM manipulation.

Domper is a lightweight and powerful JavaScript library designed to streamline the process of working with the Document Object Model (DOM). This library provides a set of utility functions, including methods for creating, selecting, and modifying elements, setting and retrieving attributes, and working with Shadow DOM.

With Domper, you can:

- Easily create and wrap DOM elements with specific attributes and text content.
- Select single or multiple elements based on your selector queries, even with Shadow DOM.
- Get and set properties of your selected elements with precision, supporting different data types.
- Insert HTML templates with the add function.
- Seamlessly add a Shadow DOM to your elements with addShadow.
- Effortlessly add styles with addStyle.
- Dynamically toggle, add, and remove classes for your elements.

Domper empowers developers to manage their DOM operations in a more intuitive and concise manner. Start using Domper today and experience the magic of easy DOM manipulation.

# Installation

You can install the library using npm:

```
npm install domper
```

or
```
yarn add domper
```

# Usage

## Import the Library

You can import the entire library or individual functions as needed. Here are two ways to import:

```ts
// Import the entire library
import * as DOMManipulator from 'dom-manipulator';

// Or import individual functions
import { create, select, add } from 'dom-manipulator';
```

## Create an Element

With `create` function, you can easily and efficiently generate DOM elements with various configurations:

```ts
import { create } from 'dom-manipulator';

const div = create({
  tagName: 'div',
  classList: ['myClass1', 'myClass2'],
  attributeList: [
    ['id', 'myId'],
    ['data-test', 'testValue'],
  ],
  text: 'Hello, world!',
});

// This creates a new <div> element with:
//  - Classes 'myClass1' and 'myClass2'
//  - An ID of 'myId'
//  - A 'data-test' attribute with value 'testValue'
//  - Text content 'Hello, world!'
```

## Get an Attribute

You can get the value of an attribute from an element using the `getProperty` function:

```ts
import { getProperty } from 'dom-manipulator';

const id = getProperty({
  target: element,
  name: 'id',
});
```

Or you can retrieve attribute values from a DOM element and automatically convert them into different types based on your needs:

```ts
import { getProperty } from 'dom-manipulator';

const dataNumber = getProperty({
  target: element,
  name: 'data-number',
  type: 'number',
});
// 'dataNumber' is a number

const dataBoolean = getProperty({
  target: element,
  name: 'data-boolean',
  type: 'boolean',
});
// 'dataBoolean' is a boolean

const dataObject = getProperty({
  target: element,
  name: 'data-object',
  type: 'object',
});
// 'dataObject' is an object
```

## Set an Attribute

You can set the value of an attribute of an element using the setProperty function:

```ts
Copy code
import { setProperty } from 'dom-manipulator';

setProperty({
  target: element,
  name: 'id',
  value: 'newId'
});
```

When setting an attribute using `setProperty` function, if you specify `type` as `object`, it will automatically convert the value to a JSON string:

```ts
import { setProperty } from 'dom-manipulator';

setProperty({
  target: element,
  name: 'data',
  value: { key: 'value' },
  type: 'object',
});

// Now the 'data' attribute of the element contains '{"key":"value"}'
```

## Select an Element

The `select` function can be used to select a single element. If you pass an array of selectors, it will select the last one in the array:

```ts
import { select } from 'dom-manipulator';

// Select a single element by id
const myElement = select({ selector: ['#myElement'] });

// If '#myElement' has a shadow DOM containing '#innerElement', the following will select '#innerElement'
const innerElement = select({ selector: ['#myElement', '#innerElement'] });
```

## Select Multiple Elements

The `selectAll` function can be used to select multiple elements that match the final selector in the provided array. It returns a NodeList of all matching elements:

```ts
import { selectAll } from 'dom-manipulator';

// Select all elements with class 'myClass'
const myElements = selectAll({ selector: ['.myClass'] });

// If '#myElement' has a shadow DOM containing elements with class 'innerClass', the following will select all '.innerClass' elements
const innerElements = selectAll({ selector: ['#myElement', '.innerClass'] });
```

## Add HTML to an Element

You can add HTML content to an element using the `add` function:

```ts
import { add } from 'dom-manipulator';

add({
  target: element,
  template: '<p>Hello, World!</p>',
});
```

You can also add an HTML template to a shadow DOM using the `add` function:

```ts
import { addShadow, add } from 'dom-manipulator';

// Add a shadow root to an element
const shadowRoot = addShadow({ target: element });

// Add an HTML template to the shadow root
add({
  target: shadowRoot,
  template: '<p>Hello, Shadow DOM!</p>',
});
```

## Add a Shadow Root to an Element

You can add a shadow root to an element using the `addShadow` function:

```ts
import { addShadow } from 'dom-manipulator';

addShadow({
  target: element,
});
```

## Add a Style Element

You can add a style element to an element (or a shadow root) using the `addStyle` function:

```ts
import { addStyle } from 'dom-manipulator';

const style = document.createElement('style');
style.textContent = '.myClass { color: red; }';
addStyle({
  target: element,
  style: style,
});
```

## Toggle, Add, and Remove Classes

You can toggle, add, or remove a class from an element using the `toggleClass`, `addClass`, and `removeClass` functions, respectively:

```ts
import { toggleClass, addClass, removeClass } from 'dom-manipulator';

toggleClass({
  target: element,
  className: 'myClass',
});

addClass({
  target: element,
  className: 'anotherClass',
});

removeClass({
  target: element,
  className: 'myClass',
});
```

## License

This project is licensed under the MIT License.
