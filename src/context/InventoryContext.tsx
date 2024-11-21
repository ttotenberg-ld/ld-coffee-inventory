import React, { createContext, useContext, useState } from 'react';
import { InventoryContextType, InventoryItem } from '../types/inventory';

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    category: 'coffee',
    quantity: 50,
    minQuantity: 10,
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    description: 'Light roasted Ethiopian coffee with floral and citrus notes'
  },
  {
    id: '2',
    name: 'Chemex Coffee Maker',
    category: 'equipment',
    quantity: 15,
    minQuantity: 5,
    price: 49.99,
    image: 'https://firesidecoffee.com/cdn/shop/files/cm-6a-lifestyle-2.jpg?v=1701873916&width=1445',
    description: '6-cup classic Chemex pour-over glass coffee maker'
  },
  {
    id: '3',
    name: 'Chemex Filters',
    category: 'accessories',
    quantity: 200,
    minQuantity: 50,
    price: 12.99,
    image: 'https://wrcoffee.com/cdn/shop/products/chemex-bonded-filters-pre-folded-squares-100-count-whitewhite-rock-coffee-446327.jpg?v=1710171803',
    description: 'Square unbleached filter papers for Chemex'
  },
  {
    id: '4',
    name: 'Colombian Supremo',
    category: 'coffee',
    quantity: 35,
    minQuantity: 8,
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    description: 'Medium roasted Colombian coffee with caramel and nutty notes'
  },
  {
    id: '5',
    name: 'Burr Coffee Grinder',
    category: 'equipment',
    quantity: 12,
    minQuantity: 3,
    price: 89.99,
    image: 'https://shop.greatergoods.com/cdn/shop/files/2_0459_TheMorningGroove_Website_480x480.jpg?v=1682960304',
    description: 'Professional-grade burr grinder with 15 grind settings'
  },
  {
    id: '6',
    name: 'Digital Scale',
    category: 'equipment',
    quantity: 20,
    minQuantity: 5,
    price: 34.99,
    image: 'https://media.tractorsupply.com/is/image/TractorSupplyCompany/1887036?wid=456&hei=456&fmt=jpeg&qlt=100,0&resMode=sharp2&op_usm=0.9,1.0,8,0',
    description: 'Precision digital scale for coffee measuring (0.1g accuracy)'
  },
  {
    id: '7',
    name: 'Sumatra Dark Roast',
    category: 'coffee',
    quantity: 40,
    minQuantity: 10,
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800',
    description: 'Dark roasted Sumatran coffee with earthy, spicy notes'
  },
  {
    id: '8',
    name: 'Gooseneck Kettle',
    category: 'equipment',
    quantity: 18,
    minQuantity: 4,
    price: 45.99,
    image: 'https://m.media-amazon.com/images/I/61lrBkuCkrL._AC_UF894,1000_QL80_.jpg',
    description: 'Temperature control gooseneck kettle for pour-over brewing'
  },
  {
    id: '9',
    name: 'Coffee Storage Container',
    category: 'accessories',
    quantity: 30,
    minQuantity: 8,
    price: 19.99,
    image: 'https://assets.epicurious.com/photos/61043e206c846439b1e527b4/16:9/w_2560%2Cc_limit/FellowVacuumCanister_HERO_072821_2685_VOG_final.jpg',
    description: 'Airtight container with CO2 valve for coffee freshness'
  }
];

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);

  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    setItems([...items, newItem]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, updateQuantity, deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
