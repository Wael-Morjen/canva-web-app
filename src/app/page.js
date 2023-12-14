'use client';

import Tools from "@/components/Tools";
import Canvas from "../components/Canvas";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Canvas />
      <Tools />
    </div>
  )
}
