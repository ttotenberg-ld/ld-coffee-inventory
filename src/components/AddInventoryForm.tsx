import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Category } from '../types/inventory';
import { Plus } from 'lucide-react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { FeatureFlags } from '../config/launchdarkly';

export const AddInventoryForm: React.FC = () => {
  const { addItem } = useInventory();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flags = useFlags();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'coffee' as Category,
    quantity: 0,
    minQuantity: 0,
    price: 0,
    image: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (flags[FeatureFlags.SIMULATE_ADD_ERROR]) {
      setError('Unable to contact the inventory database. Please try again later.');
      return;
    }

    addItem(formData);
    setFormData({
      name: '',
      category: 'coffee',
      quantity: 0,
      minQuantity: 0,
      price: 0,
      image: '',
      description: ''
    });
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
      >
        <Plus size={20} />
        <span>Add New Item</span>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-lg shadow-md">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="coffee">Coffee</option>
                <option value="equipment">Equipment</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Quantity</label>
              <input
                type="number"
                required
                min="0"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setError(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600"
            >
              Add Item
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
