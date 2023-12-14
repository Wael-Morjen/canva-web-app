import { FaPencilAlt, FaEraser, FaPalette, FaSave, FaCamera } from 'react-icons/fa';
import { useState, useRef } from 'react';


// Define a functional component called 'Tools' which takes props such as 'selectPencil', 'selectEraser', 'selectColor', 'saveDrawing', and 'addImage'
const Tools = (selectPencil, selectEraser, selectColor, saveDrawing, addImage ) => {

    // Array of color options
    const colors = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#ffff00'];

    // State hook to manage the visibility of the camera input
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    // Ref hook to reference the file input element
    const inputRef = useRef(null);

    // Function to open the camera and trigger a click event on the hidden file input
    const openCamera = () => {
        setIsCameraOpen(true);
        inputRef.current.click();
    };

    // Function to handle the upload of an image file
    const handleImageUpload = (event) => {
        // Retrieve the selected file from the input element
        const file = event.target.files[0];

        // If a file is selected, read it as a data URL and add the image to the canvas
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
            addImage(e.target.result);
        };
        reader.readAsDataURL(file);
        }

        // Close the camera
        setIsCameraOpen(false);
    };

    return ( 
        <div className="fixed bottom-4 left-4 flex flex-col items-center">
            <button onClick={selectPencil}>
                <FaPencilAlt />
            </button>
            <button onClick={selectEraser}>
                <FaEraser />
            </button>
            <div className="flex">
            {/* Render color buttons based on the 'colors' array */}
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => selectColor(color)}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
            <button onClick={saveDrawing}>
                <FaSave />
            </button>
            <button onClick={openCamera}>
                <FaCamera />
            </button>
            {/* Hidden file input for image upload */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
            />
        </div>
     );
}
 
export default Tools;