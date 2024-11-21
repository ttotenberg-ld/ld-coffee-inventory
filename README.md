# Coffee Inventory Manager

A React-based inventory management system for coffee shops with feature flag support for UI variations.

## LaunchDarkly Setup

1. Create a LaunchDarkly account if you haven't already
2. Create a new project in LaunchDarkly
3. Replace the `CLIENT_SIDE_ID` in `src/config/launchdarkly.ts` with your project's client-side ID

### Feature Flag Configuration

1. In your LaunchDarkly dashboard, create a new feature flag:
   - Name: "Release New UI"
   - Key: `release-new-ui` (Note: The SDK automatically converts this to `releaseNewUi`)
   - Flag Variations: Boolean (true/false)

2. Configure targeting rules:
   - Default rule: Set to `false` to show the classic UI by default
   - To release the new UI, toggle the flag to `true`

## Available UIs

### Classic UI (Default)
- Retro design with table layout
- Windows 98-inspired styling
- Basic HTML elements
- Nostalgic feel

### Modern UI (Feature Flag Enabled)
- Clean, modern design with cards
- Tailwind CSS styling
- Responsive layout
- Modern iconography

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) to view the app

## Testing Different UIs

1. Classic UI:
   - Ensure the `release-new-ui` flag is set to `false` in LaunchDarkly
   - The app will show a retro, table-based layout

2. Modern UI:
   - Set the `release-new-ui` flag to `true` in LaunchDarkly
   - The app will switch to a modern, card-based layout

## Implementation Details

The UI switching is implemented using:
- LaunchDarkly React SDK for feature flag management
- Conditional rendering based on flag state
- Separate components for each UI version
- Shared state management via Context API

## Important Notes

- The LaunchDarkly SDK automatically converts flag keys with dashes to camelCase
  - Example: `release-new-ui` becomes `releaseNewUi` in the code
  - This is standard behavior for the SDK
- Flag changes take effect immediately without requiring a page refresh
- The app uses an anonymous user context by default
