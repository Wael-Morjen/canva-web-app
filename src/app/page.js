'use client';

import { useState } from 'react';

import Tools from "@/components/Tools";
import Canvas from "@/components/Canvas";

export default function Home() {
  const [currentTool, setCurrentTool] = useState('pencil');

  // Function to set the current tool to 'pencil' when the pencil button is clicked
  const selectPencil = () => {
    setCurrentTool('pencil');
  };

  // Function to set the current tool to 'eraser' when the eraser button is clicked
  const selectEraser = () => {
    setCurrentTool('eraser');
  };

  // Function to set the current tool to a selected color when a color button is clicked
  const selectColor = (color) => {
    setCurrentTool(color);
  };  

  // Function to save the drawing on the canvas as a PNG image
  const saveDrawing = () => {
    // Retrieve the canvas element by its ID
    const canvas = document.getElementById('drawing-canvas');

    // Convert the content of the canvas to a data URL representing a PNG image
    const dataUrl = canvas.toDataURL('image/png');

    // Create a temporary link element and trigger a download of the image
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'drawing.png';
    a.click();
  };  

  // Function to add an image to the canvas
  const addImage = (imageData) => {
    // Retrieve the canvas element by its ID
    const canvas = document.getElementById('drawing-canvas');

    // Retrieve the 2D rendering context of the canvas
    const context = canvas.getContext('2d');

    // Create a new image element
    const img = new Image();

    // Set the source of the image to the provided image data
    img.src = imageData;

    // Event handler for when the image is loaded
    img.onload = () => {
      // Draw the image on the canvas, scaling it to fit the canvas dimensions
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Canvas 
        currentTool={currentTool} 
        addImage={addImage} />
      <Tools
        selectPencil={selectPencil}
        selectEraser={selectEraser}
        selectColor={selectColor}
        saveDrawing={saveDrawing}
        addImage={addImage}
      />
    </div>
  )
}
