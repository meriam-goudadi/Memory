import React from 'react';
import { RefreshCw } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onLevelChange: (level: number) => void;
  currentLevel: number;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset, onLevelChange, currentLevel }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-md mx-auto mb-6 gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => onLevelChange(1)}
          className={`py-2 px-4 rounded-lg ${
            currentLevel === 1
              ? 'bg-yellow-400 text-black font-bold'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => onLevelChange(2)}
          className={`py-2 px-4 rounded-lg ${
            currentLevel === 2
              ? 'bg-yellow-400 text-black font-bold'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => onLevelChange(3)}
          className={`py-2 px-4 rounded-lg ${
            currentLevel === 3
              ? 'bg-yellow-400 text-black font-bold'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Hard
        </button>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        <RefreshCw className="h-5 w-5" />
        New Game
      </button>
    </div>
  );
};

export default GameControls;