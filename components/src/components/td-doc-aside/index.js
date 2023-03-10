import { html, dispatch, define } from 'hybrids';
import style from './style.less';
import { patchShadowDomIntoDom } from '@utils';
import menuFoldIcon  from '@images/menu-fold.svg?raw';
import menuUnfoldIcon  from '@images/menu-unfold.svg?raw';

const replaceStateEvent = new CustomEvent('replaceState');

// proxy replaceState event
const originHistoryEvent = window.history.replaceState; 
window.history.replaceState = (...args) => {
  originHistoryEvent.apply(window.history, args);
  window.dispatchEvent(replaceStateEvent);
};

function handleLinkClick(host, e, path) {
  e.preventDefault();
  const shadowRoot = e.target.getRootNode();
  const prevActiveNodes = shadowRoot.querySelectorAll('.active');
  prevActiveNodes.forEach((node) => node.classList.remove('active'));
  e.target.classList.toggle('active');
  requestAnimationFrame(() => dispatch(host, 'change', { detail: path }));
}

function renderNav(nav, deep = 0) {
  const isActive = location.pathname === nav.path || location.hash.slice(1) === nav.path;

  if (Array.isArray(nav)) return nav.map((item) => renderNav(item, deep));

  if (nav.children) {
    return html`
      <div class="TDesign-doc-sidenav-group TDesign-doc-sidenav-group--deep${deep}">
        <span class="TDesign-doc-sidenav-group__title">${nav.title}</span>
        <div class="TDesign-doc-sidenav-group__children">${renderNav(nav.children, deep + 1)}</div>
      </div>
    `;
  }

  return html`
    <div class="TDesign-doc-sidenav-item">
      <a
        href="${nav.path}"
        class="TDesign-doc-sidenav-link ${isActive ? 'active' : ''}"
        onclick=${(host, e) => handleLinkClick(host, e, nav.path)}
      >
        ${nav.title}
      </a>
    </div>
  `;
}

function toggleCollapseAside(host) {
  if (!host.shadowRoot) return;
  const asideClassList = host.shadowRoot.querySelector('.TDesign-doc-aside').classList;
  if (asideClassList.contains('hide')) {
    asideClassList.remove('hide');
    asideClassList.add('show');
  } else {
    asideClassList.remove('show');
    asideClassList.add('hide');
  }
  Object.assign(host, { collapse: !host.collapse });
}

export default define({
  tag: 'td-doc-aside',
  routerList: {
    get: (_host, lastValue) => lastValue || [],
    set: (_host, value) => value,
  },
  title: '',
  patchDom: {
    get: (_host, lastValue) => lastValue || false,
    set: (_host, value) => value,
    connect: patchShadowDomIntoDom,
  },
  asideStyle: {
    get: (_host, lastValue) => lastValue || undefined,
    set: (_host, value) => value,
    connect: (host) => {
      function setFixed() {
        if (!host.shadowRoot) return;
        const { shadowRoot } = host;
        const { scrollTop } = document.documentElement;
        // ????????????
        const aside = shadowRoot.querySelector('.TDesign-doc-aside') || { style: {} };

        const top = getComputedStyle(host).getPropertyValue('--aside-top') || '64px';

        if (scrollTop >= parseFloat(top)) {
          Object.assign(aside.style, { position: 'fixed', top: '0' });
        } else {
          Object.assign(aside.style, { position: 'absolute', top });
        }
      }

      function handleResize() {
        if (!host.shadowRoot) return;
        const isMobileResponse = window.innerWidth < 1200;
        const asideClassList = host.shadowRoot.querySelector('.TDesign-doc-aside').classList;
        if (isMobileResponse) {
          // safari ???????????????????????? resize
          if (asideClassList.contains('show')) return;
          asideClassList.remove('show');
          asideClassList.remove('hide');
          asideClassList.add('hide');
        } else {
          asideClassList.remove('hide');
          asideClassList.remove('show');
        }
      }

      // ????????????????????????????????????????????????????????????
      function refreshAside() {
        Object.assign(host, { routerList: host.routerList.slice() });
      }

      // ??????????????????
      function handleRouterChange(e) {
        if (!host.shadowRoot) return;

        const { shadowRoot } = host;

        requestAnimationFrame(() => {
          let currentRoute = location.pathname;
          // hash mode
          if (location.pathname === '/' && location.hash) {
            currentRoute = location.hash.slice(1);
          }
          
          const linkNodes = Array.from(shadowRoot.querySelectorAll('.TDesign-doc-sidenav-link'));
          const prevActiveNodes = Array.from(shadowRoot.querySelectorAll('.TDesign-doc-sidenav-link.active'));
          const nextActiveNode = linkNodes.find(node => {
            const urlObj = new URL(node.href);
            // host & pathname isSame
            return urlObj.host === location.host && urlObj.pathname === currentRoute;
          });
  
          if (!nextActiveNode) return;
  
          if (prevActiveNodes.length === 1 && prevActiveNodes.some(node => node.href === nextActiveNode.href)) return;
          prevActiveNodes.forEach((node) => node.classList.remove('active'));
          nextActiveNode.classList.toggle('active');
        });
      }
      
      requestAnimationFrame(() => {
        handleResize();
      });

      window.addEventListener('load', refreshAside);
      window.addEventListener('resize', handleResize);
      document.addEventListener('scroll', setFixed);

      window.addEventListener('popstate', handleRouterChange);
      window.addEventListener('pushState', handleRouterChange);
      window.addEventListener('replaceState', handleRouterChange);
      
      return () => {
        window.removeEventListener('load', refreshAside);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('scroll', setFixed);

        window.removeEventListener('popstate', handleRouterChange);
        window.removeEventListener('pushState', handleRouterChange);
        window.removeEventListener('replaceState', handleRouterChange);
      };
    },
  },
  collapse: false,
  render: (host) => {
    const { routerList, title, collapse } = host;

    return html`
      <aside class="TDesign-doc-aside">
        <div class="TDesign-doc-aside-collapse" onclick="${toggleCollapseAside}">
          <i class="icon" innerHTML="${collapse ? menuUnfoldIcon : menuFoldIcon}"></i>
        </div>
        <div class="TDesign-doc-sidenav">
          ${title && html`<h2 class="TDesign-doc-aside__title">${title}</h2>`}
          <slot class="TDesign-doc-aside__extra" name="extra"></slot>
          ${renderNav(routerList)}
        </div>
      </aside>
      <div class="TDesign-doc-aside-mask" onclick="${toggleCollapseAside}"></div>
    `.css`${style}`;
  },
});
