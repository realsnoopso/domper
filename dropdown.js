import {
  select,
  defineElement,
  create,
  setProperty,
  selectAll,
} from './src/index.mjs';

const style = `
  :host {
    flex-grow: 1;

    position: relative;
    width: 100%;
    height: 32px;
  
    background-color: white;
    border: 1px solid #D1D5DB;
    border-radius: 6px;
    box-shadow:
      0px 1px 2px rgba(0, 0, 0, 0.06),
      0px 1px 3px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    cursor: pointer;

    display: inline-flex;
  }

  :host > div#root {
    width: 100%;
    padding-left: 12px;

    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  lago-chart-icon, span, div, button {
    box-sizing: border-box;
  }

  :host > lago-chart-icon {
    position: absolute;
    width: 12px;
    height: 12px;
    top: calc(50% - 6px);
    right: 14px;
    pointer-events: none;
  }

  span {
    width: 33px;
    padding: 4px 6px;
    border-radius: 4px;
    background-color: #F3F4F6;
    color: #374151;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    cursor: pointer;

    display: inline-flex;
    justify-content: center;
  }
  
  span.icon.chart-icon {
    background-color: transparent;
  }

  span.icon {
    width: 24px;
  }

  label {
    font-size: 12px;
    line-height: 16px;
    color: #1F2937;
    cursor: pointer;
    
    white-space: nowrap;
    max-width: 130px;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
  
  label:hover {
    overflow-x: auto;
  }

  label.placeholder {
    color: #9CA3AF;
  }

  div.items {
    position: absolute;
    top: 36px;
    left: 0;
    width: 100%;
    max-height: 500px;
    box-shadow: 0px 4px 8px rgba(28, 37, 44, 0.2);
    background-color: white;
    border: 1px solid #F9FAFB;

    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow-x: hidden;
    overflow-y: auto;

    z-index: 2;
  }

  div.items button {
    width: 100%;
    height: 32px;
    padding: 0 0 0 12px;
    border: none;
    background-color: white;
    cursor: pointer;

    display: flex;
    justify-items: flex-start;
    align-items: center;
    gap: 4px;
  }

  div.items button:hover {
    background-color: rgba(41, 98, 255, 0.08);
  }

  div.items button:active {
    background-color: rgba(41, 98, 255, 0.08);
  }

  div.items button:active label {
    color: #2962FF;
  }

  .hide {
    display: none;
  }
`;

const findItem = (items, value) => {
  for (const item of items) {
    if (item.value === value) {
      return item;
    }
  }

  return null;
};

const renderItem = ({ item, placeholder, hasButton }) => {
  if (item === null) {
    return `<label class='placeholder'>${placeholder}</label>`;
  }

  let span;
  switch (item.type) {
    case 'string':
      span = `<span>abc</span>`;
      break;
    case 'integer':
      span = `<span>123</span>`;
      break;
    case 'float':
      span = `<span>LFD</span>`;
      break;
    case 'boolean':
      span = `<span>Bol</span>`;
      break;
    case 'time':
      span = `<span class="icon"><lago-chart-icon data-props=${JSON.stringify({
        name: 'time-data-type',
      })}></lago-chart-icon></span>`;
      break;
    case 'date':
      span = `<span class="icon"><lago-chart-icon data-props=${JSON.stringify({
        name: 'date-data-type',
      })}></lago-chart-icon></span>`;
      break;
    case 'chart':
      span = `<span class="icon chart-icon"><lago-chart-icon data-props=${JSON.stringify(
        {
          name: `${item.value}-chart`,
          type: item.value,
        }
      )}></lago-chart-icon></span>`;
      break;
    default:
      span = null;
  }

  const label = `<label>${item.value}</label>`;
  let result;

  if (span) {
    result = `
    
      ${span}
      ${label}

    `;
  } else {
    result = `${label}`;
  }
  if (hasButton) return `<button>${result}</button>`;
  return result;
};

defineElement(
  'lago-chart-dropdown-2',
  ({ state, props }) => {
    const renderedItem = renderItem({
      item: findItem(props['data-items'], props.selected),
      placeholder: props.placeholder,
    });

    return `
    <lago-chart-icon data-props=${JSON.stringify({
      name: 'caret',
    })}></lago-chart-icon>
    <div id="root" tabindex="-1">
      ${renderedItem}
    </div>
  `;
  },
  {
    style,
    afterRender: () => {
      const dropdown = select(document.body, [
        'app-element',
        'lago-chart-dropdown-2',
      ]);

      const root = select(dropdown, ['#root']);
      const DELAY = 200;

      root?.addEventListener('click', () => {
        const items = select(dropdown, ['#items']);

        if (items) {
          items.remove();
        } else {
          const itemProps = dropdown._props['data-items'];

          setTimeout(() => {
            create('div', {
              classes: ['items'],
              attributes: { id: 'items' },
              template: `
        ${itemProps
          .map((item) => {
            return renderItem({ item, hasButton: true });
          })
          .join('')}
      `,
              to: dropdown,
            });

            const items = selectAll(dropdown, ['#items', 'button']);
            items.forEach((item) =>
              item.addEventListener('click', handleSelectedChange)
            );
          }, DELAY);
        }
      });

      root?.addEventListener('blur', () => {
        const items = select(dropdown, ['#items']);

        if (items) {
          setTimeout(() => {
            items.remove();
          }, DELAY);
        }
      });

      const handleSelectedChange = (e) => {
        select(e.currentTarget, ['label']).innerText;

        const newProps = {
          ...dropdown._props,
          selected: select(e.currentTarget, ['label']).innerText,
        };
        setProperty(dropdown, { 'data-props': JSON.stringify(newProps) });
      };
    },
  }
);
