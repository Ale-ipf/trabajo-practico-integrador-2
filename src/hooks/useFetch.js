import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [request, setRequest] = useState({
    url: null,
    data: null,
    error: null,
  });
  const isLoading = Boolean(url) && request.url !== url;

  useEffect(() => {
    if (!url) return;

    let isCurrent = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (isCurrent) setRequest({ url, data, error: null });
      } catch (error) {
        if (isCurrent) {
          setRequest({
            url,
            data: null,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
    };

    fetchData();

    return () => {
      isCurrent = false;
    };
  }, [url]);

  const isCurrentRequest = request.url === url;
  return {
    data: isCurrentRequest ? request.data : null,
    isLoading,
    error: isCurrentRequest ? request.error : null,
  };
};