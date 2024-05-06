
import type { ResponseFromAPI } from "../types/response-from-api";
import { client } from "../utils/fetch-people";

export const getAll = (): Promise<ResponseFromAPI> => {
  return client.get<ResponseFromAPI>('');
};
