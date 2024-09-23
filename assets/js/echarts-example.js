"use strict";

/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};
var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};
var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};
var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};
var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};

/* ----------------------------- Colors function ---------------------------- */

var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue;
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};
var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};

/* --------------------------------- Colors --------------------------------- */

var getColor = function getColor(name) {
  var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
  return getComputedStyle(dom).getPropertyValue("--brainwaveio-".concat(name)).trim();
};
var getColors = function getColors(dom) {
  return {
    primary: getColor('primary', dom),
    secondary: getColor('secondary', dom),
    success: getColor('success', dom),
    info: getColor('info', dom),
    warning: getColor('warning', dom),
    danger: getColor('danger', dom),
    light: getColor('light', dom),
    dark: getColor('dark', dom),
    white: getColor('white', dom),
    black: getColor('black', dom),
    emphasis: getColor('emphasis-color', dom)
  };
};
var getSubtleColors = function getSubtleColors(dom) {
  return {
    primary: getColor('primary-bg-subtle', dom),
    secondary: getColor('secondary-bg-subtle', dom),
    success: getColor('success-bg-subtle', dom),
    info: getColor('info-bg-subtle', dom),
    warning: getColor('warning-bg-subtle', dom),
    danger: getColor('danger-bg-subtle', dom),
    light: getColor('light-bg-subtle', dom),
    dark: getColor('dark-bg-subtle', dom)
  };
};
var getGrays = function getGrays(dom) {
  return {
    100: getColor('gray-100', dom),
    200: getColor('gray-200', dom),
    300: getColor('gray-300', dom),
    400: getColor('gray-400', dom),
    500: getColor('gray-500', dom),
    600: getColor('gray-600', dom),
    700: getColor('gray-700', dom),
    800: getColor('gray-800', dom),
    900: getColor('gray-900', dom),
    1000: getColor('gray-1000', dom),
    1100: getColor('gray-1100', dom)
  };
};
var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};
var addClass = function addClass(el, className) {
  el.classList.add(className);
};
var removeClass = function removeClass(el, className) {
  el.classList.remove(className);
};
var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};
function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
  return vertInView && horInView;
}
var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};
var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;
  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }
  return breakpoint;
};
var getSystemTheme = function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/* --------------------------------- Cookie --------------------------------- */

var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};
var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};
var settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};
/* ---------------------------------- Store --------------------------------- */

var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};
var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};
var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};

/* get Dates between */

var getDates = function getDates(startDate, endDate) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
  var duration = endDate - startDate;
  var steps = duration / interval;
  return Array.from({
    length: steps + 1
  }, function (v, i) {
    return new Date(startDate.valueOf() + interval * i);
  });
};
var getPastDates = function getPastDates(duration) {
  var days;
  switch (duration) {
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 365;
      break;
    default:
      days = duration;
  }
  var date = new Date();
  var endDate = date;
  var startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
  return getDates(startDate, endDate);
};

/* Get Random Number */
var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var utils = {
  docReady: docReady,
  breakpoints: breakpoints,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  getColor: getColor,
  getColors: getColors,
  getSubtleColors: getSubtleColors,
  getGrays: getGrays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace,
  getDates: getDates,
  getPastDates: getPastDates,
  getRandomNumber: getRandomNumber,
  removeClass: removeClass,
  getSystemTheme: getSystemTheme
};