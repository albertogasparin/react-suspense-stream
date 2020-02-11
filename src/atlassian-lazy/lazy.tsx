import React, { useRef, useState, useEffect, useMemo, Fragment } from 'react';
import { DEFER, IS_SERVER, MODE, SETTINGS } from './constants';

import { usePlaceholderRender } from './use-placeholder-render';
import { tryRequire, displayNameFromId } from './utils';
import hash from './hash';

type Loader = () => Promise<any>;

type Options = {
  // component name to help debug
  displayName?: string;

  // rendered while component is loading
  fallback?: any;

  // rendered on import error or timeout
  error?: any;

  // Should be rendered on SSR
  // if false renders fallback on SSR
  ssr?: boolean;

  defer?: string | ((props: any) => boolean);

  // Milliseconds before showing fallback
  delay?: number;

  id?: () => string;
};

export const lazy = (
  loader: Loader,
  {
    displayName,
    fallback: Fallback = () => null,
    ssr = true,
    id = () => '',
    defer = DEFER.IMMEDIATE,
  }: Options = {}
) => {
  if (IS_SERVER && ssr) loader();
  const resolveId = id();
  const resolveHash = hash(resolveId);

  const LazyComponent = (props: any) => {
    const [Resolved, setResolved] = useState<any>(() => {
      if (IS_SERVER && !ssr) return null;

      const result = tryRequire(resolveId);
      if (result) return result;

      if (
        defer === DEFER.IMMEDIATE ||
        (typeof defer === 'function' && defer(props))
      ) {
        loader().then(m => setResolved(() => m.default));
      }
      return null;
    });

    if (defer === DEFER.MOUNT || typeof defer === 'function') {
      const shouldResolve = typeof defer === 'function' ? defer(props) : true;
      useEffect(() => {
        if (Resolved || !shouldResolve) return;
        let mounted = true;
        loader().then(m => {
          if (mounted) setResolved(() => m.default);
        });
        return () => {
          mounted = false;
        };
      }, [shouldResolve, Resolved, setResolved]);
    }

    // RENDER
    // if (SETTINGS.CURRENT_MODE === MODE.RENDER) {
    //   if (IS_SERVER)
    //     return Resolved ? (
    //       <>
    //         <input type="hidden" data-lazy-begin={resolveHash} />
    //         <Resolved {...props} />
    //         <input type="hidden" data-lazy-end={resolveHash} />
    //       </>
    //     ) : (
    //       <Fallback {...props} />
    //     );

    //   const placeholderRef = usePlaceholderRender(resolveHash);
    //   if (!Resolved) {
    //     return placeholderRef ? (
    //       // render ssr result
    //       <input
    //         type="hidden"
    //         data-lazy-begin={resolveHash}
    //         ref={placeholderRef}
    //       />
    //     ) : (
    //       <Fallback {...props} />
    //     );
    //   }

    //   return <Resolved {...props} />;
    // }

    // HYDRATION
    if (IS_SERVER)
      return Resolved ? (
        <>
          <input
            type="hidden"
            data-lazy-begin={resolveHash}
            style={{ display: 'block; display: contents' }}
          />
          <Resolved {...props} />
          <input type="hidden" data-lazy-end={resolveHash} />
        </>
      ) : (
        <Fallback {...props} />
      );

    const ssrContents = useMemo(() => {
      const refs: Element[] = [];
      let el: any = document.querySelector(
        `input[data-lazy-begin="${resolveHash}"]`
      );
      if (!el) return refs;
      const { lazyBegin } = el.dataset || {};
      while ((el = el.nextSibling)) {
        if (el.dataset && el.dataset.lazyEnd === lazyBegin) break;
        refs.push(el);
      }
      return refs;
    }, []);

    return ssrContents.length ? (
      <>
        <input
          type="hidden"
          data-lazy-begin={resolveHash}
          style={{ display: 'block; display: contents' }}
        />
        {Resolved ? (
          <Resolved {...props} />
        ) : (
          ssrContents.map((el, i) =>
            React.createElement(
              el.tagName ? el.tagName.toLocaleLowerCase() : Fragment,
              {
                key: String(i),
                dangerouslySetInnerHTML: { __html: '' },
                suppressHydrationWarning: true,
              },
              el.tagName ? null : el.textContent
            )
          )
        )}
        <input type="hidden" data-lazy-end={resolveHash} />
      </>
    ) : Resolved ? (
      <Resolved {...props} />
    ) : (
      <Fallback {...props} />
    );

    return null;
  };

  LazyComponent.displayName = `Lazy(${displayName ||
    displayNameFromId(resolveId)})`;

  LazyComponent.prefetch = () => {
    if (tryRequire(resolveId)) return;
    const head = document.querySelector('head');
    if (!head) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    // TODO find out href or call
    head.appendChild(link);
  };

  LazyComponent.Prefetch = () => <link rel="prefetch" href="** TODO **" />;

  return LazyComponent;
};
