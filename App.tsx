
import React, { useState, useEffect, useCallback } from 'react';
import { Page } from './types';
import useInventory from './hooks/useInventory';

import LoginScreen from './screens/LoginScreen';
import SetupScreen from './screens/SetupScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import InventoryScreen from './screens/InventoryScreen';
import StockManagementScreen from './screens/StockManagementScreen';
import OrderAlertsScreen from './screens/OrderAlertsScreen';
import AddTyreScreen from './screens/AddTyreScreen';

const App: React.FC = () => {
  const [isInitialized, setInitialized] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isFirstLaunch, setFirstLaunch] = useState(false);
  const [currentUserMobile, setCurrentUserMobile] = useState<string | null>(null);
  const [isAuthenticating, setAuthenticating] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);

  const inventory = useInventory(currentUserMobile);

  useEffect(() => {
    // Simulate checking for user setup
    const userProfile = localStorage.getItem('user_profile');
    setFirstLaunch(!userProfile);
    setInitialized(true);
  }, []);

  const handleSetupComplete = (mobile: string, pin: string) => {
    localStorage.setItem('user_profile', JSON.stringify({ mobile, pin }));
    setFirstLaunch(false);
  };

  const handleLoginSuccess = (mobile: string) => {
    setCurrentUserMobile(mobile);
    setAuthenticating(true);
  };
  
  const handleLoadingComplete = () => {
      setLoggedIn(true);
      setAuthenticating(false);
  };

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Inventory:
        return <InventoryScreen inventory={inventory.tyres} onBack={() => navigateTo(Page.Dashboard)} />;
      case Page.StockManagement:
        return <StockManagementScreen inventoryHook={inventory} onBack={() => navigateTo(Page.Dashboard)} />;
      case Page.OrderAlerts:
        return <OrderAlertsScreen lowStockItems={inventory.lowStockItems} onBack={() => navigateTo(Page.Dashboard)} />;
      case Page.AddTyre:
        return <AddTyreScreen addTyre={inventory.addTyre} onBack={() => navigateTo(Page.Dashboard)} />;
      case Page.Dashboard:
      default:
        return <DashboardScreen userMobile={currentUserMobile!} stats={inventory.stats} navigateTo={navigateTo} />;
    }
  };

  if (!isInitialized) {
    return <div className="w-screen h-screen bg-gray-900"></div>; // Or a splash screen
  }

  if (isFirstLaunch) {
    return <SetupScreen onSetupComplete={handleSetupComplete} />;
  }

  if (!isLoggedIn) {
    if (isAuthenticating) {
      return <LoadingScreen onComplete={handleLoadingComplete} />;
    }
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="w-full min-h-screen bg-slate-100">
       <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/wave-grid.png)'}}></div>
       <div className="relative max-w-md mx-auto min-h-screen bg-white/80 backdrop-blur-sm shadow-2xl">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
