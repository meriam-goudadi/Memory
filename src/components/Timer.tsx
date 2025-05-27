import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onReset }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (!isRunning && time === 0) {
      onReset();
    }
  }, [isRunning, time, onReset]);

  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-lg shadow-md">
      <Clock className="mr-2 h-5 w-5" />
      <span className="font-mono text-xl">{formatTime(time)}</span>
    </div>
  );
};

export default Timer;