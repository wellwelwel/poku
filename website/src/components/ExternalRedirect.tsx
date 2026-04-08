import { FC, useEffect } from 'react';

export const ExternalRedirect: FC<{ to: string }> = ({ to }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <p>
      Redirecting to <a href={to}>{to}</a>...
    </p>
  );
};
