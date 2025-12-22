
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Cake, MousePointer, Star, RotateCcw as Reset } from "lucide-react";

interface CakeDecorationGameProps {
  onClose: () => void;
}

const CakeDecorationGame: React.FC<CakeDecorationGameProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [icingColor, setIcingColor] = useState<string>("#FF88B7");
  const [icingPoints, setIcingPoints] = useState<{x: number, y: number}[]>([]);
  const [completedIcing, setCompletedIcing] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (completedIcing) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIcingPoints(prev => [...prev, {x, y}]);
    setGameScore(prev => prev + 1);
    
    if (icingPoints.length > 25) {
      setCompletedIcing(true);
      toast({
        title: "Cake Decorated!",
        description: "Beautiful job! Your cake looks delicious!",
        duration: 3000,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (completedIcing || e.buttons !== 1) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lastPoint = icingPoints[icingPoints.length - 1];
    if (lastPoint) {
      const distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
      if (distance > 5) {
        setIcingPoints(prev => [...prev, {x, y}]);
        setGameScore(prev => prev + 1);
      }
    } else {
      setIcingPoints(prev => [...prev, {x, y}]);
      setGameScore(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setIcingPoints([]);
    setCompletedIcing(false);
    setGameScore(0);
    toast({
      title: "Fresh Canvas",
      description: "Start decorating your cake again!"
    });
  };

  const handleComplete = () => {
    onClose();
    toast({
      title: "You did great!",
      description: "Now let's explore our mental wellness tools!"
    });
  };

  return (
    <motion.div 
      className="mb-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#F9F5F3] to-[#F5EAE5] p-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md text-center mb-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Cake Decoration Fun!</h2>
        <p className="text-gray-600 mb-4">
          Taking care of your mental health can be fun! Decorate this cake by clicking and dragging to add icing.
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <Button 
            className="bg-[#FF88B7] hover:bg-[#FF67A0] h-10 w-10 rounded-full p-0"
            onClick={() => setIcingColor("#FF88B7")}
            variant={icingColor === "#FF88B7" ? "default" : "outline"}
          />
          <Button 
            className="bg-[#88B7FF] hover:bg-[#67A0FF] h-10 w-10 rounded-full p-0"
            onClick={() => setIcingColor("#88B7FF")}
            variant={icingColor === "#88B7FF" ? "default" : "outline"}
          />
          <Button 
            className="bg-[#B7FF88] hover:bg-[#A0FF67] h-10 w-10 rounded-full p-0"
            onClick={() => setIcingColor("#B7FF88")}
            variant={icingColor === "#B7FF88" ? "default" : "outline"}
          />
          <Button 
            className="bg-[#FFDD88] hover:bg-[#FFCC67] h-10 w-10 rounded-full p-0"
            onClick={() => setIcingColor("#FFDD88")}
            variant={icingColor === "#FFDD88" ? "default" : "outline"}
          />
          <Button 
            className="bg-[#D088FF] hover:bg-[#C067FF] h-10 w-10 rounded-full p-0"
            onClick={() => setIcingColor("#D088FF")}
            variant={icingColor === "#D088FF" ? "default" : "outline"}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-white/80 px-3 py-1 rounded-full flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-semibold text-gray-700">Your Score: {gameScore}</span>
          </div>
        </div>
      </div>
      
      <div 
        ref={canvasRef}
        className="relative h-[400px] bg-gradient-to-b from-[#FCEEF2] to-[#F9F5F3] rounded-xl shadow-xl overflow-hidden cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <MousePointer className="h-4 w-4 text-[#B87333] inline mr-1" />
          <span className="text-sm text-gray-700">Click and drag to decorate!</span>
        </div>
        
        <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2 w-[300px] h-[200px] bg-[#F7D3A5] rounded-xl shadow-md">
          <div className="absolute top-0 left-0 right-0 h-[15px] bg-[#FFEAD5] rounded-t-xl"></div>
        </div>
        
        <div className="absolute left-1/2 bottom-[170px] transform -translate-x-1/2 w-[250px] h-[100px] bg-[#F7D3A5] rounded-xl shadow-md">
          <div className="absolute top-0 left-0 right-0 h-[10px] bg-[#FFEAD5] rounded-t-xl"></div>
        </div>
        
        <div className="absolute left-1/2 bottom-[260px] transform -translate-x-1/2 w-[30px] h-[30px] bg-[#FF9B9B] rounded-full shadow-md flex items-center justify-center">
          <Cake className="h-5 w-5 text-white" />
        </div>
        
        {icingPoints.map((point, index) => (
          <motion.div 
            key={index}
            className="absolute rounded-full"
            style={{ 
              left: point.x, 
              top: point.y, 
              backgroundColor: icingColor,
              width: Math.random() * 10 + 10, 
              height: Math.random() * 10 + 10,
              zIndex: 10
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        ))}
        
        {completedIcing && (
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="mb-2 flex justify-center">
              <Star className="h-16 w-16 text-yellow-500 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Wonderful Job!</h3>
            <p className="text-gray-600 mb-4">Your decorated cake looks amazing! Just like with this fun activity, mental wellness tools can bring joy and satisfaction into your life.</p>
            <Button 
              onClick={handleComplete}
              className="bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:from-[#A76323] hover:to-[#8b77e5]"
            >
              Explore Wellness Tools
            </Button>
          </motion.div>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <p className="text-gray-600 text-center">
          <span className="font-medium">Mental wellness can be fun and creative!</span> Just like decorating this cake, 
          taking small, enjoyable steps each day can build toward better mental health.
        </p>
        
        <div className="flex justify-center mt-4">
          <Button 
            onClick={onClose}
            variant="outline"
            className="mr-2"
          >
            Close Fun Zone
          </Button>
          <Button 
            onClick={resetGame}
            className="bg-[#9b87f5] hover:bg-[#8b77e5]"
          >
            <Reset className="h-4 w-4 mr-2" /> Reset Decoration
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CakeDecorationGame;
