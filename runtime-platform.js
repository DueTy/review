// 事件委托
function delegate(domEl, eventType, selector, callback) {
  domEl.addEventListener(
    eventType,
    (e) => {
      let el = e.target;
      while (!el.matches(selector)) {
        if (domEl === el) {
          el = null;
          break;
        }
        el = el.parentNode;
      }
      el && callback.call(el, e, el);
    },
    true
  );
  return domEl;
}

/* 实现拖拽功能 */
let dragging = false;
// 记录每次放置的位置
let postion = null;
const domEl = document.querySelector(".drag-item");

domEl.addEventListener("mousedown", (e) => {
  dragging = true;
  postion = [e.clientX, e.clientY];
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return null;

  const x = e.clientX;
  const y = e.clientY;

  const [preX, preY] = position;
  const diffX = x - preX;
  const diffY = y - preY;
  const elX = parseInt(domEl.style.left || 0);
  const elY = parseInt(domEl.style.top || 0);
  domEl.style.left = `${elX + diffX}px`;
  domEl.style.top = `${elY + diffY}px`;
  position = [x, y];
});

document.addEventListener("mouseup", (e) => {
  dragging = false;
});

function throttle(fn, delay) {
  let flag = false;
  let timer = null;

  return function (...agrs) {
    let context = this;
    if (flag) return;

    flag = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, ...agrs);
      flag = false;
    }, delay);
  };
}

function debounce() {}
