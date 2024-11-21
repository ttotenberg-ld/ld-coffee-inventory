import React from 'react';
import { useInventory } from '../context/InventoryContext';

export const OldInventoryList: React.FC = () => {
  const { items, updateQuantity, deleteItem } = useInventory();

  return (
    <div style={{ 
      fontFamily: 'Courier New, monospace',
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      border: '2px solid #000',
      boxShadow: '5px 5px 0px #000'
    }}>
      <button 
        style={{
          backgroundColor: '#008000',
          color: 'white',
          border: '2px solid #004d00',
          padding: '5px 10px',
          cursor: 'pointer',
          fontFamily: 'Courier New, monospace',
          marginBottom: '20px'
        }}
      >
        + Add New Item
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#c0c0c0' }}>
            <th style={{ border: '1px solid #000', padding: '5px' }}>Image</th>
            <th style={{ border: '1px solid #000', padding: '5px' }}>Name</th>
            <th style={{ border: '1px solid #000', padding: '5px' }}>Price</th>
            <th style={{ border: '1px solid #000', padding: '5px' }}>Quantity</th>
            <th style={{ border: '1px solid #000', padding: '5px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ backgroundColor: 'white' }}>
              <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td style={{ border: '1px solid #000', padding: '5px' }}>
                <div>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{item.description}</div>
              </td>
              <td style={{ border: '1px solid #000', padding: '5px' }}>
                ${item.price.toFixed(2)}
              </td>
              <td style={{ border: '1px solid #000', padding: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    style={{
                      backgroundColor: '#c0c0c0',
                      border: '1px solid #000',
                      width: '25px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      backgroundColor: '#c0c0c0',
                      border: '1px solid #000',
                      width: '25px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                {item.quantity <= item.minQuantity && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    Low stock! Min: {item.minQuantity}
                  </div>
                )}
              </td>
              <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    backgroundColor: '#ff0000',
                    color: 'white',
                    border: '1px solid #990000',
                    padding: '2px 5px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
