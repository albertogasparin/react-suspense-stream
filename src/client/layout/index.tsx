import React, { Suspense } from 'react';
import { useRouter, Link } from '@atlaskit/router';

import { ErrorBoundary } from './error-boundary';

const RouteSidebar = () => {
  const [{ route }] = useRouter();
  // @ts-ignore
  if (!route.sidebar) return null;
  return (
    <aside>
      <ErrorBoundary>
        <Suspense fallback={'...'}>
          {/* 
       // @ts-ignore */}
          <route.sidebar />
        </Suspense>
      </ErrorBoundary>
    </aside>
  );
};

const RouteComponent = () => {
  const [{ route }] = useRouter();
  return (
    <main>
      <ErrorBoundary>
        <Suspense fallback={'...'}>
          {/* 
       // @ts-ignore */}
          <route.component />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export const Layout = () => {
  return (
    <section>
      <header>
        <Link href="/">Home</Link>
      </header>
      <RouteSidebar />
      <RouteComponent />
    </section>
  );
};
