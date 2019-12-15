import React, { Component } from 'react';

export class ErrorBoundary extends Component<{}, { error: null | Error }> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: any) {}

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      // You can render any custom fallback UI
      return <pre>{error.stack}</pre>;
    }

    return children;
  }
}
