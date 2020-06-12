/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
var findBtn = document.querySelector('.selector-find');
var nextBtn = document.querySelector('.selector-next');
var prevBtn = document.querySelector('.selector-prev');
var topBtn = document.querySelector('.nav-top');
var bottomBtn = document.querySelector('.nav-bottom');
var leftBtn = document.querySelector('.nav-left');
var rightBtn = document.querySelector('.nav-right');
var elArr = [];
var current = 0;
var style = document.createElement('style');
var target;
var arrOfChildren = [];
style.type = 'text/css';
style.innerHTML = '.selected { outline: solid red 5px; background-color: lightblue; }';
document.getElementsByTagName('head')[0].appendChild(style);

function checkTarget(who) {
  if (who.getElementsByTagName('*').length > 0) bottomBtn.removeAttribute('disabled');else bottomBtn.setAttribute('disabled', 'disabled');

  if (document.body === who) {
    rightBtn.setAttribute('disabled', 'disabled');
    leftBtn.setAttribute('disabled', 'disabled');
    topBtn.setAttribute('disabled', 'disabled');
    return;
  }

  if (who.parentElement) topBtn.removeAttribute('disabled');else topBtn.setAttribute('disabled', 'disabled');
  arrOfChildren = Object.values(who.parentElement.children);
  arrOfChildren = arrOfChildren.filter(function (e) {
    return e.tagName !== 'BR';
  });
  if (arrOfChildren.indexOf(who) < arrOfChildren.length - 1) rightBtn.removeAttribute('disabled');else rightBtn.setAttribute('disabled', 'disabled');
  if (arrOfChildren.indexOf(who) > 0) leftBtn.removeAttribute('disabled');else leftBtn.setAttribute('disabled', 'disabled');
}

document.querySelector('.jsbursa-panel').addEventListener('click', function (event) {
  if (event.target === findBtn) {
    current = 0;
    topBtn.setAttribute('disabled', 'disabled');
    leftBtn.setAttribute('disabled', 'disabled');
    rightBtn.setAttribute('disabled', 'disabled');
    bottomBtn.setAttribute('disabled', 'disabled');
    prevBtn.setAttribute('disabled', 'disabled');
    nextBtn.setAttribute('disabled', 'disabled');
    if (target) target.classList.remove('selected');
    elArr.forEach(function (el) {
      return el.classList.remove('selected');
    });
    var s = document.querySelector('.selector').value;
    elArr = document.querySelectorAll(s);
    if (elArr.length === 0) return;
    elArr[0].classList.add('selected');
    target = elArr[0];

    if (elArr.length > 1) {
      nextBtn.removeAttribute('disabled');
    }

    checkTarget(target);
    return;
  }

  if (event.target === prevBtn) {
    nextBtn.removeAttribute('disabled');
    elArr[current].classList.remove('selected');
    current -= 1;
    elArr[current].classList.add('selected');
    target = elArr[current];
    if (current < 1) prevBtn.setAttribute('disabled', 'disabled');
    checkTarget(target);
    return;
  }

  if (event.target === nextBtn) {
    prevBtn.removeAttribute('disabled');
    elArr[current].classList.remove('selected');
    current += 1;
    elArr[current].classList.add('selected');
    target = elArr[current];
    if (current >= elArr.length - 1) nextBtn.setAttribute('disabled', 'disabled');
    checkTarget(target);
    return;
  }

  if (event.target.classList[0].includes('nav-')) {
    nextBtn.setAttribute('disabled', 'disabled');
    prevBtn.setAttribute('disabled', 'disabled');
    target.classList.remove('selected');
  } else return;

  if (event.target === topBtn) {
    target = target.parentElement;
  } else if (event.target === bottomBtn) {
    target = target.children[0];
  } else if (event.target === leftBtn) {
    target = arrOfChildren[arrOfChildren.indexOf(target) - 1];
    target.classList.add('selected');
  } else if (event.target === rightBtn) {
    target = arrOfChildren[arrOfChildren.indexOf(target) + 1];
    target.classList.add('selected');
  }

  target.classList.add('selected');
  checkTarget(target);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImZpbmRCdG4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJuZXh0QnRuIiwicHJldkJ0biIsInRvcEJ0biIsImJvdHRvbUJ0biIsImxlZnRCdG4iLCJyaWdodEJ0biIsImVsQXJyIiwiY3VycmVudCIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsInRhcmdldCIsImFyck9mQ2hpbGRyZW4iLCJ0eXBlIiwiaW5uZXJIVE1MIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsImNoZWNrVGFyZ2V0Iiwid2hvIiwibGVuZ3RoIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiYm9keSIsInBhcmVudEVsZW1lbnQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJjaGlsZHJlbiIsImZpbHRlciIsImUiLCJ0YWdOYW1lIiwiaW5kZXhPZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZvckVhY2giLCJlbCIsInMiLCJ2YWx1ZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGQiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlD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U0FBUCxDQUFpQk8sR0FBakIsQ0FBcUIsVUFBckI7QUFDQXZCLGFBQVcsQ0FBQ04sTUFBRCxDQUFYO0FBQ0QsQ0E3REQsRSIsImZpbGUiOiJtYWluLmM4NTFmNmJjNjI3ZWNkZTc1MTVkLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyogZXNsaW50IHByZWZlci1kZXN0cnVjdHVyaW5nOiBbXCJlcnJvclwiLCB7VmFyaWFibGVEZWNsYXJhdG9yOiB7b2JqZWN0OiB0cnVlfX1dICovXG5jb25zdCBmaW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yLWZpbmQnKTtcbmNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3ItbmV4dCcpO1xuY29uc3QgcHJldkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rvci1wcmV2Jyk7XG5jb25zdCB0b3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXRvcCcpO1xuY29uc3QgYm90dG9tQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1ib3R0b20nKTtcbmNvbnN0IGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWxlZnQnKTtcbmNvbnN0IHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1yaWdodCcpO1xubGV0IGVsQXJyID0gW107XG5sZXQgY3VycmVudCA9IDA7XG5jb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5sZXQgdGFyZ2V0O1xubGV0IGFyck9mQ2hpbGRyZW4gPSBbXTtcbnN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuc3R5bGUuaW5uZXJIVE1MID0gJy5zZWxlY3RlZCB7IG91dGxpbmU6IHNvbGlkIHJlZCA1cHg7IGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTsgfSc7XG5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcbmZ1bmN0aW9uIGNoZWNrVGFyZ2V0KHdobykge1xuICBpZiAod2hvLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykubGVuZ3RoID4gMCkgYm90dG9tQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgZWxzZSBib3R0b21CdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICBpZiAoZG9jdW1lbnQuYm9keSA9PT0gd2hvKSB7XG4gICAgcmlnaHRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIGxlZnRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIHRvcEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh3aG8ucGFyZW50RWxlbWVudCkgdG9wQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgZWxzZSB0b3BCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICBhcnJPZkNoaWxkcmVuID0gT2JqZWN0LnZhbHVlcyh3aG8ucGFyZW50RWxlbWVudC5jaGlsZHJlbik7XG4gIGFyck9mQ2hpbGRyZW4gPSBhcnJPZkNoaWxkcmVuLmZpbHRlcihlID0+IGUudGFnTmFtZSAhPT0gJ0JSJyk7XG4gIGlmIChhcnJPZkNoaWxkcmVuLmluZGV4T2Yod2hvKSA8IGFyck9mQ2hpbGRyZW4ubGVuZ3RoIC0gMSkgcmlnaHRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICBlbHNlIHJpZ2h0QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgaWYgKGFyck9mQ2hpbGRyZW4uaW5kZXhPZih3aG8pID4gMCkgbGVmdEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIGVsc2UgbGVmdEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG59XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNidXJzYS1wYW5lbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRhcmdldCA9PT0gZmluZEJ0bikge1xuICAgIGN1cnJlbnQgPSAwO1xuICAgIHRvcEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgbGVmdEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgcmlnaHRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIGJvdHRvbUJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgcHJldkJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgbmV4dEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgaWYgKHRhcmdldCkgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgZWxBcnIuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcblxuICAgIGNvbnN0IHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3InKS52YWx1ZTtcbiAgICBlbEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocyk7XG4gICAgaWYgKGVsQXJyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGVsQXJyWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgdGFyZ2V0ID0gZWxBcnJbMF07XG4gICAgaWYgKGVsQXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgIG5leHRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgICBjaGVja1RhcmdldCh0YXJnZXQpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcmV2QnRuKSB7XG4gICAgbmV4dEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgZWxBcnJbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICBjdXJyZW50IC09IDE7XG4gICAgZWxBcnJbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB0YXJnZXQgPSBlbEFycltjdXJyZW50XTtcbiAgICBpZiAoY3VycmVudCA8IDEpIHByZXZCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIGNoZWNrVGFyZ2V0KHRhcmdldCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudC50YXJnZXQgPT09IG5leHRCdG4pIHtcbiAgICBwcmV2QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICBlbEFycltjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIGN1cnJlbnQgKz0gMTtcbiAgICBlbEFycltjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIHRhcmdldCA9IGVsQXJyW2N1cnJlbnRdO1xuICAgIGlmIChjdXJyZW50ID49IGVsQXJyLmxlbmd0aCAtIDEpIG5leHRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIGNoZWNrVGFyZ2V0KHRhcmdldCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0WzBdLmluY2x1ZGVzKCduYXYtJykpIHtcbiAgICBuZXh0QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICBwcmV2QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgfSBlbHNlIHJldHVybjtcbiAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdG9wQnRuKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09PSBib3R0b21CdG4pIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQuY2hpbGRyZW5bMF07XG4gIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09PSBsZWZ0QnRuKSB7XG4gICAgdGFyZ2V0ID0gYXJyT2ZDaGlsZHJlblthcnJPZkNoaWxkcmVuLmluZGV4T2YodGFyZ2V0KSAtIDFdO1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PT0gcmlnaHRCdG4pIHtcbiAgICB0YXJnZXQgPSBhcnJPZkNoaWxkcmVuW2Fyck9mQ2hpbGRyZW4uaW5kZXhPZih0YXJnZXQpICsgMV07XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gIH1cbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gIGNoZWNrVGFyZ2V0KHRhcmdldCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=