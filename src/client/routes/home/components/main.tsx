import React, { useState } from 'react';
import { useResource, Link } from '@atlaskit/router';

import { homeResource } from '../resources';
import { AsyncHomeModal } from './async';

const HomeComponent = () => {
  const [{ data, error, loading, promise }] = useResource(homeResource);
  const [isModalOpen, toggleModal] = useState(false);

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
      <button onClick={() => toggleModal(!isModalOpen)}>Open modal</button>
      <AsyncHomeModal open={isModalOpen} onClose={() => toggleModal(false)} />
    </div>
  );
};

export default HomeComponent;
