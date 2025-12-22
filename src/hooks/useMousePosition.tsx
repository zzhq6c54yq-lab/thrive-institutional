
import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
