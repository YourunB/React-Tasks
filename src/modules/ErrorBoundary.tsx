import { Component } from 'react';
import './errorBoundary.css';
import { PropsChildren } from '../helpers/types';

class ErrorBoundary extends Component<PropsChildren> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <h1>Sorry, something went wrong...</h1>
        </main>
      );
    } else return this.props.children;
  }
}

export default ErrorBoundary;
