import { getType } from './utils.mjs';

export const create = (tag, options) => {
  const element = document.createElement(tag);

  if (options?.classes) {
    options.classes.forEach((_class) => {
      element.classList.add(_class);
    });
  }

  if (options?.attributes) {
    Object.entries(options.attributes).forEach((attribute) => {
      const [key, value] = attribute;
      if (value === undefined) return;
      const valueType = getType(value);
      if (valueType !== 'string') {
        element.setAttribute(key, JSON.stringify(value));
        return;
      }
      element.setAttribute(key, value);
    });
  }

  if (options?.text) {
    element.innerText = options.text;
  }

  if (options?.shadow) {
    options.shadow.mode === 'closed'
      ? element.attachShadow({ mode: 'closed' })
      : element.attachShadow({ mode: 'open' });
  }

  if (options?.to) {
    options.to.append(element);
  }

  return element;
};

export const runSelect = (isSelectAll, selector, options) => {
  const getSelectMethod = (target) => {
    const hasShadowRoot = target?.shadowRoot;
    target = hasShadowRoot ? target.shadowRoot : target;
    if (target instanceof NodeList) {
      target = target[0];
    }
    return isSelectAll
      ? target.querySelectorAll.bind(target)
      : target.querySelector.bind(target);
  };

  return selector.reduce((pre, curr, i) => {
    const isLastElement = i === selector.length - 1;
    const isFirstElement = i === 0;
    if (isLastElement) {
      const target = pre ?? options?.parent ?? document;
      return getSelectMethod(target)(curr);
    }
    if (isFirstElement) {
      const target = options?.parent ?? document;
      return getSelectMethod(target)(curr);
    }
    const target = pre;
    return getSelectMethod(target)(curr);
  }, null);
};

export const select = (selector, options) => {
  return runSelect(false, selector, options);
};

export const selectAll = (selector, options) => {
  return runSelect(true, selector, options);
};

export const getProperty = (target, key, type = 'string') => {
  const value = target.getAttribute(key);
  if (!value) return;
  if (type === 'object') {
    return JSON.parse(value);
  }
  if (type === 'number') {
    return Number(value);
  }
  if (type === 'boolean') {
    return Boolean(value);
  }
  return value;
};

export const setProperty = ({ target, name, value, type = 'string' }) => {
  if (type === 'object') {
    return target?.setAttribute(name, JSON.stringify(value));
  }
  return target?.setAttribute(name, `${value}`);
};

export const insertTemplate = (template, to) => {
  if (to) to.innerHTML = template;
};

export const addStyle = (textContent, target) => {
  const style = document.createElement('style');
  style.textContent = textContent;
  target?.append(style);
};

export const toggleClass = (target, className) => {
  if (!target || !className) return;
  if (target.classList.contains(className)) target.classList.remove(className);
  else target?.classList.add(className);
};

export const addClass = (target, className) => {
  if (!target || !className) return;
  if (!target.classList.contains(className)) target.classList.add(className);
};

export const removeClass = (target, className) => {
  if (!target || !className) return;
  if (target.classList.contains(className)) target.classList.remove(className);
};

export default {
  create,
  select,
  getProperty,
  insertTemplate,
  addStyle,
  toggleClass,
};
