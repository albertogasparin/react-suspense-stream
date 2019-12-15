import React from 'react';
import { useResource } from '@atlaskit/router';

import { sidebarResource } from '../../resources';

const HomeSidebar = () => {
  const [{ data, error, loading, promise }] = useResource(sidebarResource);
  if (!data && !error && promise) {
    throw promise;
  }

  return (
    <div>
      <strong>Sidebar</strong>
      <ul>
        {(data as any).items.map((itm: any) => (
          <li key={itm}>{itm}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomeSidebar;
