import React, { useRef, useState, useEffect } from 'react';
import { MODE, IS_SERVER, SETTINGS } from './constants';
import { collect } from './utils';

const LooselyLazy = {
  mode: (m: 'HYDRATE' | 'RENDER') => {
    SETTINGS.CURRENT_MODE = m;

    if (SETTINGS.CURRENT_MODE === MODE.RENDER && !IS_SERVER) {
      collect();
    }
  },
};

export { lazy } from './lazy';
export default LooselyLazy;
