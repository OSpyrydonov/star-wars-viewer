// types.ts

// Визначення типів для персонажів
export interface Character {
  id: string; // Змінити на string або number в залежності від API
  name: string;
  films: string[];
  starships: string[];
}

export interface Film {
  id: string; // Змінити на string або number в залежності від API
  title: string;
}

export interface Starship {
  id: string; // Змінити на string або number в залежності від API
  name: string;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
}

// Тип для детальної інформації про персонажів
export interface DetailedCharacter extends Character {
  films: string[]; // Заголовки фільмів
  starships: string[]; // Назви зорельотів
}

// Тип для відповіді getAllData
export interface GetAllDataResponse {
  characters: DetailedCharacter[];
  total: number;
}
