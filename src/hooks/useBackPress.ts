import { useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

/**
 * Handles Android hardware back button.
 * Calls onBack() which should return true if handled (e.g. closed a sheet),
 * false if nothing to close (will minimize the app).
 */
export function useBackPress(onBack: () => boolean) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listener = CapApp.addListener('backButton', () => {
      const handled = onBack();
      if (!handled) {
        CapApp.minimizeApp();
      }
    });

    return () => {
      listener.then(l => l.remove());
    };
  }, [onBack]);
}
