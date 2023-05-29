export function create({ tagName, classList, attributeList, text }) {
  const element = document.createElement(tagName);
  if (classList)
    classList.forEach((_class) => {
      element.classList.add(_class);
    });
  if (attributeList)
    attributeList.forEach((_attribute) => {
      const [key, value] = _attribute;
      element.setAttribute(key, value);
    });
  if (text) {
    element.innerText = text;
  }
  return element;
}

export function select({ selector, parent = null }) {
  return selector.reduce((pre, curr, i) => {
    if (i === 0) {
      const hasShadowRoot = parent?.shadowRoot;
      return parent
        ? hasShadowRoot
          ? parent.shadowRoot.querySelector(curr)
          : parent.querySelector(curr)
        : document.querySelector(curr);
    }
    const hasShadowRoot = pre?.shadowRoot;
    return hasShadowRoot
      ? pre.shadowRoot.querySelector(curr)
      : pre.querySelector(curr);
  }, null);
}

export function selectAll({ selector, parent }) {
  return selector.reduce((pre, curr, i) => {
    if (i === selector.length - 1) {
      const target = pre ?? parent ?? document;
      const hasShadowRoot = target?.shadowRoot;
      return hasShadowRoot
        ? target.shadowRoot.querySelectorAll(curr)
        : target.querySelectorAll(curr);
    }
    if (i === 0) {
      const hasShadowRoot = parent?.shadowRoot;
      return parent
        ? hasShadowRoot
          ? parent.shadowRoot.querySelector(curr)
          : parent.querySelector(curr)
        : document.querySelector(curr);
    }
    const hasShadowRoot = pre?.shadowRoot;
    return hasShadowRoot
      ? pre.shadowRoot.querySelector(curr)
      : pre.querySelector(curr);
  }, null);
}

export function getProperty({ target, name, type = 'string' }) {
  if (!target?.hasAttribute(name)) return null;
  const value = target.getAttribute(name);
  if (!value) return;
  if (type === 'object') {
    return JSON.parse(value);
  }
  if (type === 'number') {
    return Number(value);
  }
  if (type === 'boolean') {
    return Boolean(Number(value));
  }
  return value;
}

export function setProperty({ target, name, value, type = 'string' }) {
  if (type === 'object') {
    return target?.setAttribute(name, JSON.stringify(value));
  }
  return target?.setAttribute(name, `${value}`);
}

export function insertTemplate({ target, template }) {
  if (target) target.innerHTML = template;
}

export function addShadow({ target }) {
  if (target) return target.attachShadow({ mode: 'open' });
}

export function addStyle({ target, style }) {
  target?.append(style);
}

export const toggleClass = ({ target = null, className = '' }) => {
  if (!target) return;
  if (target.classList.contains(className)) target.classList.remove(className);
  else target?.classList.add(className);
};

export const addClass = ({ target = null, className = '' }) => {
  if (!target) return;
  if (!target.classList.contains(className)) target.classList.add(className);
};

export const removeClass = ({ target = null, className = '' }) => {
  if (!target) return;
  if (target.classList.contains(className)) target.classList.remove(className);
};

export default {
  create,
  select,
  getProperty,
  insertTemplate,
  addShadow,
  addStyle,
  toggleClass,
};
