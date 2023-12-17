import { useState, useRef } from 'react';

import { FaPencilAlt, FaEraser, FaSave, FaCamera, FaFile } from 'react-icons/fa';
import Webcam from 'react-webcam';


const Tools = ({ selectPencil, selectEraser, selectColor, saveDrawing, addImage, isDrawing, setIsToolsOpen, selectedColor }) => {
  // State and ref initialization
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const inputRef = useRef(null);

  // Function to open the camera
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  // Function to close the camera
  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  // Function to capture an image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    addImage(imageSrc);
    closeCamera();
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Array of color options
  const colors = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#ffff00'];

  // Tooltips for each tool
  const tooltips = {
    pencil: 'Draw',
    eraser: 'Eraser',
    save: 'Save',
    camera: 'Camera',
    file: 'Import',
  };

  // Function to get tooltip text for a given tool
  const getTooltipText = (tool) => {
    return tooltips[tool.toLowerCase()] || '';
  };

  // ToolButton component for each tool
  const ToolButton = ({ onClick, icon, tooltip, closeTools }) => {
    const handleClick = () => {
      onClick();
      closeTools();
    };

    return (
      <button
        onClick={handleClick}
        className="p-3 rounded-full hover:bg-gray-200 relative transition duration-300 flex flex-col items-center"
      >
        <div className="flex items-center flex-col">
          {icon}
          <span className="tooltip">{tooltip}</span>
        </div>
      </button>
    );
  };

  // Return the JSX structure for the Tools component
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 sm:flex sm:justify-center sm:items-center ${isDrawing ? 'hidden' : ''}`}>
      <div className="bg-white p-3 rounded-lg border border-gray-300 flex items-center flex-wrap gap-4">
        {/* Tool buttons for pencil, eraser, and save */}
        <ToolButton onClick={selectPencil} icon={<FaPencilAlt size={24} />} tooltip={getTooltipText('pencil')} closeTools={() => setIsToolsOpen(false)} />
        <ToolButton onClick={selectEraser} icon={<FaEraser size={24} />} tooltip={getTooltipText('eraser')} closeTools={() => setIsToolsOpen(false)} />
        <ToolButton onClick={saveDrawing} icon={<FaSave size={24} />} tooltip={getTooltipText('save')} closeTools={() => setIsToolsOpen(false)} />

        {/* Webcam capture button when the camera is open */}
        {isCameraOpen && (
          <div className="flex flex-col items-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              className="mb-2"
            />
            <button onClick={captureImage} className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md">
              Capture Image
            </button>
          </div>
        )}

        {/* Button to open the camera */}
        {!isCameraOpen && (
          <button
            onClick={openCamera}
            className={`p-3 rounded-full hover:bg-gray-200 relative transition duration-300 sm:hidden flex flex-col ${isCameraOpen ? 'text-blue-500' : ''}`}
          >
            <div className="flex items-center flex-col">
              <FaCamera size={24} />
              <span className="tooltip">{getTooltipText('camera')}</span>
            </div>
          </button>
        )}

        {/* Button to trigger file input for image upload */}
        <button
          className="cursor-pointer p-3 rounded-full hover:bg-gray-200 relative transition duration-300 flex flex-col items-center"
          onClick={() => inputRef.current.click()}
        >
          <div className="flex items-center flex-col">
            <label htmlFor="file-upload" className="cursor-pointer">
              <FaFile size={24} />
              <input
                id="file-upload"
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <span className="tooltip">{getTooltipText('file')}</span>
          </div>
        </button>

        {/* Color selection buttons */}
        <div className="flex items-center ml-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => selectColor(color)}
              style={{
                backgroundColor: color,
                border: `1px solid ${color === selectedColor ? '#000' : 'gray'}`,
                borderWidth: color === selectedColor ? '2px' : '1px',
                boxShadow: color === selectedColor ? '0 0 6px rgba(0, 0, 0, 0.5)' : 'none'
              }}
              className="w-8 h-8 mx-1 border border-gray-600 rounded-full hover:bg-gray-200 transition duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
