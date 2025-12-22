import React from 'react';
import { Play, Pause, Square, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface WorkshopNarratorProps {
  isPlaying: boolean;
  isPaused: boolean;
  rate: number;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onRateChange: (rate: number) => void;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
}

const WorkshopNarrator: React.FC<WorkshopNarratorProps> = ({
  isPlaying,
  isPaused,
  rate,
  availableVoices,
  selectedVoice,
  onPlay,
  onPause,
  onStop,
  onRateChange,
  onVoiceChange,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
      {/* Playback Controls */}
      <div className="flex items-center gap-2">
        {!isPlaying || isPaused ? (
          <Button
            onClick={onPlay}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Play className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            onClick={onPause}
            size="icon"
            variant="outline"
          >
            <Pause className="h-5 w-5" />
          </Button>
        )}
        
        <Button
          onClick={onStop}
          size="icon"
          variant="outline"
          disabled={!isPlaying && !isPaused}
        >
          <Square className="h-4 w-4" />
        </Button>

        <div className="ml-auto flex items-center gap-4">
          {/* Speed Control */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider
              value={[rate]}
              onValueChange={([value]) => onRateChange(value)}
              min={0.5}
              max={2}
              step={0.1}
              className="flex-1"
            />
            <span className="text-sm font-medium w-10">{rate.toFixed(1)}x</span>
          </div>

          {/* Voice Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Voice:</span>
            <Select
              value={selectedVoice?.name}
              onValueChange={(voiceName) => {
                const voice = availableVoices.find(v => v.name === voiceName);
                if (voice) onVoiceChange(voice);
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopNarrator;
