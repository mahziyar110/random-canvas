const Controls = ({
  handleGridSizeChange,
  handleNumColorsChange,
  colors,
  handleColorChange,
  handleGenerate,
  handleClear,
}) => {
  return (
    <>
      <div>
        <label htmlFor="gridSize">Grid Size:</label>
        <select id="gridSize" onChange={handleGridSizeChange}>
          {[...Array(8).keys()].map((i) => (
            <option key={i} value={2 ** (i + 1)}>
              {2 ** (i + 1)} X {2 ** (i + 1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="numColors">No. of Colors:</label>
        <select id="numColors" onChange={handleNumColorsChange}>
          {[...Array(9).keys()].map((i) => (
            <option key={i + 2} value={i + 2}>
              {i + 2}
            </option>
          ))}
        </select>

        <div>
          {colors.map((color, index) => (
            <input
              key={index}
              className="color-picker"
              type="color"
              value={color}
              onChange={(e) => {
                handleColorChange(index, e.target.value);
              }}
            />
          ))}
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </>
  );
};

export default Controls;
