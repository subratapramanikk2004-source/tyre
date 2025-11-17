import React, { useState } from 'react';
import { Tyre } from '../types';
import Header from '../components/Header';
import { TrashIcon } from '../components/icons';
import useInventory from '../hooks/useInventory';

interface EditableTyreItemProps {
  tyre: Tyre;
  onUpdate: (id: string, updates: { price: number; quantity: number }) => void;
  onDelete: (id: string) => void;
}

const EditableTyreItem: React.FC<EditableTyreItemProps> = ({ tyre, onUpdate, onDelete }) => {
  const [price, setPrice] = useState(tyre.price.toString());
  const [quantity, setQuantity] = useState(tyre.quantity.toString());

  const handleUpdate = () => {
    const numPrice = parseFloat(price);
    const numQuantity = parseInt(quantity, 10);
    if (!isNaN(numPrice) && !isNaN(numQuantity)) {
      onUpdate(tyre.id, { price: numPrice, quantity: numQuantity });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-semibold text-gray-800">{tyre.brand} {tyre.model}</h3>
            <p className="text-sm text-gray-500">{tyre.size}</p>
          </div>
          <button onClick={() => onDelete(tyre.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full">
            <TrashIcon className="w-5 h-5"/>
          </button>
      </div>
      <div className="grid grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Price (R)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Quantity</label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700">Update</button>
      </div>
    </div>
  );
};


interface StockManagementScreenProps {
  inventoryHook: ReturnType<typeof useInventory>;
  onBack: () => void;
}

const StockManagementScreen: React.FC<StockManagementScreenProps> = ({ inventoryHook, onBack }) => {
  const { tyres, updateTyre, deleteTyre } = inventoryHook;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Stock Management" onBack={onBack} />
      <div className="p-4 space-y-3">
        {tyres.map(tyre => (
          <EditableTyreItem key={tyre.id} tyre={tyre} onUpdate={updateTyre} onDelete={deleteTyre} />
        ))}
      </div>
    </div>
  );
};

export default StockManagementScreen;
