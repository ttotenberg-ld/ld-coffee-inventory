export type Category = 'coffee' | 'equipment' | 'accessories';

export interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  minQuantity: number;
  price: number;
  image: string;
  description: string;
}

export interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  deleteItem: (id: string) => void;
}