import { Component } from 'react';
import './errorBoundary.css';
import { PropsChildren } from '../state/types';

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
        <div className="error-boundary">
          <h1>Sorry, something went wrong...</h1>
        </div>
      );
    } else return this.props.children;
  }
}

export default ErrorBoundary;
