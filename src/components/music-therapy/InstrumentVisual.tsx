import React from 'react';
import PianoVisual from './PianoVisual';
import ViolinVisual from './ViolinVisual';
import CelloVisual from './CelloVisual';
import UkuleleVisual from './UkuleleVisual';

interface InstrumentVisualProps {
  selectedInstrument: string;
  activeNotes: Set<string>;
  activeChords: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
  octave: number;
  ukuleleStrum: boolean;
}

const InstrumentVisual: React.FC<InstrumentVisualProps> = ({
  selectedInstrument,
  activeNotes,
  activeChords,
  onNotePress,
  octave,
  ukuleleStrum
}) => {
  const renderInstrument = () => {
    switch (selectedInstrument) {
      case 'piano':
        return (
          <PianoVisual
            activeNotes={activeNotes}
            onNotePress={onNotePress}
            octave={octave}
          />
        );
      case 'violin':
        return (
          <ViolinVisual
            activeNotes={activeNotes}
            onNotePress={onNotePress}
            octave={octave}
          />
        );
      case 'cello':
        return (
          <CelloVisual
            activeNotes={activeNotes}
            onNotePress={onNotePress}
            octave={octave}
          />
        );
      case 'ukulele':
        return (
          <UkuleleVisual
            activeNotes={activeNotes}
            activeChords={activeChords}
            onNotePress={onNotePress}
            octave={octave}
            ukuleleStrum={ukuleleStrum}
          />
        );
      default:
        return (
          <CelloVisual
            activeNotes={activeNotes}
            onNotePress={onNotePress}
            octave={octave}
          />
        );
    }
  };

  return (
    <div className="w-full min-h-[500px] flex items-center justify-center p-8 glass-morphism holographic-border rounded-2xl instrument-glow">
      <div className="w-full max-w-6xl">
        {renderInstrument()}
      </div>
    </div>
  );
};

export default InstrumentVisual;