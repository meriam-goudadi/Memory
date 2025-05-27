import React from 'react';
import Card from './Card';

interface BoardProps {
  cards: Array<{
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  onCardClick: (id: number) => void;
  level: number;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick, level }) => {
  // Determine grid layout based on level
  const getGridClass = () => {
    switch (level) {
      case 1: // 4x2 grid (8 cards, 4 pairs)
        return 'grid-cols-4 grid-rows-2';
      case 2: // 4x3 grid (12 cards, 6 pairs)
        return 'grid-cols-4 grid-rows-3';
      case 3: // 4x4 grid (16 cards, 8 pairs)
        return 'grid-cols-4 grid-rows-4';
      default:
        return 'grid-cols-3 grid-rows-3';
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-3 w-full max-w-md mx-auto`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          emoji={card.emoji}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default Board;