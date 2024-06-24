import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'index',
    'philosophy',
    'comparing',
    {
      type: 'category',
      label: 'Documentation',
      collapsed: false,
      link: {
        type: 'generated-index',
      },
      items: [{ type: 'autogenerated', dirName: 'documentation' }],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [{ type: 'autogenerated', dirName: 'examples' }],
    },
  ],
};

export default sidebars;
