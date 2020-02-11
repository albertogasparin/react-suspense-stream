export const MODE = {
  RENDER: 'RENDER',
  HYDRATE: 'HYDRATE',
};

export const DEFER = {
  IMMEDIATE: 'IMMEDIATE',
  MOUNT: 'MOUNT',
  IDLE: 'IDLE',
  IN_VIEWPORT: 'IN_VIEWPORT',
};

export const IS_SERVER = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const COLLECTED = new Map();

export const SETTINGS = {
  CURRENT_MODE: MODE.HYDRATE,
};
