import { useRef, useState, useLayoutEffect } from 'react';
import { COLLECTED } from './constants';

export const usePlaceholderRender = (resolveId: string) => {
  const hydrationRef = useRef(null);
  const { current: ssrDomNodes } = useRef(
    COLLECTED.get(resolveId) || ([] as HTMLElement[])
  );

  useLayoutEffect(() => {
    const element = hydrationRef.current;
    const { parentNode } = element || ssrDomNodes[0] || {};
    if (!parentNode) return;

    if (!element) {
      // on async-bundle/input removal
      ssrDomNodes.forEach((node: any) => parentNode.removeChild(node));
      ssrDomNodes.length = 0;
      COLLECTED.delete(resolveId);
      return;
    }
    // on re-render
    if (parentNode.contains(ssrDomNodes[0])) return;
    // on first render
    ssrDomNodes
      .reverse()
      .forEach((node: any) =>
        parentNode.insertBefore(node, (element as any).nextSibling)
      );
  }, [hydrationRef.current, ssrDomNodes]);

  return ssrDomNodes.length ? hydrationRef : undefined;
};
