import { addStyle, select } from './index.mjs';

export function defineElement(tagName, componentFn, { style, afterRender }) {
  class FunctionalElement extends HTMLElement {
    constructor() {
      super();
      this._state = {};
      this._props = {};
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      for (const attribute of this.attributes) {
        this._props[attribute.name] = attribute.value;
      }

      style && addStyle(style, this.shadowRoot);
      this.update();
    }

    static get observedAttributes() {
      return ['data-props'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data-props') {
        try {
          this._props = JSON.parse(newValue);
        } catch (e) {
          console.error('Error parsing data-props attribute:', e);
        }
        this.update();
      }
    }

    update() {
      const template = componentFn({
        state: this._state,
        props: this._props,
        setState: this.setState.bind(this),
      });

      if (style) {
        const styleElement = select(this.shadowRoot, ['style']);

        Array.from(this.shadowRoot.children).forEach((child) => {
          if (child.tagName.toLowerCase() !== 'style') {
            this.shadowRoot.removeChild(child);
          }
        });
        styleElement.insertAdjacentHTML('afterend', template);
      } else {
        this.shadowRoot.innerHTML = template;
      }

      afterRender();
    }

    getState() {
      return state;
    }

    setState(newState) {
      this._state = { ...this._state, ...newState };
      this.update();
    }
  }

  customElements.define(tagName, FunctionalElement);
}
