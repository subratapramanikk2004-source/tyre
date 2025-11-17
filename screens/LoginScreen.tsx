
import React, { useState, useEffect } from 'react';
import PinInput from '../components/PinInput';
import { FingerprintIcon } from '../components/icons';

interface LoginScreenProps {
  onLoginSuccess: (mobile: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [error, setError] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');

  useEffect(() => {
    const profileString = localStorage.getItem('user_profile');
    if (profileString) {
      const profile = JSON.parse(profileString);
      setUserIdentifier(profile.mobile);
    }
  }, []);

  const handlePinComplete = (pin: string) => {
    const profileString = localStorage.getItem('user_profile');
    const profile = profileString ? JSON.parse(profileString) : null;
    
    if (profile && pin === profile.pin) {
      setError('');
      onLoginSuccess(profile.mobile);
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm text-center">
        <img src="https://picsum.photos/80/80" alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600 mb-8">{userIdentifier}</p>
        
        <PinInput length={4} onComplete={handlePinComplete} />
        
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        
        <div className="mt-8 space-y-4">
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">Forgot PIN?</button>
          <div className="flex items-center justify-center">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium p-3 rounded-lg hover:bg-indigo-100/50 transition">
              <FingerprintIcon className="w-6 h-6"/>
              <span>Use Fingerprint / Face ID</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
