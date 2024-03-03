import { useCallback, useState } from "react";

import { REQUEST_STATUS } from "@/types";

export default function useHttpRequest<T>() {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [requestStatus, setRequestStatus] = useState<REQUEST_STATUS>("idle");

  const makeRequest = useCallback(async (fn: () => Promise<T>) => {
    setRequestStatus("pending");
    try {
      const data = await fn();
      setResponse(data);
      setRequestStatus("resolved");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      setRequestStatus("rejected");
    }
  }, []);

  return { response, error, requestStatus, makeRequest };
}
