import { homeResource } from './resources';
import HomeComponent from './components/main';

export const homeRoute = {
  name: 'home',
  path: `/`,
  component: HomeComponent,
  sidebar: false,
  resources: [homeResource],
  exact: true,
};
