

## Plan: Add Google Analytics to Your App

### Overview
We'll integrate Google Analytics 4 (GA4) into your React app with automatic page view tracking that works seamlessly with react-router-dom.

### Prerequisites
You'll need a **Google Analytics 4 Measurement ID** (format: `G-XXXXXXXXXX`). If you don't have one:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property
3. Set up a Web data stream
4. Copy the Measurement ID

### Implementation Steps

#### Step 1: Add Google Analytics Script to index.html
Add the gtag.js script in the `<head>` section with your Measurement ID:
- Global site tag (gtag.js) script from Google
- Initialize gtag with your Measurement ID

#### Step 2: Create a Custom Analytics Hook
Create `src/hooks/useGoogleAnalytics.ts`:
- A reusable hook that tracks page views on route changes
- Uses `useLocation` from react-router-dom to detect navigation
- Sends page_view events to GA4

#### Step 3: Integrate Analytics in App.tsx
- Add the analytics hook inside the BrowserRouter component
- Create an `AnalyticsWrapper` component to properly use routing hooks

#### Step 4: Add Custom Event Tracking (Optional)
Create helper functions to track custom events like:
- Button clicks
- Role/Goal selections
- Chat interactions
- Mobile navigation usage

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | Modify | Add gtag.js script |
| `src/hooks/useGoogleAnalytics.ts` | Create | Page view tracking hook |
| `src/lib/analytics.ts` | Create | Custom event tracking utilities |
| `src/App.tsx` | Modify | Integrate analytics wrapper |

### What You'll Get
- Automatic page view tracking on every route change
- Ready-to-use functions for custom event tracking
- Works in both web and Capacitor mobile builds
- No impact on app performance (async loading)

### Question
Please provide your **Google Analytics Measurement ID** (e.g., `G-XXXXXXXXXX`) so I can include it in the implementation.

