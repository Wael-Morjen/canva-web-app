import { useRef, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const Canvas = ({ currentTool, isDrawing, setIsDrawing, resetCanvas }) => {
  // Refs for canvas and context
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // Set up the canvas and context on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set initial dimensions and properties
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.lineCap = 'round';
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  // Function to start, draw, and end drawing
  const handleDrawing = ({ nativeEvent, type }) => {
    const { clientX, clientY } = nativeEvent.touches ? nativeEvent.touches[0] : nativeEvent;

    if (type === 'start') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(clientX, clientY);
      setIsDrawing(true);
    } else if (type === 'draw' && isDrawing) {
      contextRef.current.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentTool;
      contextRef.current.lineTo(clientX, clientY);
      contextRef.current.stroke();
    } else if (type === 'end') {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  // Return the JSX structure for the Canvas component
  return (
    <div className="relative w-full h-full">
      {/* Canvas for drawing */}
      <canvas
        id="drawing-canvas"
        ref={canvasRef}
        onMouseDown={(e) => handleDrawing({ nativeEvent: e, type: 'start' })}
        onMouseMove={(e) => handleDrawing({ nativeEvent: e, type: 'draw' })}
        onMouseUp={(e) => handleDrawing({ nativeEvent: e, type: 'end' })}
        onMouseOut={(e) => handleDrawing({ nativeEvent: e, type: 'end' })}
        onTouchStart={(e) => handleDrawing({ nativeEvent: e, type: 'start' })}
        onTouchMove={(e) => handleDrawing({ nativeEvent: e, type: 'draw' })}
        onTouchEnd={(e) => handleDrawing({ nativeEvent: e, type: 'end' })}
        className="w-full h-full"
      />
      {/* Trash button for clearing the canvas when not drawing */}
      {!isDrawing && (
        <button
          onClick={resetCanvas}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-white shadow-md transition duration-300 hover:bg-gray-200 hover:text-red-500"
        >
          <FaTrash size={24} />
        </button>
      )}
    </div>
  );
};

export default Canvas;
