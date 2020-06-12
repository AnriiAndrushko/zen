/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
const findBtn = document.querySelector('.selector-find');
const nextBtn = document.querySelector('.selector-next');
const prevBtn = document.querySelector('.selector-prev');
const topBtn = document.querySelector('.nav-top');
const bottomBtn = document.querySelector('.nav-bottom');
const leftBtn = document.querySelector('.nav-left');
const rightBtn = document.querySelector('.nav-right');
let elArr = [];
let current = 0;
const style = document.createElement('style');
let target;
let arrOfChildren = [];
style.type = 'text/css';
style.innerHTML = '.selected { outline: solid red 5px; background-color: lightblue; }';
document.getElementsByTagName('head')[0].appendChild(style);
function checkTarget(who) {
  if (who.getElementsByTagName('*').length > 0) bottomBtn.removeAttribute('disabled');
  else bottomBtn.setAttribute('disabled', 'disabled');
  if (document.body === who) {
    rightBtn.setAttribute('disabled', 'disabled');
    leftBtn.setAttribute('disabled', 'disabled');
    topBtn.setAttribute('disabled', 'disabled');
    return;
  }
  if (who.parentElement) topBtn.removeAttribute('disabled');
  else topBtn.setAttribute('disabled', 'disabled');
  arrOfChildren = Object.values(who.parentElement.children);
  arrOfChildren = arrOfChildren.filter(e => e.tagName !== 'BR');
  if (arrOfChildren.indexOf(who) < arrOfChildren.length - 1) rightBtn.removeAttribute('disabled');
  else rightBtn.setAttribute('disabled', 'disabled');
  if (arrOfChildren.indexOf(who) > 0) leftBtn.removeAttribute('disabled');
  else leftBtn.setAttribute('disabled', 'disabled');
}
document.querySelector('.jsbursa-panel').addEventListener('click', function(event) {
  if (event.target === findBtn) {
    current = 0;
    topBtn.setAttribute('disabled', 'disabled');
    leftBtn.setAttribute('disabled', 'disabled');
    rightBtn.setAttribute('disabled', 'disabled');
    bottomBtn.setAttribute('disabled', 'disabled');
    prevBtn.setAttribute('disabled', 'disabled');
    nextBtn.setAttribute('disabled', 'disabled');
    if (target) target.classList.remove('selected');
    elArr.forEach(el => el.classList.remove('selected'));

    const s = document.querySelector('.selector').value;
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
