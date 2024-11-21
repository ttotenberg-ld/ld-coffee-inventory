import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

export const InventoryList: React.FC = () => {
  const { items, updateQuantity, deleteItem } = useInventory();

  return (
    <div className="w-full space-y-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-amber-200 transition-colors p-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden" style={{ maxWidth: '80px', maxHeight: '80px' }}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <div className="flex-grow min-w-0 space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-lg truncate text-gray-800" title={item.name}>
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-lg text-gray-800">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-50 rounded-md border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-2 hover:bg-gray-100 rounded-l-md border-r border-gray-100"
                    >
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-medium text-sm px-4 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 rounded-r-md border-l border-gray-100"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {item.quantity <= item.minQuantity && (
                <div className="pt-2">
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    Low stock! Min: {item.minQuantity}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
