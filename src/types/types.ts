export interface Character {
  id: string;
  name: string;
  films: string[];
  starships: string[];
}

export interface Film {
  id: string;
  title: string;
}

export interface Starship {
  id: string;
  name: string;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
}

export interface DetailedCharacter extends Character {
  films: string[];
  starships: string[];
}

export interface GetAllDataResponse {
  characters: DetailedCharacter[];
  total: number;
}
