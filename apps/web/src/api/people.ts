
import type { Person } from "../types/person";
import type { ResponseFromAPI } from "../types/response-from-api";
import { client } from "../utils/fetch-info";

export const getAllHeroes = (params: string): Promise<ResponseFromAPI> => {
  return client.get<ResponseFromAPI>(`/people/${params}`);
};

export const getHeroById = (slug: string): Promise<Person> => {
  return client.get<Person>(`/people/${slug}`);
};
