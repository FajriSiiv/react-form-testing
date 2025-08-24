import { fetcher } from "./fetcher";

export interface Country {
  name: { common: string };
  cca2: string;
  flag: string;
  languages?: Record<string, string>;
}

export const getLanguages = async (): Promise<Country[]> => {
  return fetcher<Country[]>(
    "https://restcountries.com/v3.1/independent?status=true&fields=languages,name,flag"
  );
};
