
export enum TyreType {
  Tubeless = 'Tubeless',
  TubeType = 'Tube Type',
}

export interface Tyre {
  id: string;
  brand: string;
  model: string;
  size: string;
  type: TyreType;
  price: number;
  pressure: number;
  quantity: number;
}

export enum Page {
  Dashboard,
  Inventory,
  StockManagement,
  OrderAlerts,
  AddTyre,
}

export interface InventoryStats {
  totalStock: number;
  brandCount: number;
  totalValue: number;
  lowStockCount: number;
}
