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

const Caret = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57613 4.57613C3.81044 4.34181 4.19034 4.34181 4.42465 4.57613L6.00039 6.15186L7.57613 4.57613C7.81044 4.34181 8.19034 4.34181 8.42465 4.57613C8.65897 4.81044 8.65897 5.19034 8.42465 5.42465L6.42465 7.42465C6.19034 7.65897 5.81044 7.65897 5.57613 7.42465L3.57613 5.42465C3.34181 5.19034 3.34181 4.81044 3.57613 4.57613Z" fill="#6B7280"/>
</svg>
`;

const getIcon = (name) => {
  switch (name) {
    case 'caret':
      return Caret;
    default:
      return '';
  }
};

defineElement('lago-chart-icon', ({ state, props }) => {
  let icon = getIcon(props.name);
  if (props.fill) icon = icon.replace(/fill=\".+\"/g, `fill="${props.fill}"`);
  return icon;
});
