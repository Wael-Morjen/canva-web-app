// Import necessary dependencies
'use client';
import { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import Canvas from '../components/Canvas';
import Tools from '../components/Tools';

// Home component definition
const Home = () => {
  // State variables
  const [currentTool, setCurrentTool] = useState('pencil');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  // useEffect to handle screen width changes and set isMobile accordingly
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Initial check on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to toggle the visibility of tools
  const toggleTools = () => {
    if (isToolsOpen && isMobile) {
      setIsToolsOpen(false);
    } else {
      setIsToolsOpen(!isToolsOpen);
    }
  };

  // Functions to set the current tool (pencil, eraser, color)
  const selectPencil = () => {
    setCurrentTool('pencil');
    // Set the color to black explicitly when pencil is selected
    selectColor('#000000');
  };

  const selectEraser = () => {
    setCurrentTool('eraser');
  };

  const selectColor = (color) => {
    setCurrentTool(color);
  };

  // Function to save the drawing
  const saveDrawing = () => {
    const canvas = document.getElementById('drawing-canvas');
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'drawing.png';
    a.click();
  };

  // Function to add an image to the canvas
  const addImage = (imageData) => {
    const canvas = document.getElementById('drawing-canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  // Function to reset the canvas
  const resetCanvas = () => {
    const canvas = document.getElementById('drawing-canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 5;
  };

  // JSX structure for the Home component
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {/* Canvas component */}
      <Canvas
        currentTool={currentTool}
        addImage={addImage}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        resetCanvas={resetCanvas}
      />
      {/* Tools section for mobile devices */}
      {isMobile && !isDrawing && (
        <>
          <button onClick={toggleTools} className="fixed top-4 right-4 p-3 rounded-full bg-white shadow-md transition duration-300 hover:bg-gray-200">
            <FaCog size={24} />
          </button>
          {isToolsOpen && (
            <Tools
              selectPencil={selectPencil}
              selectEraser={selectEraser}
              selectColor={selectColor}
              saveDrawing={saveDrawing}
              addImage={addImage}
              isDrawing={isDrawing}
              selectedColor={currentTool}
              setIsToolsOpen={setIsToolsOpen}
            />
          )}
        </>
      )}
      {/* Tools section for non-mobile devices */}
      {!isDrawing && !isMobile && (
        <Tools
          selectPencil={selectPencil}
          selectEraser={selectEraser}
          selectColor={selectColor}
          saveDrawing={saveDrawing}
          addImage={addImage}
          isDrawing={isDrawing}
          selectedColor={currentTool}
          setIsToolsOpen={setIsToolsOpen}
        />
      )}
    </div>
  );
};

// Export the Home component
export default Home;
