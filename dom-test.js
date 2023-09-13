import {
  create,
  getProperty,
  setProperty,
  insertTemplate,
  select,
  selectAll,
  addStyle,
  toggleClass,
  removeClass,
  addClass,
  defineElement,
} from './src/index.mjs';

defineElement('counter-element', (state, props, setState) => {
  return `
    <div>
      <h1>Count: ${state.count}</h1>
      <button id="increment">Increment</button>
      <button id="decrement">Decrement</button>
    </div>
  `;
});

const counterElement = create('counter-element', {
  to: document.body,
});
counterElement.setState('count', 0);
const increment = () => {
  counterElement.setState('count', counterElement.getState().count + 1);
};
counterElement.addEventListener('click', increment);

const div = create('h1', {
  to: document.body,
  classes: ['myClass1', 'myClass2'],
  attributes: {
    id: 'myId',
    a: undefined,
    b: true,
    c: 1,
    d: { object: true },
  },
  text: 'Create H1: Hello, world!',
});

create('p', {
  to: document.body,
  text: `GetProperty from H1: data's value is ${getProperty(
    div,
    'b',
    'boolean'
  )}`,
});

create('p', {
  to: document.body,
  text: `Select H1: ${select(['#myId']).tagName} is selected`,
});

const newElement = create('div', {
  to: document.body,
  attributes: { id: 'new-element' },
  shadow: true,
});

create('p', {
  to: newElement.shadowRoot,
  attributes: { id: 'text-in-shadow' },
  text: `I'm a text in shadowRoot!`,
});

create('p', {
  to: document.body,
  text: `Select p: ${select(['#new-element', 'p']).id} is selected`,
});

const shadowDiv = create('div', { to: document.body, shadow: true });
const container = create('div', {
  to: shadowDiv.shadowRoot,
  attributes: { id: 'container' },
});
create('button', { to: container, text: 'button' });
create('button', { to: container, text: 'button' });
create('button', { to: container, text: 'button' });
create('p', {
  to: document.body,
  text: `Select buttons: ${
    selectAll(['#container', 'button'], { parent: shadowDiv }).length
  } is selected`,
});

const shadowDiv2 = create('div', {
  to: document.body,
  shadow: true,
});

addStyle(`p {color: red;}`, shadowDiv2.shadowRoot);

create('p', {
  to: shadowDiv2.shadowRoot,
  text: 'color test',
});

addStyle(
  `.green {color: green;} .blue {color: blue;} .purple {color: purple}`,
  document.body
);

const green = create('p', {
  to: document.body,
  classes: ['green'],
  text: `I'm green. Click me to toggle the color!`,
});

const changeColor = (e) => {
  toggleClass(e.currentTarget, 'green');
};

green.addEventListener('click', changeColor);

const blue = create('p', {
  to: document.body,
  classes: ['blue'],
  text: `Remove 'blue' class!`,
});

const removeColor = (e) => {
  removeClass(e.currentTarget, 'blue');
};

blue.addEventListener('click', removeColor);

const purple = create('p', {
  to: document.body,
  text: `Add 'purple' class!`,
});

const addColor = (e) => {
  addClass(e.currentTarget, 'purple');
};

purple.addEventListener('click', addColor);
