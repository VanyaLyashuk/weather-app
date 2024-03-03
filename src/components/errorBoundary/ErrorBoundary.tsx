import { Component, ErrorInfo, ReactNode } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage message="Ooops! Something went wrong." minHeightClass="min-h-[325px] sm:min-h-[250px] md:min-h-[315px]" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
