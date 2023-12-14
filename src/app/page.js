'use client';

import Tools from "@/components/Tools";
import Canvas from "@/components/Canvas";

export default function Home() {
  const [currentTool, setCurrentTool] = useState('pencil');

  // Function to set the current tool to 'pencil' when the pencil button is clicked
  const selectPencil = () => {
    setCurrentTool('pencil');
  };

  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Canvas />
      <Tools />
    </div>
  )
}
