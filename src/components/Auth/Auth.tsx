import React, { FC, useCallback, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const Auth: FC = () => {
  const handleAuthClick = useCallback(() => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => console.log('login', user));
  }, []);

  useEffect(() => {
    netlifyIdentity.on('init', (user) => console.log('init', user));
    netlifyIdentity.on('login', (user) => console.log('login', user));
    netlifyIdentity.on('logout', () => console.log('Logged out'));
    netlifyIdentity.on('error', (err) => console.error('Error', err));
    netlifyIdentity.on('open', () => console.log('Widget opened'));
    netlifyIdentity.on('close', () => console.log('Widget closed'));
    netlifyIdentity.init();
  }, []);

  return (
    <div>
      <button onClick={handleAuthClick} type="button">Login / Signup</button>
    </div>
  );
};

export default Auth;
