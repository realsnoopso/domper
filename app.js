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

const temp = [
  { type: 'string', value: 'string' },
  { type: 'integer', value: 'integer' },
  { type: 'float', value: 'Long/Float/Double' },
  { type: 'boolean', value: 'Boolean' },
  { type: 'time', value: 'Time' },
  { type: 'date', value: 'Date' },
];

defineElement('app-element', ({ state, props }) => {
  return `
    <div>
      <lago-chart-dropdown-2 data-props=${JSON.stringify({
        placeholder: '플레이스홀더',
        'data-items': temp,
      })}></lago-chart-dropdown-2>
    </div>
  `;
});
