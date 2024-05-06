import type { AxiosRequestConfig } from "axios";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any -- we can send any data to the server */
const BASE_URL
  = 'https://sw-api.starnavi.io/people/'

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod,
  data: any = null
): Promise<T> {
  const options: AxiosRequestConfig = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.data = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return axios(BASE_URL + url, options)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error();
      }

      return response.data as Promise<T>;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url, 'GET'),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
