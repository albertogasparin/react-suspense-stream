import React from 'react';

type ModalOverlayProps = {
  open: boolean;
  children: any;
};
export const ModalOverlay = ({ children, open }: ModalOverlayProps) => {
  const style = {
    position: 'fixed' as const,
    display: open ? 'flex' : 'none',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.2)',
  };
  return <div style={style}>{children}</div>;
};
