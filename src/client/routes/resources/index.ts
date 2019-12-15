import { createResource } from '@atlaskit/router';

export const sidebarResource = createResource({
  type: 'SIDEBAR',
  getKey: () => 'state',
  // @ts-ignore
  getData: async (_, { baseUrl }) => {
    const resp = await fetch(`${baseUrl}/api/sidebar`);
    const data = await resp.json();
    return data;
  },
});
