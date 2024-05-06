export interface ResponseFromAPI {
  count: number;
  next: string | null;
  previous: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- can be any data from server
  results: any[];
}
