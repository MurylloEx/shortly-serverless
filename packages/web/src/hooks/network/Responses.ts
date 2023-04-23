export type ShortenUrl = {
  shortId: string;
  shortCode: string;
  realUrl: string;
  accessCount: number;
  createdAt: number;
  updatedAt: number;
}

export type Exception = {
  error: string;
  message: string;
  path: string
  query: Record<string, string | number | boolean | undefined>;
  params: Record<string, string | number | boolean | undefined>;
}
