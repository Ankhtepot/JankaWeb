// src/polyfills.ts

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Polyfill for `window.scrollY` in browsers that do not support it (like IE).
 */
if (typeof window.scrollY === "undefined") {
  Object.defineProperty(window, 'scrollY', {
    get: function() {
      return window.pageYOffset;
    }
  });
}
