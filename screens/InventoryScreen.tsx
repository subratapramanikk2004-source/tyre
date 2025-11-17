import React, { useState } from 'react';
import { Tyre, TyreType } from '../types';
import Header from '../components/Header';
import { SearchIcon } from '../components/icons';

interface InventoryScreenProps {
  inventory: Tyre[];
  onBack: () => void;
}

const TyreListItem: React.FC<{ tyre: Tyre }> = ({ tyre }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-gray-800">{tyre.brand} {tyre.model}</h3>
        <p className="text-sm text-gray-500">{tyre.size}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${tyre.type === TyreType.Tubeless ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            {tyre.type}
          </span>
          <span className="text-xs text-gray-500">{tyre.pressure} PSI</span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-lg text-gray-800">R {tyre.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Qty: {tyre.quantity}</p>
      </div>
    </div>
  </div>
);

const InventoryScreen: React.FC<InventoryScreenProps> = ({ inventory, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(tyre =>
    `${tyre.brand} ${tyre.model} ${tyre.size}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Full Inventory" onBack={onBack} />
      <div className="p-4">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <div className="space-y-3">
          {filteredInventory.map(tyre => <TyreListItem key={tyre.id} tyre={tyre} />)}
        </div>
      </div>
    </div>
  );
};

export default InventoryScreen;
