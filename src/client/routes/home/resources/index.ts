import { createResource } from '@atlaskit/router';

export const homeResource = createResource({
  type: 'HOME',
  getKey: () => 'state',
  // @ts-ignore
  getData: async (_, { baseUrl }) => {
    const resp = await fetch(`${baseUrl}/api/projects`);
    const data = await resp.json();
    return data;
  },
});
