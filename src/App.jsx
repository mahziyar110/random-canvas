import { useState } from "react";
import "./App.css";

import CanvasGrid from "./components/CanvasGrid";
import Controls from "./components/Controls";

const App = () => {
  const DEFAULT_COLORS = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8000",
    "#8000ff",
  ];

  const [gridSize, setGridSize] = useState(2);
  const [generate, setGenerate] = useState(false);
  const [numColors, setNumColors] = useState(2);
  const [colors, setColors] = useState(DEFAULT_COLORS.slice(0, numColors));

  const handleGridSizeChange = (e) => {
    setGenerate(false);
    setGridSize(parseInt(e.target.value, 10));
  };

  const handleGenerate = () => {
    setGenerate(false);
    setTimeout(() => setGenerate(true), 0);
  };

  const handleClear = () => {
    setGenerate(false);
  };

  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleNumColorsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumColors(num);

    if (num <= colors.length) {
      colors.length = num;
    } else {
      setColors((prevColors) => [
        ...prevColors,
        ...DEFAULT_COLORS.slice(colors.length, num),
      ]);
    }
  };

  return (
    <>
      <h2>Random Color Grid Generator</h2>

      <div className="container">
        <div className="controls-container">
          <Controls
            handleGridSizeChange={handleGridSizeChange}
            handleNumColorsChange={handleNumColorsChange}
            colors={colors}
            handleColorChange={handleColorChange}
            handleGenerate={handleGenerate}
            handleClear={handleClear}
          />
          <div>
            {gridSize <= 4 && (
              <span>
                Test your luck! Can you fill all cells with the same color?
              </span>
            )}
            {gridSize == 8 && <span>Can you create a chessboard?</span>}
            {gridSize >= 16 && gridSize <= 32 && (
              <span>A little more space. How about a pattern?</span>
            )}
            {gridSize >= 64 && gridSize <= 128 && (
              <span>
                Let&apos;s see if you can make it feel like a work of art!
              </span>
            )}
            {gridSize >= 256 && <span>Going for the Mona Lisa, eh?</span>}
          </div>
        </div>
        <div className="canvas-container">
          <CanvasGrid gridSize={gridSize} colors={colors} generate={generate} />
        </div>
      </div>
    </>
  );
};

export default App;
