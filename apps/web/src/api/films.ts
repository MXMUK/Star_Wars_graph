
import type { Film } from "../types/film";
import { client } from "../utils/fetch-info";

export const getFilmById = (id: string): Promise<Film> => {
  return client.get<Film>(`/films/${id}`);
};
