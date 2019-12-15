import { projectResource } from './resources';
import ProjectComponent from './components/main';

export const projectRoute = {
  name: 'project',
  path: `/projects/:id`,
  component: ProjectComponent,
  sidebar: false,
  resources: [projectResource],
};
