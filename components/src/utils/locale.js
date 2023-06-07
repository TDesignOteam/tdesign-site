import { getLang } from '../utils';

const callbacks = [];

function defaultChangeCallBack() {
  if (location.pathname === '/') return;
  const lang = getLang();
  if (lang === 'en') {
    const zhPathname = location.pathname.slice(0, -3);
    location.pathname = zhPathname;
  } else {
    location.pathname = `${location.pathname}-en`;
  }
}

function registerLocaleChange(cb = defaultChangeCallBack) {
  if (callbacks.includes(cb)) return;
  callbacks.push(cb);
  document.addEventListener('tdesign_site_lang', cb);
}

export {
  getLang,
  registerLocaleChange,
};