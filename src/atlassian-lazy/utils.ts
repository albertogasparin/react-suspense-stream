import { COLLECTED } from './constants';

declare const __webpack_require__: (id: string) => any;
declare const __webpack_modules__: { [key: string]: any };

export const tryRequire = (id: string) => {
  if (
    typeof __webpack_require__ === 'function' &&
    typeof __webpack_modules__ === 'object' &&
    __webpack_modules__[id]
  ) {
    try {
      return __webpack_require__(id).default;
    } catch {}
  }
  return null;
};

export const collect = () => {
  const markers = document.querySelectorAll('input[data-lazy-begin]');
  for (let i = 0, j = markers.length; i < j; i += 1) {
    const fragment = document.createElement('div');
    let el = markers[i] as any;
    const { lazyBegin } = el.dataset || {};
    while ((el = el.nextSibling)) {
      if (el.dataset && el.dataset.lazyEnd === lazyBegin) break;
      fragment.appendChild(el);
      // if not use el.outerHTML || el.textContent
    }
    COLLECTED.set(lazyBegin, Array.from(fragment.childNodes));
  }
};

export const displayNameFromId = (id: string) => {
  const fName = id
    .split('/')
    .slice(-3)
    .join('/');
  return fName || 'Component';
};
