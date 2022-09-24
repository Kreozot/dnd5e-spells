import React, { Component, ErrorInfo, ReactNode } from 'react';
import Sentry from '@sentry/react';

type Props = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
};
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    Sentry.configureScope((scope) => {
      scope.setExtra('componentStack', errorInfo.componentStack);
    });
    Sentry.captureException(error);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      // render fallback UI
      return <h1>Something went wrong!</h1>;
    }
    // when there's not an error, render children untouched
    return children;
  }
}
