import vueIcon from '../src/images/vue-logo.svg?url';
import reactIcon from '../src/images/react-logo.svg?url';
import wxIcon from '../src/images/wx-logo.svg?url';
import flutterIcon from '../src/images/flutter-logo.svg?url';
import { isIntranet } from "@utils/index";

const headerList = [
  {
    name: '设计',
    path: '/design',
    type: 'main',
    target: '_self',
  },
  {
    name: '基础组件',
    path: '/vue/',
    type: 'base',
    target: '_self',
  },
  {
    name: '行业组件',
    path: '/trade',
    type: 'main',
    target: '_self',
  },
  {
    name: '页面模板',
    path: 'https://tdesign.tencent.com/starter/',
    type: 'main',
    target: '_self',
  },
  {
    name: '资源',
    path: '/source',
    type: 'main',
    target: '_self',
  },
  {
    name: '关于',
    path: '/about',
    type: 'main',
    target: '_self',
  },
];

const baseComponentsLinks = {
  web: {
    name: 'Web 桌面端',
    links: [
      {
        name: 'Vue', icon: vueIcon, path: '/vue/', npm: 'tdesign-vue', status: 1,
      },
      {
        name: 'Vue Next', icon: vueIcon, path: '/vue-next/', npm: 'tdesign-vue-next', status: 1,
      },
      {
        name: 'React', icon: reactIcon, path: '/react/', npm: 'tdesign-react', status: 1,
      }
    ],
  },
  mobile: {
    name: 'Mobile 移动端',
    links: [
      {
        name: 'Vue Next', icon: vueIcon, path: '/mobile-vue/', npm: 'tdesign-mobile-vue', status: 3,
      },
      {
        name: 'React', icon: reactIcon, path: '/mobile-react/', npm: 'tdesign-mobile-react', status: 2,
      },
      {
        name: 'Flutter', icon: flutterIcon, path: '/flutter/', npm: 'tdesign-flutter', status: 0,
      },
      {
        name: '微信小程序', icon: wxIcon, path: '/miniprogram/', npm: 'tdesign-miniprogram', status: 1,
      },
      {
        name: 'QQ 小程序', icon: wxIcon, path: '/qq-miniprogram/', npm: 'tdesign-qq-miniprogram', status: 2,
      },
      {
        name: 'Taro', icon: wxIcon, path: '/taro/', npm: 'tdesign-taro', status: 0,
      },
    ],
  },
};

const baseComponentPrefix = ['vue', 'react', 'mobile-vue', 'mobile-react', 'vue-next', 'flutter', 'miniprogram'];

export default {
  headerList,
  baseComponentsLinks,
  baseComponentPrefix,
};

export const getHeaderConfig = () => {
  const intranet = isIntranet();
  const lang = localStorage.getItem('tdesign_site_lang') || 'zh';
  const isEnglish = lang === 'en';

  const headerList = [
    { name: isEnglish ? 'Design' : '设计', path: isEnglish ? '/design-en' : '/design', type: 'main', target: '_self' },
    { name: isEnglish ? 'Components' : '基础组件', path: '/vue/', type: 'base', target: '_self' },
    intranet ? { name: isEnglish ? 'Industry component' : '行业组件', path: '/trade', type: 'main', target: '_self' } : null,
    { name: isEnglish ? 'Templates' : '页面模板', path: 'https://tdesign.tencent.com/starter/', type: 'main', target: '_self' },
    { name: isEnglish ? 'Resource' : '资源', path: isEnglish ? '/source-en' : '/source', type: 'main', target: '_self' },
    { name: isEnglish ? 'About' : '关于', path: isEnglish ? '/about-en' : '/about', type: 'main', target: '_self' },
  ].filter(item => item);

  const baseComponentsLinks = {
      web: {
        name: isEnglish ? 'Web PC' : 'Web 桌面端',
        links: [
          {
            name: 'Vue', icon: vueIcon, path: '/vue/', npm: 'tdesign-vue', status: 1,
          },
          {
            name: 'Vue Next', icon: vueIcon, path: '/vue-next/', npm: 'tdesign-vue-next', status: 1,
          },
          {
            name: 'React', icon: reactIcon, path: '/react/', npm: 'tdesign-react', status: 1,
          }
        ],
      },
      mobile: {
        name: isEnglish ? 'Mobile' : 'Mobile 移动端',
        links: [
          {
            name: 'Vue Next', icon: vueIcon, path: '/mobile-vue/', npm: 'tdesign-mobile-vue', status: 3,
          },
          {
            name: 'React', icon: reactIcon, path: '/mobile-react/', npm: 'tdesign-mobile-react', status: 2,
          },
          {
            name: 'Flutter', icon: flutterIcon, path: '/flutter/', npm: 'tdesign-flutter', status: 0,
          },
          {
            name: isEnglish ? 'Miniprogram' : '微信小程序', icon: wxIcon, path: '/miniprogram/', npm: 'tdesign-miniprogram', status: 1,
          },
          {
            name: isEnglish ? 'Miniprogram' : 'QQ 小程序', icon: wxIcon, path: '/qq-miniprogram/', npm: 'tdesign-qq-miniprogram', status: 2,
          },
          {
            name: 'Taro', icon: wxIcon, path: '/taro/', npm: 'tdesign-taro', status: 0,
          },
        ],
      },
  };

  const baseComponentPrefix = ['vue', 'react', 'mobile-vue', 'mobile-react', 'vue-next', 'flutter', 'miniprogram'];

  return {
    headerList,
    baseComponentsLinks,
    baseComponentPrefix,
  };
}
