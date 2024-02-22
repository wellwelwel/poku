import { useColorMode } from '@docusaurus/theme-common';
import LogoLight from '@site/static/img/favicon.svg';
import LogoDark from '@site/static/img/logo-dark.svg';

export const Logo: React.FC = ({ ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      {colorMode === 'dark' ? (
        <LogoDark {...props} />
      ) : (
        <LogoLight {...props} />
      )}
    </>
  );
};
