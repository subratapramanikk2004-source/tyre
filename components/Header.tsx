
import React from 'react';
import { ChevronLeftIcon } from './icons';

interface HeaderProps {
  title: string;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <header className="p-4 flex items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200">
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800 ml-4">{title}</h1>
    </header>
  );
};

export default Header;
