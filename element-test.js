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

defineElement('counter-element', (props, state) => {
  return `
    <div>
      <h1>Count: ${props.count}</h1>
      <button id="increment">Increment</button>
      <button id="decrement">Decrement</button>
    </div>
  `;
});

defineElement('app-element', (props, state) => {
  return `
  <counter-element data-props=${JSON.stringify({ count: state.count })}>
  </counter-element>
  `;
});

const appElement = create('app-element', {
  to: document.body,
  state: { count: 0 },
});

const handleClick = (e) => {
  if (e.target.id === 'increment') {
    appElement.setState({ count: appElement._state.count + 1 });
  }
  if (e.target.id === 'decrement') {
    appElement.setState({ count: appElement._state.count - 1 });
  }
};

appElement.addEventListener('click', handleClick);
