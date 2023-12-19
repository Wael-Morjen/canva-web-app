import { useRef, useEffect } from 'react';

import { FaTrash } from 'react-icons/fa';


const Canvas = ({ currentTool, isDrawing, setIsDrawing, resetCanvas }) => {
  // Refs for canvas and context
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // Set up the canvas and context on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  // Function to start drawing
  const startDrawing = ({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent.touches ? nativeEvent.touches[0] : nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(clientX, clientY);
    setIsDrawing(true);
  };

  // Function to draw with the selected color
  const drawWithColor = (event) => {
    event.preventDefault(); // Prevent the default touch move behavior (scrolling)
    
    if (!isDrawing) return;
    const { clientX, clientY } = event.touches ? event.touches[0] : event;

    // Set color based on the current tool
    if (currentTool === 'eraser') {
      contextRef.current.strokeStyle = '#ffffff';
    } else {
      contextRef.current.strokeStyle = currentTool;
    }

    contextRef.current.lineTo(clientX, clientY);
    contextRef.current.stroke();
  };


  // Function to end drawing
  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  // Return the JSX structure for the Canvas component
  return (
    <div className="relative w-full h-full">
      {/* Canvas for drawing */}
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
