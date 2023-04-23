import { useCallback, useState } from 'react';
import { ApiClient, Exception, ShortenUrl } from 'src/hooks/network';

export type UseViewShortenUrl = {
  isSuccess: boolean;
  isLoading: boolean;
  isDone: boolean;
  result: ShortenUrl | undefined;
  exception: Exception | undefined;
  view: (code: string) => void;
}

export function useViewShortenUrl(): UseViewShortenUrl {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [result, setResult] = useState<ShortenUrl | undefined>(undefined);
  const [exception, setException] = useState<Exception | undefined>(undefined);

  const view = useCallback((code: string) => {
    setIsSuccess(false);
    setIsLoading(true);
    setIsDone(false);
    setResult(undefined);

    ApiClient.get<ShortenUrl>(`/v1/code/${encodeURIComponent(code)}/info`)
      .then((value) => {
        setIsSuccess(true);
        setIsLoading(false);
        setIsDone(true);
        setResult(value.data);
        setException(undefined);
      })
      .catch((value) => {
        setIsSuccess(false);
        setIsLoading(false);
        setIsDone(true);
        setResult(undefined);
        setException(value.response ? value.response.data : undefined);
      });
  }, [
    setIsSuccess, 
    setIsLoading, 
    setIsDone, 
    setResult
  ]);

  return {
    isSuccess,
    isLoading,
    isDone,
    result,
    exception,
    view
  }
}
