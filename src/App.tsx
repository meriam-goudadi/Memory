import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import GameControls from './components/GameControls';
import GameOver from './components/GameOver';

// List of emojis for the cards
const EMOJIS = ["🦊", "🐶", "🐱", "🦁", "🐯", "🐺", "🦝", "🐴", "🦄", "🦓", "🐮", "🐷", "🐭", "🐹", "🐰", "🐻"];

// Get card count based on level
const getCardCount = (level: number) => {
  switch (level) {
    case 1: return 8; // 4 pairs
    case 2: return 12; // 6 pairs
    case 3: return 16; // 8 pairs
    default: return 8;
  }
};

function App() {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize or reset game
  const initializeGame = useCallback(() => {
    const cardCount = getCardCount(level);
    const pairCount = cardCount / 2;
    
    // Select emojis for the current level
    const selectedEmojis = EMOJIS.slice(0, pairCount);
    
    // Create pairs and shuffle
    let newCards = [
      ...selectedEmojis.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      })),
      ...selectedEmojis.map((emoji, index) => ({
        id: index + pairCount,
        emoji,
        isFlipped: false,
        isMatched: false,
      })),
    ];
    
    // Fisher-Yates shuffle algorithm
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setIsTimerRunning(false);
    setTime(0);
    setHasStarted(false);
  }, [level]);
  
  useEffect(() => {
    initializeGame();
  }, [level, initializeGame]);
  
  // Check if the game is over
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched) && hasStarted) {
      setGameOver(true);
      setIsTimerRunning(false);
    }
  }, [cards, hasStarted]);

  // Handle card click
  const handleCardClick = (id: number) => {
    // Start timer on first card click
    if (!hasStarted) {
      setIsTimerRunning(true);
      setHasStarted(true);
    }
    
    // Don't allow flipping if already two cards are flipped or clicking on already flipped card
    if (flippedCards.length === 2 || flippedCards.includes(id) || cards.find(card => card.id === id)?.isMatched) {
      return;
    }
    
    // Flip the clicked card
    const newCards = [...cards];
    const cardIndex = newCards.findIndex(card => card.id === id);
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const firstCardIndex = newCards.findIndex(card => card.id === newFlippedCards[0]);
      const secondCardIndex = newCards.findIndex(card => card.id === newFlippedCards[1]);
      
      if (newCards[firstCardIndex].emoji === newCards[secondCardIndex].emoji) {
        // Match found
        newCards[firstCardIndex].isMatched = true;
        newCards[secondCardIndex].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstCardIndex].isFlipped = false;
          resetCards[secondCardIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  // Handle level change
  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
  };
  
  // Reset timer
  const resetTimer = useCallback(() => {
    setTime(0);
  }, []);

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-lg mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Memory-React.JS</h1>
        <p className="text-white text-opacity-90">
          Retournez des cartes - pas votre cerveau... sauf si vous oubliez vos props !
        </p>
      </header>

      <main className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold text-gray-800">
            Level {level}
          </div>
          <Timer isRunning={isTimerRunning} onReset={resetTimer} />
        </div>

        <GameControls
          onReset={initializeGame}
          onLevelChange={handleLevelChange}
          currentLevel={level}
        />

        <div className="mb-4 text-center text-gray-500">
          Moves: {moves}
        </div>

        <Board
          cards={cards}
          onCardClick={handleCardClick}
          level={level}
        />
      </main>

      {gameOver && (
        <GameOver
          time={time}
          moves={moves}
          onPlayAgain={initializeGame}
        />
      )}
    </div>
  );
}

export default App;