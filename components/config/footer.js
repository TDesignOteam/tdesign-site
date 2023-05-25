import { isIntranet } from '@utils';

export const getFooterConfig = () => {
  const lang = localStorage.getItem('tdesign_site_lang') || 'zh';
  const isEnglish = lang === 'en';

  const footerLinks = [
    {
      title: isEnglish ? 'Resource' : '资源',
      links: [
        { name: isEnglish ? 'Design Resource' : '设计资源', url: isEnglish ? '/source-en' : '/source', target: '_self' },
        { name: 'TDesign Starter', url: 'https://tdesign.tencent.com/starter/', target: '_self' }
      ],
    },
    {
      title: isEnglish ? 'Tencent Design' : '腾讯设计',
      links: [
        { name: 'CoDesign', url: 'https://codesign.qq.com/', target: '_blank' },
        { name: 'ProWork', url: 'https://prowork.qq.com/', target: '_blank' },
        { name: 'TDesign', url: `https://tdesign.${isIntranet() ? 'woa' : 'tencent'}.com`, target: '_self' },
        isIntranet() ? { name: 'TVision', url: 'https://tvision.oa.com/', target: '_blank' } : null,
      ].filter(item => item),
    },
    {
      title: isEnglish ? 'About' : '关于',
      links: [
        { name: isEnglish ? 'About us' : '关于我们', url: isEnglish ? '/about/introduce-en' : '/about/introduce', target: '_self' },
        { name: isEnglish ? 'Contact us' : '联系我们', url: isEnglish ? '/about/contact-en' : '/about/contact', target: '_self' },
        { name: isEnglish ? 'Feedback' : '意见反馈', url: '//support.qq.com/products/293854', target: '_blank' }
      ],
    },
  ];

  return footerLinks;
}
