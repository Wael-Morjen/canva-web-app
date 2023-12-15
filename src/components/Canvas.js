import { useRef, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const Canvas = ({ currentTool, isDrawing, setIsDrawing, resetCanvas }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent.touches ? nativeEvent.touches[0] : nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(clientX, clientY);
    setIsDrawing(true);
  };

  const drawWithColor = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { clientX, clientY } = nativeEvent.touches ? nativeEvent.touches[0] : nativeEvent;

    if (currentTool === 'eraser') {
      contextRef.current.strokeStyle = '#ffffff'; // White color for eraser
    } else {
      contextRef.current.strokeStyle = currentTool;
    }

    contextRef.current.lineTo(clientX, clientY);
    contextRef.current.stroke();
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        id="drawing-canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={drawWithColor}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={drawWithColor}
        onTouchEnd={endDrawing}
        className="w-full h-full"
      />
      {!isDrawing && (
        <button
          onClick={resetCanvas}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-white shadow-md transition duration-300 hover:bg-gray-200"
        >
          <FaTrash size={24} />
        </button>
      )}
    </div>
  );
};

export default Canvas;
