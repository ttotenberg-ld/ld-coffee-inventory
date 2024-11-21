import React from 'react';
import { Coffee } from 'lucide-react';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const Header: React.FC = () => {
  const flags = useFlags();
  const showNewUI = flags['release-new-ui'] === true || flags.releaseNewUi === true;

  if (!showNewUI) {
    return (
      <header style={{
        backgroundColor: '#000080',
        color: 'white',
        padding: '10px',
        borderBottom: '4px solid #000040',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{
            backgroundColor: '#c0c0c0',
            padding: '5px',
            border: '2px solid #000',
            display: 'inline-block',
          }}>
            ☕
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textShadow: '2px 2px #000'
          }}>
            Coffee Inventory Manager
          </h1>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-brown-900 text-white shadow-md">
      <div className="container mx-auto px-2 py-3">
        <div className="flex items-center space-x-2">
          <Coffee size={24} className="text-amber-400 flex-shrink-0" />
          <h1 className="text-lg font-bold truncate">Coffee Inventory Manager</h1>
        </div>
      </div>
    </header>
  );
};
