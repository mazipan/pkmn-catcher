export interface BaseListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}
