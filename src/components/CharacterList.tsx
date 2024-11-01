import React, { useEffect, useState } from "react";
import { getAllData } from "../services/api";
import { Character } from "../types/types";
import CharacterGraph from "./CharacterGraph";
import "./CharacterList.css";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { characters, total } = await getAllData(page);
      setCharacters(characters);
      setTotal(total);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      setError("Failed to fetch characters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < Math.ceil(total / 10)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="character-container">
      <div className="character-list">
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <button onClick={() => handleCharacterClick(character)}>
                {character.name}
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>
            {" "}
            Page {page} of {Math.ceil(total / 10)}{" "}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === Math.ceil(total / 10)}
          >
            Next
          </button>
        </div>
      </div>
      <div className="character-graph">
        {selectedCharacter ? (
          <CharacterGraph character={selectedCharacter} />
        ) : (
          <div className="placeholder">
            Select a character to view the graph
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
