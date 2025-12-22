
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameReactionTimeProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameReactionTime: React.FC<GameReactionTimeProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<"waiting" | "ready" | "clicked" | "tooEarly">("waiting");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const startGame = () => {
    setStatus("waiting");
    setReactionTime(null);
    
    // Random delay between 1-5 seconds
    const delay = Math.floor(Math.random() * 4000) + 1000;
    
    timeout.current = setTimeout(() => {
      setStartTime(Date.now());
      setStatus("ready");
    }, delay);
  };

  const handleClick = () => {
    if (status === "waiting") {
      // Clicked too early
      if (timeout.current) clearTimeout(timeout.current);
      setStatus("tooEarly");
    } else if (status === "ready") {
      // Good click
      const endTime = Date.now();
      const time = startTime ? endTime - startTime : 0;
      setReactionTime(time);
      setStatus("clicked");
      setAttempts(attempts + 1);
      
      // Update best time
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
      
      // After 3 attempts, finish the game
      if (attempts >= 2) {
        setTimeout(() => {
          // Convert best time to a score: faster = higher score
          // For example, 200ms -> 90 points, 300ms -> 80 points, etc.
          const score = bestTime ? Math.max(0, 100 - Math.floor(bestTime / 10)) : 0;
          onComplete(score);
        }, 1500);
      }
    }
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-6">
        <p className="text-lg font-medium">Test your reaction time!</p>
        <p className="text-sm text-gray-600">
          Wait for the box to turn green, then click as quickly as possible.
        </p>
        {attempts < 3 && (
          <p className="text-sm text-gray-600 mt-1">
            {attempts}/3 attempts completed
          </p>
        )}
      </div>
      
      <div 
        className={`w-full h-48 rounded-lg cursor-pointer mb-6 flex items-center justify-center transition-all duration-200 ${
          status === "waiting" ? "bg-blue-100" :
          status === "ready" ? "bg-green-500" :
          status === "clicked" ? "bg-purple-100" :
          "bg-red-100"
        }`}
        onClick={handleClick}
      >
        {status === "waiting" && <p className="text-blue-800 font-medium">Wait...</p>}
        {status === "ready" && <p className="text-white font-medium">Click Now!</p>}
        {status === "clicked" && (
          <div className="text-purple-800">
            <p className="font-bold text-2xl">{reactionTime} ms</p>
            <p className="text-sm">Your reaction time</p>
          </div>
        )}
        {status === "tooEarly" && <p className="text-red-800 font-medium">Too early! Try again.</p>}
      </div>
      
      {bestTime !== null && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Best Time</p>
          <p className="text-lg font-bold">{bestTime} ms</p>
        </div>
      )}
      
      {(status === "clicked" || status === "tooEarly") && attempts < 3 && (
        <Button 
          onClick={startGame}
          style={{ backgroundColor: game.color, color: "#fff" }}
        >
          Try Again
        </Button>
      )}
      
      {status === "waiting" && (
        <Button 
          variant="outline"
          onClick={() => {
            if (timeout.current) clearTimeout(timeout.current);
            setStatus("tooEarly");
          }}
        >
          Cancel
        </Button>
      )}
      
      {attempts === 0 && status !== "waiting" && (
        <Button 
          onClick={startGame}
          style={{ backgroundColor: game.color, color: "#fff" }}
        >
          Start Game
        </Button>
      )}
    </div>
  );
};

export default GameReactionTime;
