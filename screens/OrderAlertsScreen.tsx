
import React from 'react';
import { Tyre, TyreType } from '../types';
import Header from '../components/Header';

interface OrderAlertsScreenProps {
  lowStockItems: Tyre[];
  onBack: () => void;
}

const TyreListItem: React.FC<{ tyre: Tyre }> = ({ tyre }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-red-200">
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
          <p className="text-sm text-red-600 font-bold">Qty: {tyre.quantity}</p>
        </div>
      </div>
    </div>
  );

const OrderAlertsScreen: React.FC<OrderAlertsScreenProps> = ({ lowStockItems, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Order Alerts" onBack={onBack} />
      <div className="p-4">
        {lowStockItems.length > 0 ? (
          <div className="space-y-3">
            {lowStockItems.map(tyre => <TyreListItem key={tyre.id} tyre={tyre} />)}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No items are low on stock.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderAlertsScreen;
