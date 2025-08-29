import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>Something went wrong</h2>
            <p>We're sorry, but something unexpected happened.</p>
            
            <div className="error-details">
              <details>
                <summary>Error Details</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            </div>

            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()}
                className="reload-btn"
              >
                Reload Page
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="home-btn"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;