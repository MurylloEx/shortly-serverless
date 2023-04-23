import { useCallback, useState } from 'react';
import { ApiClient, Exception, ShortenUrl } from 'src/hooks/network';

export type UseShorten = {
  isSuccess: boolean;
  isLoading: boolean;
  isDone: boolean;
  result: ShortenUrl | undefined;
  exception: Exception | undefined;
  create: (realUrl: string) => void;
}

export function useShorten(): UseShorten {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [result, setResult] = useState<ShortenUrl | undefined>(undefined);
  const [exception, setException] = useState<Exception | undefined>(undefined);

  const create = useCallback((realUrl: string) => {
    setIsSuccess(false);
    setIsLoading(true);
    setIsDone(false);
    setResult(undefined);
    setException(undefined);

    const urlBuilder = new URLSearchParams('?');
    urlBuilder.append('url', realUrl);

    ApiClient.post<ShortenUrl>(`/v1/shorten?${urlBuilder.toString()}`)
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
    create
  }
}
