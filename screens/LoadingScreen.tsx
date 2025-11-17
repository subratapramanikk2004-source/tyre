
import React, { useState, useEffect } from 'react';

const messages = [
  'Checking PIN...',
  'Syncing your contacts...',
  'Loading your business data...',
  'Updating your recent activity...',
  'Preparing your dashboard...',
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        if (prevIndex < messages.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          onComplete();
          return prevIndex;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-indigo-600 flex flex-col justify-center items-center text-white p-4">
      <div className="w-16 h-16 border-4 border-white/50 border-t-white rounded-full animate-spin mb-8"></div>
      <h1 className="text-2xl font-semibold mb-2">Almost there...</h1>
      <p className="text-lg text-indigo-200 transition-opacity duration-500">{messages[currentMessageIndex]}</p>
    </div>
  );
};

export default LoadingScreen;
