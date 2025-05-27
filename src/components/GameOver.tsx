import React from 'react';
import { Trophy } from 'lucide-react';

interface GameOverProps {
  time: number;
  moves: number;
  onPlayAgain: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ time, moves, onPlayAgain }) => {
  // Convert time (seconds) to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center transform animate-fade-in">
        <div className="flex justify-center mb-6">
          <Trophy className="w-16 h-16 text-yellow-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Congratulations!
        </h2>
        
        <p className="text-xl text-gray-600 mb-6">
          You completed the game in{' '}
          <span className="font-semibold">
            {minutes > 0 ? `${minutes}m ` : ''}{seconds}s
          </span>{' '}
          with{' '}
          <span className="font-semibold">{moves} moves</span>!
        </p>
        
        <button
          onClick={onPlayAgain}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;