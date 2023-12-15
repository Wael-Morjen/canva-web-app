import { FaPencilAlt, FaEraser, FaSave, FaCamera, FaFile } from 'react-icons/fa';
import { useState, useRef } from 'react';

const Tools = ({ selectPencil, selectEraser, selectColor, saveDrawing, addImage, isDrawing }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const inputRef = useRef(null);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

      const video = document.createElement('video');
      document.body.appendChild(video);
      video.srcObject = mediaStream;
      video.play();

      video.addEventListener('loadedmetadata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/png');
        addImage(imageData);

        mediaStream.getTracks().forEach((track) => track.stop());
        document.body.removeChild(video);
        setIsCameraOpen(false);
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsCameraOpen(false);
    }
  };

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

  const colors = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#ffff00'];

  const tooltips = {
    pencil: 'Draw',
    eraser: 'Eraser',
    save: 'Save',
    camera: 'Camera',
    file: 'Import',
  };

  const getTooltipText = (tool) => {
    return tooltips[tool.toLowerCase()] || '';
  };

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 sm:flex sm:justify-center sm:items-center ${isDrawing ? 'hidden' : ''}`}>
      <div className="bg-white p-3 rounded-lg border border-gray-300 flex items-center flex-wrap gap-4">
        <ToolButton onClick={selectPencil} icon={<FaPencilAlt size={24} />} tooltip={getTooltipText('pencil')} />
        <ToolButton onClick={selectEraser} icon={<FaEraser size={24} />} tooltip={getTooltipText('eraser')} />
        <ToolButton onClick={saveDrawing} icon={<FaSave size={24} />} tooltip={getTooltipText('save')} />

        {/* Camera button will only be visible on small screens (mobile devices) */}
        <button
          onClick={openCamera}
          className={`p-3 rounded-full hover:bg-gray-200 relative transition duration-300 sm:hidden flex flex-col items-center ${isCameraOpen ? 'text-blue-500' : ''}`}
        >
          <div className="flex items-center flex-col">
            <FaCamera size={24} />
            <span className="tooltip">{getTooltipText('camera')}</span>
          </div>
        </button>

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

        <div className="flex items-center ml-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => selectColor(color)}
              style={{ backgroundColor: color }}
              className="w-8 h-8 mx-1 border border-gray-600 rounded-full hover:bg-gray-200 transition duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// A reusable button with transitions
const ToolButton = ({ onClick, icon, tooltip }) => {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-full hover:bg-gray-200 relative transition duration-300 flex flex-col items-center"
    >
      <div className="flex items-center flex-col">
        {icon}
        <span className="tooltip">{tooltip}</span>
      </div>
    </button>
  );
};

export default Tools;
