"use client";

import { useState, useEffect } from "react";

interface ISettingKeys {
  site_title: string;
  site_description: string;
  contact_email: string;
  enable_reminders: string;
  seo_keywords: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  enable_affiliate: string;
  turnstile_site_key: string;
  turnstile_secret_key: string;
  google_analytics_id: string;
  enable_google_recaptcha_v3: string;
  recaptcha_v3_site_key: string;
  recaptcha_v3_secret_key: string;
  enable_cron_jobs: string;
}

interface ISetting {
  id: string;
  key: string;
  value: string;
  description: string;
  createdAt: string | Date;
}

interface IData {
  success: boolean;
  data: ISetting[];
}

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/settings");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: IData = await response.json();
      console.log("Data from settings: ", JSON.stringify(data.data));

      if (data.success && data.data) {
        const settingsMap = data.data.reduce((acc, setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {} as Record<string, string>);

        setSettings(settingsMap);
        setError(null);
      } else {
        setError("Failed to fetch settings");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      setError(errorMessage);
      console.error("Error fetching settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSetting = (key: keyof ISettingKeys, defaultValue: string = "") => {
    return settings[key] ?? defaultValue;
  };

  const updateSettings = async (
    items: Array<{ key: string; value: string; description?: string }>
  ): Promise<boolean> => {
    try {
      for (const item of items) {
        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      await fetchSettings();
      return true;
    } catch (e) {
      console.error("Failed to update settings", e);
      return false;
    }
  };
  const isFeatureEnabled = (feature: keyof ISettingKeys | string) => {
    const value = settings[feature as string];
    return value === "true" || value === "1";
  };

  return {
    settings,
    isLoading,
    error,
    getSetting,
    updateSettings,
    isFeatureEnabled,
    refetch: fetchSettings,
  };
}
