
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameShapeFitProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameShapeFit: React.FC<GameShapeFitProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  // This is a simplified placeholder implementation
  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: "Rotate and place the shapes to fill the board completely!",
    });
  };

  const completeGame = () => {
    onComplete(score);
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready to test your spatial awareness?</p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">This is a placeholder for the Shape Fit game.</p>
            <p className="text-sm text-gray-600">In a full implementation, various shapes would appear here for you to rotate and fit together.</p>
            <div className="grid grid-cols-3 gap-2 my-4">
              <div className="h-16 bg-blue-200 rounded"></div>
              <div className="h-16 bg-red-200 rounded"></div>
              <div className="h-16 bg-green-200 rounded"></div>
              <div className="h-16 bg-yellow-200 rounded"></div>
              <div className="h-16 bg-purple-200 rounded"></div>
              <div className="h-16 bg-orange-200 rounded"></div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-bold">{score}</p>
          </div>
          
          <Button 
            onClick={completeGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Complete Game (Demo)
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameShapeFit;
