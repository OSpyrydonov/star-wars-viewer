import axios from "axios";
import {
  Character,
  Film,
  Starship,
  ApiResponse,
  GetAllDataResponse,
  DetailedCharacter,
} from "../types/types";

export const api = axios.create({
  baseURL: "https://sw-api.starnavi.io",
});

export const getAllData = async (page: number): Promise<GetAllDataResponse> => {
  try {
    const [charactersResponse, filmsResponse, starshipsResponse] =
      await Promise.all([
        api.get<ApiResponse<Character>>(`/people?page=${page}`),
        api.get<ApiResponse<Film>>("/films"),
        api.get<ApiResponse<Starship>>("/starships"),
      ]);

    const characters = charactersResponse.data.results;
    const films = filmsResponse.data.results;
    const starships = starshipsResponse.data.results;

    const detailedPeople: DetailedCharacter[] = characters.map((character) => {
      return {
        ...character,
        films: character.films.map((filmId) => {
          const film = films.find((f) => f.id === filmId);
          return film ? film.title : "Unknown Film";
        }),
        starships: character.starships.map((starshipId) => {
          const starship = starships.find((s) => s.id === starshipId);
          return starship ? starship.name : "Unknown Starship";
        }),
      };
    });

    return {
      characters: detailedPeople,
      total: charactersResponse.data.count,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
