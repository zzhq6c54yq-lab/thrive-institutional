import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListChecks, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { useCompassionateToast } from "@/hooks/useCompassionateToast";

const wordList = [
  { word: "CALM", hint: "A peaceful state of mind" },
  { word: "HOPE", hint: "Belief that good things will happen" },
  { word: "PEACE", hint: "Freedom from disturbance" },
  { word: "LOVE", hint: "Deep affection for someone" },
  { word: "BRAVE", hint: "Ready to face danger or pain" },
  { word: "HAPPY", hint: "Feeling pleasure or contentment" },
  { word: "STRONG", hint: "Having power and resilience" },
  { word: "TRUST", hint: "Firm belief in reliability" },
  { word: "GROWTH", hint: "Process of developing" },
  { word: "KINDNESS", hint: "Quality of being friendly and generous" },
];

const scrambleWord = (word: string): string => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Make sure it's actually scrambled
  if (arr.join('') === word) {
    return scrambleWord(word);
  }
  return arr.join('');
};

const GameWordUnscramble: React.FC = () => {
  const { showSuccess, toast } = useCompassionateToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentWord = wordList[currentIndex];

  useEffect(() => {
    setScrambled(scrambleWord(currentWord.word));
    setGuess("");
    setShowResult(null);
    setShowHint(false);
  }, [currentIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);

    if (guess.toUpperCase() === currentWord.word) {
      setShowResult('correct');
      setScore(prev => prev + 1);
      showSuccess("Well done!", "You unscrambled the word correctly!");
      
      setTimeout(() => {
        if (currentIndex < wordList.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          toast({
            title: "Game Complete!",
            description: `You scored ${score + 1} out of ${wordList.length}. Great job!`,
          });
        }
      }, 1500);
    } else {
      setShowResult('incorrect');
      setTimeout(() => setShowResult(null), 1000);
    }
  };

  const handleSkip = () => {
    if (currentIndex < wordList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setGuess("");
    setShowResult(null);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-pink-100 to-fuchsia-100 dark:from-pink-950/30 dark:to-fuchsia-950/30 min-h-[60vh] rounded-xl shadow-lg">
      <ListChecks className="w-14 h-14 text-fuchsia-700 dark:text-fuchsia-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-fuchsia-950 dark:text-fuchsia-200">Word Unscramble</h2>
      <p className="text-lg text-fuchsia-700 dark:text-fuchsia-300 text-center mb-6 max-w-md">
        Unscramble the letters to discover the hidden word!
      </p>

      {/* Score Display */}
      <div className="flex gap-6 mb-6 text-sm text-fuchsia-700 dark:text-fuchsia-300">
        <span>Score: <strong>{score}</strong></span>
        <span>Word: <strong>{currentIndex + 1}/{wordList.length}</strong></span>
      </div>

      {/* Scrambled Word Display */}
      <div className="bg-white dark:bg-fuchsia-950/50 rounded-xl px-8 py-6 mb-6 shadow-inner">
        <div className="flex gap-2 justify-center">
          {scrambled.split('').map((letter, i) => (
            <span 
              key={i} 
              className="w-10 h-12 flex items-center justify-center bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-900 dark:text-fuchsia-100 text-2xl font-bold rounded-lg border-2 border-fuchsia-300 dark:border-fuchsia-700"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400 mb-4 italic">
          Hint: {currentWord.hint}
        </p>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
        <Input
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          placeholder="Type your answer..."
          className={`text-center text-lg font-medium uppercase ${
            showResult === 'correct' 
              ? 'border-green-500 bg-green-50' 
              : showResult === 'incorrect' 
                ? 'border-red-500 bg-red-50' 
                : ''
          }`}
          maxLength={currentWord.word.length}
          autoComplete="off"
        />

        {showResult === 'correct' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>Correct!</span>
          </div>
        )}

        {showResult === 'incorrect' && (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="w-5 h-5" />
            <span>Try again!</span>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-fuchsia-500 to-pink-400 hover:from-fuchsia-600 hover:to-pink-500 text-white font-bold"
            disabled={!guess || showResult === 'correct'}
          >
            Check Answer
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={() => setShowHint(true)}
            disabled={showHint}
            className="border-fuchsia-300 text-fuchsia-700"
          >
            Hint
          </Button>
        </div>

        <div className="flex gap-3 mt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleSkip}
            disabled={currentIndex >= wordList.length - 1}
            className="text-fuchsia-600"
          >
            Skip Word
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleRestart}
            className="text-fuchsia-600"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Restart
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GameWordUnscramble;
