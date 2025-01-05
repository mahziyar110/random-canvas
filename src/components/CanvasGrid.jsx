import { useRef, useEffect } from "react";

const CanvasGrid = ({ gridSize, generate, colors }) => {
  const canvasRef = useRef(null);

  function clearGrid(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / gridSize;
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  function fillGrid(ctx, canvas) {
    const cellSize = canvas.width / gridSize;
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        let fillColor;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        fillColor = randomColor;

        ctx.fillStyle = fillColor;
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  const handleDownload = () => {
    const userConfirmed = window.confirm(
      "Do you want to download this generated grid as an image?"
    );
    if (userConfirmed) {
      const canvas = document.querySelector("canvas");
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "canvas-image.png";
      link.click();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const parent = canvas.parentElement;
    const size = Math.min(parent.offsetWidth, parent.offsetHeight);
    canvas.width = size;
    canvas.height = size;

    if (!generate) {
      clearGrid(ctx, canvas);
      return;
    }
    fillGrid(ctx, canvas);
  }, [generate, gridSize]);

  return (
    <>
      <canvas ref={canvasRef} />
      {generate && (
        <button
          className="download-btn"
          title="Download"
          onClick={handleDownload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
          >
            <path d="M12 21v-6M5 14l7 7 7-7M12 3v18"></path>
          </svg>
        </button>
      )}
    </>
  );
};

export default CanvasGrid;
