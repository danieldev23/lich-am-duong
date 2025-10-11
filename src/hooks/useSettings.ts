'use client';

import { useState, useEffect } from 'react';

interface Settings {
  site_title: string;
  site_description: string;
  contact_email: string;
  enable_reminders: string;
  seo_keywords: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();
      
      if (data.success) {
        setSettings(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch settings');
      }
    } catch (err) {
      setError('Network error');
      console.error('Error fetching settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSetting = (key: keyof Settings, defaultValue: string = '') => {
    return settings?.[key] || defaultValue;
  };

  const isFeatureEnabled = (feature: string) => {
    return getSetting(feature as keyof Settings) === 'true';
  };

  return {
    settings,
    isLoading,
    error,
    getSetting,
    isFeatureEnabled,
    refetch: fetchSettings
  };
}
