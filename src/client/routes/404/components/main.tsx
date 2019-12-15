import React from 'react';
import { Link } from '@atlaskit/router';

const NotFoundComponent = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link href={`/`}>Go home</Link>
    </div>
  );
};

export default NotFoundComponent;
