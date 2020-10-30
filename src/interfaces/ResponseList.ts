export interface ResponseList<T> {
  count: string;
  next: string;
  previous: string | null;
  results: T[];
}
