
import { useState, useEffect, useMemo } from 'react';
import { Tyre, TyreType, InventoryStats } from '../types';

const LOW_STOCK_THRESHOLD = 5;

const initialTyres: Tyre[] = [
  { id: '1', brand: 'Goodyear', model: 'Eagle F1 Asymmetric 5', size: '225/45R17', type: TyreType.Tubeless, price: 220, pressure: 32, quantity: 9 },
  // FIX: Added missing 'pressure' property to conform to the Tyre type.
  { id: '2', brand: 'Bridgestone', model: 'Turanza T005', size: '205/55R16', type: TyreType.TubeType, price: 180, pressure: 33, quantity: 20 },
  // FIX: Added missing 'pressure' property to conform to the Tyre type.
  { id: '3', brand: 'Pirelli', model: 'P Zero', size: '275/30R21', type: TyreType.Tubeless, price: 450, pressure: 35, quantity: 2 },
];

const useInventory = (mobile: string | null) => {
  const inventoryKey = useMemo(() => mobile ? `tyre_inventory_${mobile}` : null, [mobile]);

  const [tyres, setTyres] = useState<Tyre[]>(() => {
    if (!inventoryKey) return [];
    try {
      const storedTyres = localStorage.getItem(inventoryKey);
      return storedTyres ? JSON.parse(storedTyres) : initialTyres;
    } catch (error) {
      console.error("Failed to parse inventory from localStorage", error);
      return initialTyres;
    }
  });

  useEffect(() => {
    if (inventoryKey) {
      localStorage.setItem(inventoryKey, JSON.stringify(tyres));
    }
  }, [tyres, inventoryKey]);

  const addTyre = (tyre: Omit<Tyre, 'id'>) => {
    setTyres(prev => [...prev, { ...tyre, id: new Date().toISOString() }]);
  };

  const updateTyre = (id: string, updates: Partial<Pick<Tyre, 'price' | 'quantity'>>) => {
    setTyres(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTyre = (id: string) => {
    setTyres(prev => prev.filter(t => t.id !== id));
  };
  
  const lowStockItems = useMemo(() => tyres.filter(t => t.quantity < LOW_STOCK_THRESHOLD), [tyres]);

  const stats: InventoryStats = useMemo(() => {
    const totalStock = tyres.reduce((sum, t) => sum + t.quantity, 0);
    const brandCount = new Set(tyres.map(t => t.brand.toLowerCase())).size;
    const totalValue = tyres.reduce((sum, t) => sum + t.price * t.quantity, 0);
    const lowStockCount = lowStockItems.length;

    return { totalStock, brandCount, totalValue, lowStockCount };
  }, [tyres, lowStockItems]);

  return { tyres, addTyre, updateTyre, deleteTyre, lowStockItems, stats };
};

export default useInventory;
