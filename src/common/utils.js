/**
 * 防抖函数
 * @param {Object} func
 * @param {Object} delay
 */
export function debounce(func, delay) {
  let timer = null;
  return function(...datas) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, datas);
    }, delay)
  }
}
