import { Button } from "@chakra-ui/react";
import { ErrorInfo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const FallbackComponent = (props: FallbackProps) => {
  const { resetErrorBoundary } = props;
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <Button colorScheme="red" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

export const ErrorBoundaryLayout = () => {
  function logErrorToService(error: Error, info: ErrorInfo) {
    // Send this log to an error reporting service
    console.error("Caught an error:", error, info);
  }

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={logErrorToService}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Outlet />
    </ErrorBoundary>
  );
};
