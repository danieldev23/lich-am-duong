"use client";

import { prisma } from "@/lib/prisma";
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
    settings: Partial<ISetting[]>
  ): Promise<boolean> => {
    const data = await prisma.siteSettings.updateMany({ data: settings });
    console.log(`Updated from use settings: ${data}`);
    return false;
  };
  const isFeatureEnabled = (feature: keyof ISettingKeys) => {
    return getSetting(feature) === "true";
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
