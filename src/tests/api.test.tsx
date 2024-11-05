import { getAllData } from "../services/api";
import { ApiResponse, Character, Film, Starship } from "../types/types";

jest.mock("../services/api", () => ({
  ...jest.requireActual("../services/api"),
  api: {
    get: jest.fn(),
  },
}));

import { api } from "../services/api";

describe("getAllData", () => {
  jest.setTimeout(10000);

  it("should fetch and return character, film, and starship data", async () => {
    const charactersResponse: ApiResponse<Character> = {
      results: [
        { id: "1", name: "Luke Skywalker", films: ["1"], starships: ["10"] },
      ],
      count: 1,
    };

    const filmsResponse: ApiResponse<Film> = {
      results: [{ id: "1", title: "A New Hope" }],
      count: 1,
    };

    const starshipsResponse: ApiResponse<Starship> = {
      results: [{ id: "10", name: "X-wing" }],
      count: 1,
    };

    (api.get as jest.Mock).mockImplementation((url) => {
      console.log("Mocked API call:", url);
      if (url.includes("/people")) {
        return Promise.resolve({ data: charactersResponse });
      }
      if (url.includes("/films")) {
        return Promise.resolve({ data: filmsResponse });
      }
      if (url.includes("/starships")) {
        return Promise.resolve({ data: starshipsResponse });
      }
      return Promise.reject(new Error("Unknown URL"));
    });

    const data = await getAllData(1);

    expect(data.characters[0].name).toBe("Obi-Wan Kenobi");
    expect(data.characters[0].films).toContain("A New Hope");
    expect(data.total).toBe(82);
  });
});
