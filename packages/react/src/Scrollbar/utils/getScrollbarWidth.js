let scrollbarWidth = false;

const getScrollbarWidth = () => {
  if (scrollbarWidth !== false) {
    return scrollbarWidth;
  }
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    div.style.overflow = 'scroll'; // forcing scrollbar to appear
    div.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(div);
    scrollbarWidth = (div.offsetWidth - div.clientWidth);
    document.body.removeChild(div);
  }
  return scrollbarWidth || 0;
};

export default getScrollbarWidth;
