import React from "react";
import CharacterList from "./components/CharacterList";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Star Wars Character Viewer</h1>
      <CharacterList />
    </div>
  );
};

export default App;
