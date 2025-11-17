
import React from 'react';
import { Page, InventoryStats } from '../types';
import { BellIcon, CubeIcon, TagIcon, DollarSignIcon, AlertTriangleIcon, ListIcon, SearchIcon, PlusCircleIcon } from '../components/icons';
import { ChevronRightIcon } from '../components/icons';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
    <div className={`p-3 rounded-full mb-2 ${color}`}>
      {icon}
    </div>
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

interface QuickActionProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const QuickActionItem: React.FC<QuickActionProps> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition">
        <div className="p-3 bg-blue-100 rounded-full">
            {icon}
        </div>
        <div className="ml-4 text-left flex-grow">
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </button>
);


interface DashboardScreenProps {
  userMobile: string;
  stats: InventoryStats;
  navigateTo: (page: Page) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ userMobile, stats, navigateTo }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-500">{userMobile}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <BellIcon className="w-6 h-6 text-gray-600" />
          </button>
          <img src="https://picsum.photos/40/40" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard icon={<CubeIcon className="w-6 h-6 text-blue-600"/>} title="Total Stock" value={stats.totalStock} color="bg-blue-100" />
        <StatCard icon={<TagIcon className="w-6 h-6 text-green-600"/>} title="Brands" value={stats.brandCount} color="bg-green-100"/>
        <StatCard icon={<DollarSignIcon className="w-6 h-6 text-purple-600"/>} title="Total Value" value={`R ${stats.totalValue.toLocaleString()}`} color="bg-purple-100"/>
        <StatCard icon={<AlertTriangleIcon className="w-6 h-6 text-red-600"/>} title="Low Stock" value={stats.lowStockCount} color="bg-red-100"/>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="space-y-3">
           <QuickActionItem icon={<ListIcon className="w-5 h-5 text-blue-600" />} title="View Inventory" description="Browse all tyre items" onClick={() => navigateTo(Page.Inventory)} />
           <QuickActionItem icon={<SearchIcon className="w-5 h-5 text-blue-600" />} title="Stock Management" description="Find and manage tyre details" onClick={() => navigateTo(Page.StockManagement)} />
           <QuickActionItem icon={<BellIcon className="w-5 h-5 text-blue-600" />} title="Order Alert" description="Tyres with low stock" onClick={() => navigateTo(Page.OrderAlerts)} />
           <QuickActionItem icon={<PlusCircleIcon className="w-5 h-5 text-blue-600" />} title="Add New Tyre" description="Add a new item to inventory" onClick={() => navigateTo(Page.AddTyre)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
