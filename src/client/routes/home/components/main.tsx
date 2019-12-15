import React from 'react';
import { useResource, Link } from '@atlaskit/router';

import { homeResource } from '../resources';

const HomeComponent = () => {
  const [{ data, error, loading, promise }] = useResource(homeResource);
  if (!data && !error && promise) {
    throw promise;
  }
  // needed due to batchedUpdates fix missing in router
  if (!data) return null;
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {(data as any).items.map((itm: any) => (
          <li key={itm.id}>
            <Link href={`/projects/${itm.id}`}>{itm.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeComponent;
