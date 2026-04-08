import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';

export type PluginProps = {
  repo: string;
  name?: string;
};

export const Plugin: FC<PluginProps> = ({ repo, name }) => (
  <a
    className='plugin-badge'
    href={`https://github.com/pokujs/${repo}`}
    target='_blank'
    rel='noopener noreferrer'
  >
    <FaGithub />
    {name ?? 'Plugin'}
  </a>
);
