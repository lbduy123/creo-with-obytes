import { type CacheConfig, type FetchPolicy, type RenderPolicy } from "relay-runtime";

export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type QueryOptions = {
  fetchKey?: string | number | undefined;
  fetchPolicy?: FetchPolicy | undefined;
  networkCacheConfig?: CacheConfig | undefined;
  UNSTABLE_renderPolicy?: RenderPolicy | undefined;
}