import React from 'react';

interface CardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, emoji, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      className={`card-container w-full aspect-square cursor-pointer ${
        isFlipped || isMatched ? 'flipped' : ''
      }`}
      onClick={handleClick}
    >
      <div className="card-inner relative w-full h-full transition-transform duration-500">
        <div className="card-face card-front absolute w-full h-full rounded-xl flex items-center justify-center bg-purple-500 shadow-md">
          <div className="w-12 h-12 rounded-full bg-purple-400"></div>
        </div>
        <div className="card-face card-back absolute w-full h-full rounded-xl flex items-center justify-center bg-white shadow-md">
          <span className="text-4xl">{emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;