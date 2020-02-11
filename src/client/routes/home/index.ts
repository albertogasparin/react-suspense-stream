import { homeResource } from './resources';
import { AsyncHomeComponent } from './components/async';

export const homeRoute = {
  name: 'home',
  path: `/`,
  component: AsyncHomeComponent,
  sidebar: false,
  resources: [homeResource],
  exact: true,
};
