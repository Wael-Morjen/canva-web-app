'use client'

import { useState } from 'react';

import Canvas from '../components/Canvas';
import Tools from '../components/Tools';

const Home = () => {
  const [currentTool, setCurrentTool] = useState('pencil');
  const [isDrawing, setIsDrawing] = useState(false);

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

  const saveDrawing = () => {
    const canvas = document.getElementById('drawing-canvas');
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'drawing.png';
    a.click();
  };

  const addImage = (imageData) => {
    const canvas = document.getElementById('drawing-canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const resetCanvas = () => {
    const canvas = document.getElementById('drawing-canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 5;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Canvas
        currentTool={currentTool}
        addImage={addImage}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        resetCanvas={resetCanvas}
      />
      {!isDrawing && (
        <Tools
          selectPencil={selectPencil}
          selectEraser={selectEraser}
          selectColor={selectColor}
          saveDrawing={saveDrawing}
          addImage={addImage}
          isDrawing={isDrawing}
        />
      )}
    </div>
  );
};

export default Home;
