import { addStyle, select } from './index.mjs';
import { deepCopy } from './utils.mjs';

export function defineElement(tagName, componentFn, options) {
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

      options?.style && addStyle(options.style, this.shadowRoot);
      this.update();
    }

    static get observedAttributes() {
      return ['data-props'];
    }

    attributeChangedCallback(name, _, newValue) {
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

      if (options?.style) {
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

      if (options?.afterRender) options.afterRender();
    }

    setState(newState) {
      this._state = { ...this._state, ...deepCopy(newState) };
      this.update();
    }
  }

  customElements.define(tagName, FunctionalElement);
}
