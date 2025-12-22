
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, X } from "lucide-react";

interface GameColorMatchProps {
  game: Game;
  onComplete: (score: number) => void;
}

const colors = [
  { name: "Red", hex: "#EF4444" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Green", hex: "#10B981" },
  { name: "Yellow", hex: "#F59E0B" },
  { name: "Purple", hex: "#8B5CF6" }
];

const GameColorMatch: React.FC<GameColorMatchProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds] = useState(10);
  const [currentChallenge, setCurrentChallenge] = useState({ colorName: "", textColor: "", isMatch: false });
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  
  // Generate a new color challenge
  const generateChallenge = () => {
    const colorNameIndex = Math.floor(Math.random() * colors.length);
    const colorName = colors[colorNameIndex].name;
    
    // 50% chance the display color matches the name
    const isMatch = Math.random() > 0.5;
    
    let textColorIndex;
    if (isMatch) {
      textColorIndex = colorNameIndex;
    } else {
      // Pick a different color for non-match
      do {
        textColorIndex = Math.floor(Math.random() * colors.length);
      } while (textColorIndex === colorNameIndex);
    }
    
    return {
      colorName,
      textColor: colors[textColorIndex].hex,
      isMatch
    };
  };
  
  const handleAnswer = (answer: boolean) => {
    // Check if the answer matches the challenge
    const isCorrect = answer === currentChallenge.isMatch;
    
    if (isCorrect) {
      setScore(score + 10);
      toast({
        title: "Correct!",
        description: "+10 points",
        duration: 1000,
      });
    } else {
      toast({
        title: "Incorrect!",
        description: "No points awarded",
        duration: 1000,
      });
    }
    
    // Move to next round
    setCurrentRound(currentRound + 1);
    
    // End game if we've reached the total rounds
    if (currentRound + 1 >= totalRounds) {
      setGameOver(true);
    } else {
      // Generate next challenge
      setCurrentChallenge(generateChallenge());
    }
  };
  
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentRound(0);
    setGameOver(false);
    setTimeLeft(30);
    setCurrentChallenge(generateChallenge());
    
    toast({
      title: "Game Started",
      description: "Match the color with the word!",
      duration: 1500,
    });
  };
  
  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);
  
  // Effect when game is over
  useEffect(() => {
    if (gameOver) {
      // Wait a moment to show final score
      const timeout = setTimeout(() => {
        onComplete(score);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [gameOver, score, onComplete]);

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready to test your attention?</p>
          <p className="text-sm text-gray-600">
            Determine if the color of the word matches what the word says!
          </p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {!gameOver ? (
            <>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-gray-500">Round:</span>
                  <span className="font-bold ml-1">{currentRound + 1}/{totalRounds}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time Left:</span>
                  <span className={`font-bold ml-1 ${timeLeft < 10 ? 'text-red-500' : ''}`}>{timeLeft}s</span>
                </div>
                <div>
                  <span className="text-gray-500">Score:</span>
                  <span className="font-bold ml-1">{score}</span>
                </div>
              </div>
              
              <div className="py-12 px-4 flex justify-center items-center">
                <h2 
                  className="text-5xl font-bold" 
                  style={{ color: currentChallenge.textColor }}
                >
                  {currentChallenge.colorName}
                </h2>
              </div>
              
              <div className="text-center">
                <p className="mb-4 text-sm text-gray-600">
                  Does the color of the text match the word itself?
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={() => handleAnswer(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-8"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Yes, it matches
                  </Button>
                  <Button 
                    onClick={() => handleAnswer(false)}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8"
                  >
                    <X className="mr-2 h-4 w-4" />
                    No, different
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-8">
              <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
              <p className="text-gray-600 mb-4">You completed {currentRound} of {totalRounds} rounds</p>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <p className="text-lg font-medium text-gray-800 mb-1">Your Final Score</p>
                <p className="text-4xl font-bold text-purple-600">{score}</p>
              </div>
              
              <Button 
                onClick={startGame}
                style={{ backgroundColor: game.color, color: "#fff" }}
              >
                Play Again
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameColorMatch;
