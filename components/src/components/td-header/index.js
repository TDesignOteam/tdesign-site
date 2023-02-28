import { html, define } from "hybrids";
import headerData from "@config/header.js";
import gplHeaderData from "@config/gpl-header.js";
import style from "./style.less";
import portalStyle from "./portal.less";
import githubIcon from "@images/github.svg?raw";
import gitIcon from "@images/git.svg?raw";
import fakeArrowIcon from "@images/fake-arrow.svg?raw";
import { isIntranet } from "@utils/index";

const { headerList, baseComponentsLinks, baseComponentPrefix } = isIntranet()
  ? headerData
  : gplHeaderData;

const allComponentsNpmUrl = [
  ...baseComponentsLinks.web.links.filter((l) => l.status).map((l) => l.npm),
  ...baseComponentsLinks.mobile.links.filter((l) => l.status).map((l) => l.npm),
];

export function handleLinkClick(host, e, item) {
  e.preventDefault();
  if (!item.status) return;
  location.href = item.path;
}

export function renderTag(status) {
  if (status === 0) return html`<span class="disable-tag">待上线</span>`;
  if (status === 1) return html`<span class="stable-tag">Stable</span>`;
  if (status === 2) return html`<span class="alpha-tag">Alpha</span>`;
  if (status === 3) return html`<span class="beta-tag">Beta</span>`;
  if (status === 4) return html`<span class="rc-tag">Rc</span>`;
}

function isActive(path) {
  if (/^https?:/.test(path)) return location.href.includes(path);
  return location.pathname.includes(path);
}

function renderLinksPopup(host, trigger) {
  return html`
    <td-doc-popup placement="bottom" portalStyle="${portalStyle}">
      ${trigger}
      <div slot="content" class="TDesign-base-components-links">
        <div class="TDesign-base-components-links__web">
          <p class="title">${baseComponentsLinks.web.name}</p>
          <div class="TDesign-base-components-links__list">
            ${baseComponentsLinks.web.links.map(
              (item) => html`
                <a
                  href="${item.path}"
                  class="link ${isActive(item.path)
                    ? "active"
                    : ""} ${!item.status ? "disabled" : ""}"
                  onclick=${(host, e) => handleLinkClick(host, e, item)}
                >
                  <img class="icon" src="${item.icon}" />
                  <div class="details">
                    <span class="name">
                      ${item.name} ${renderTag(item.status)}
                    </span>
                    <span class="version">
                      ${item.status
                        ? `Version：${host.npmVersions[item.npm]}`
                        : "敬请期待"}
                    </span>
                  </div>
                </a>
              `
            )}
          </div>
        </div>

        <div class="TDesign-base-components-links__mobile">
          <p class="title">${baseComponentsLinks.mobile.name}</p>
          <div class="TDesign-base-components-links__list">
            ${baseComponentsLinks.mobile.links.map(
              (item) => html`
                <a
                  href="${item.path}"
                  class="link ${isActive(item.path)
                    ? "active"
                    : ""} ${!item.status ? "disabled" : ""}"
                  onclick=${(host, e) => handleLinkClick(host, e, item)}
                >
                  <img class="icon" src="${item.icon}" />
                  <div class="details">
                    <span class="name">
                      ${item.name} ${renderTag(item.status)}
                    </span>
                    <span class="version">
                      ${item.status
                        ? `Version：${host.npmVersions[item.npm]}`
                        : "敬请期待"}
                    </span>
                  </div>
                </a>
              `
            )}
          </div>
        </div>
      </div>
    </td-doc-popup>
  `;
}

export function gitPath(platform, framework) {
  const isStarter = /starter/.test(location.pathname);
  if (isStarter) {
    const [, starterFramework] =
      location.pathname.match(/starter\/docs\/([\w-]+)/) || [];
    if (!starterFramework)
      return "https://github.com/Tencent/?q=tdesign+starter";
    return `https://github.com/Tencent/tdesign-${starterFramework}-starter`;
  }

  if (framework === "site") {
    return isIntranet()
      ? "https://git.woa.com/groups/TDesign/-/projects/list"
      : "https://github.com/Tencent/tdesign";
  } else if (platform === "mobile") {
    return isIntranet()
      ? `https://git.woa.com/Tdesign/Tdesign-${platform}-${framework}`
      : `https://github.com/Tencent/tdesign-${platform}-${framework}`;
  } else {
    return isIntranet()
      ? `https://git.woa.com/Tdesign/Tdesign-${platform}-${framework}`
      : `https://github.com/Tencent/tdesign-${framework}`;
  }
}

function renderLinks(host, headerList, platform, framework) {
  const gitLink = html`
    <a
      class="TDesign-header-nav__git"
      href="${gitPath(platform, framework)}"
      id="${platform}"
      target="_blank"
    >
      <span
        class="TDesign-header-nav__git-icon"
        innerHTML="${isIntranet() ? gitIcon : githubIcon}"
      ></span>
    </a>
  `;

  const isBaseActive = () => {
    const [, basePath] = location.pathname.split("/");
    return baseComponentPrefix.includes(basePath);
  };

  return headerList
    .map((item) => {
      if (item.type === "base") {
        const trigger = html`
          <span
            class="TDesign-header-nav__link ${isBaseActive() ? "active" : ""}"
          >
            ${item.name} <i class="icon" innerHTML="${fakeArrowIcon}"></i>
          </span>
        `;
        return renderLinksPopup(host, trigger);
      }
      return html`
        <a
          class="TDesign-header-nav__link ${isActive(item.path)
            ? "active"
            : ""}"
          href="${item.path}"
          target="${item.target}"
          >${item.name}</a
        >
      `;
    })
    .concat(gitLink);
}

export default define({
  tag: "td-header",
  platform: "web",
  framework: "vue",
  disabledTheme: false,
  npmVersions: {
    get: (_host, lastValue) => lastValue || {},
    set: (_host, value) => value,
    connect: (host, key) => {
      allComponentsNpmUrl.forEach((item) => {
        fetch(`https://mirrors.tencent.com/npm/${item}`)
          .then((res) => res.json())
          .then((res) => {
            const latestVersion = res?.["dist-tags"]?.["latest"];
            host.npmVersions = {
              ...host.npmVersions,
              [item]: latestVersion,
            };
          })
          .catch(console.error);
      });
    },
  },
  collapseMenu: {
    get: (_host, lastValue) => lastValue || false,
    set: (_host, value) => value,
    connect: (host, key) => {
      function handleResize() {
        const isMobileResponse = window.innerWidth < 960;
        Object.assign(host, { [key]: isMobileResponse });
      }

      requestAnimationFrame(() => handleResize());

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
  },
  render: (host) => {
    const { platform, framework, disabledTheme, collapseMenu } = host;

    return html`
      <header class="TDesign-header">
        <div class="TDesign-header-inner">
          <div class="TDesign-header-left">
            <td-logo></td-logo>
          </div>
          <div class="TDesign-header-nav">
            ${collapseMenu
              ? html`
                  <td-collapse-menu
                    disabledTheme="${disabledTheme}"
                    platform="${platform}"
                    framework="${framework}"
                    headerList="${headerList}"
                    baseComponentsLinks="${baseComponentsLinks}"
                  >
                  </td-collapse-menu>
                `
              : html`
                  <div class="slot-search">
                    <slot name="search"></slot>
                  </div>
                  ${renderLinks(host, headerList, platform, framework)}
                  ${disabledTheme
                    ? html``
                    : html`<td-theme-tabs></td-theme-tabs>`}
                `}
          </div>
        </div>
      </header>
    `.css`${style}`;
  },
});
