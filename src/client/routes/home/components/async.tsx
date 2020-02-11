import { lazy } from '../../../../atlassian-lazy';
import { ModalOverlay } from './modal-overlay';

export const AsyncHomeComponent = lazy(
  () => import(/* webpackChunkName: "async-home" */ './main'),
  {
    id: () => (require as any).resolveWeak('./main'),
  }
);

export const AsyncHomeModal = lazy(
  () => import(/* webpackChunkName: "async-home-modal" */ './modal'),
  {
    id: () => (require as any).resolveWeak('./modal'),
    fallback: ModalOverlay,
    ssr: false,
    defer: ({ open }) => !!open,
  }
);
