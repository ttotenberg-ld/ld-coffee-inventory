import { LDContext } from 'launchdarkly-react-client-sdk';

// Using the same client ID as the example project
export const CLIENT_SIDE_ID = '609ead905193530d7c28647b';

// Anonymous user context
export const ldContext: LDContext = {
  kind: 'user',
  key: 'anonymous-user',
  anonymous: true,
  custom: {
    device: 'browser',
    operatingSystem: 'web'
  }
};

// Feature flag keys
// Note: LaunchDarkly SDK automatically converts 'release-new-ui' to 'releaseNewUi'
export const FeatureFlags = {
  RELEASE_NEW_UI: 'releaseNewUi',  // camelCase version of 'release-new-ui'
  SIMULATE_ADD_ERROR: 'simulateAddError'  // New flag for simulating add item errors
} as const;
