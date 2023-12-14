'use client';   

import { useRef, useEffect } from 'react';

const Canvas = ({ currentTool, addImage }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const isDrawing = useRef(false);
    
    // useEffect hook to set up the canvas and its context when the component mounts
    useEffect(() => {
        const canvas = canvasRef.current;
      
        // Set the width and height of the canvas to match the window dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext('2d');
      
        // Set the line cap style to 'round' and the line width to 5 pixels
        context.lineCap = 'round';
        context.lineWidth = 5;
      
        // Save the context reference for future use
        contextRef.current = context;
    }, []);


    // Function to handle the start of drawing
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        // Begin a new path and move to the starting point
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);

        isDrawing.current = true;
    };    
  
    return (
        <div>
            this is canvas
        </div>
    );
}

export default Canvas;