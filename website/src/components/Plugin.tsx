import { FC } from 'react';
import { Github } from 'lucide-react';

export type PluginProps = {
  repo: string;
};

export const Plugin: FC<PluginProps> = ({ repo }) => (
  <a
    className='plugin-badge'
    href={`https://github.com/pokujs/${repo}`}
    target='_blank'
    rel='noopener noreferrer'
  >
    <Github />
    Plugin
  </a>
);
