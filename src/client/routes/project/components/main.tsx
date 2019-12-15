import React from 'react';
import { useResource } from '@atlaskit/router';

import { projectResource } from '../resources';

const ProjectComponent = () => {
  const [{ data, error, promise }] = useResource(projectResource);
  if (!data && !error && promise) {
    throw promise;
  }
  // needed due to batchedUpdates fix missing in router
  if (!data) return null;
  return (
    <div>
      <h1>Project {(data as any).id}</h1>
    </div>
  );
};

export default ProjectComponent;
