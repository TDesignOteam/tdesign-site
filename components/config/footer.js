import { isIntranet } from '@utils';

const footerLinks = [
  {
    title: '资源',
    links: [{
      name: '设计资源',
      url: '/source',
      target: '_self',
    }, {
      name: 'TDesign Starter',
      url: 'https://tdesign.tencent.com/starter/',
      target: '_self',
    }],
  },
  {
    title: '腾讯设计',
    links: [{
      name: 'CoDesign',
      url: 'https://codesign.qq.com/',
      target: '_blank',
    }, {
      name: 'ProWork',
      url: 'https://prowork.qq.com/',
      target: '_blank',
    }, {
      name: 'TDesign',
      url: `https://tdesign.${isIntranet() ? 'woa' : 'tencent'}.com`,
      target: '_self',
    }, {
      name: 'TVision',
      url: 'https://tvision.oa.com/',
      target: '_blank',
    }],
  },
  {
    title: '关于',
    links: [{
      name: '关于我们',
      url: '/about/introduce',
      target: '_self',
    }, {
      name: '联系我们',
      url: '/about/contact',
      target: '_self',
    }, {
      name: '意见反馈',
      url: '//support.qq.com/products/293854',
      target: '_blank',
    }],
  },
];

export default footerLinks;
