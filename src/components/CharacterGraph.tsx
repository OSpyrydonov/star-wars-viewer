import React from "react";
import ReactFlow, { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { Character } from "../types/types";

interface CharacterGraphProps {
  character: Character;
}

const CharacterGraph: React.FC<CharacterGraphProps> = ({ character }) => {
  const nodes: Node[] = [
    {
      id: character.id.toString(),
      type: "default",
      position: { x: 250, y: 0 },
      data: { label: character.name },
    },
    ...character.films.map((film, index) => ({
      id: `film-${character.id}-${index}`,
      type: "default",
      position: { x: 155 * (index - 0.5), y: 150 },
      data: { label: film },
    })),
    ...character.starships.map((starship, index) => ({
      id: `starship-${character.id}-${index}`,
      type: "default",
      position: { x: 155 * (index + 0.25), y: 300 },
      data: { label: starship },
    })),
  ];

  // Створення зв'язків
  const edges: Edge[] = [
    ...character.films.map((_, index) => ({
      id: `e-${character.id}-film-${index}`,
      source: character.id.toString(),
      target: `film-${character.id}-${index}`,
    })),
    ...character.starships.map((_, index) => ({
      id: `e-${character.id}-starship-${index}`,
      source: character.id.toString(),
      target: `starship-${character.id}-${index}`,
    })),
  ];

  return (
    <div style={{ height: 550 }}>
      {nodes.length <= 1 ? (
        <div>No data available for this character.</div>
      ) : (
        <ReactFlow nodes={nodes} edges={edges} fitView />
      )}
    </div>
  );
};

export default CharacterGraph;
