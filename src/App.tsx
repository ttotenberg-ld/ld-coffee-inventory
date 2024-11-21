import React from 'react';
import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';
import { Header } from './components/Header';
import { InventoryList } from './components/InventoryList';
import { OldInventoryList } from './components/OldInventoryList';
import { AddInventoryForm } from './components/AddInventoryForm';
import { QRCodePopup } from './components/QRCodePopup';
import { InventoryProvider } from './context/InventoryContext';
import { CLIENT_SIDE_ID, ldContext } from './config/launchdarkly';

function App() {
  const flags = useFlags();

  // Log all available flags for debugging
  React.useEffect(() => {
    console.log('Available flags:', {
      allFlags: flags,
      flagKeys: Object.keys(flags),
      releaseNewUiValue: flags['release-new-ui'],
      camelCaseValue: flags.releaseNewUi
    });
  }, [flags]);

  // Try both kebab-case and camelCase versions of the flag
  const showNewUI = flags['release-new-ui'] === true || flags.releaseNewUi === true;

  return (
    <InventoryProvider>
      <div className={showNewUI ? 'min-h-screen bg-gray-50' : ''}>
        <Header />
        <main className={showNewUI ? 'container mx-auto px-2 py-4' : ''}>
          {showNewUI ? (
            <>
              <AddInventoryForm />
              <InventoryList />
              <div className="mt-6 flex justify-center">
                <QRCodePopup />
              </div>
            </>
          ) : (
            <>
              <OldInventoryList />
              <div className="mt-6 flex justify-center">
                <QRCodePopup />
              </div>
            </>
          )}
        </main>
      </div>
    </InventoryProvider>
  );
}

// Export the app wrapped with LaunchDarkly provider
export default withLDProvider({
  clientSideID: CLIENT_SIDE_ID,
  context: ldContext
})(App);
