import { prisma } from "@/lib/prisma";

export async function getSetting(key: string, defaultValue: string = ""): Promise<string> {
  try {
    const setting = await prisma.siteSettings.findUnique({
      where: { key }
    });
    
    return setting?.value ?? defaultValue;
  } catch (error) {
    console.error(`Error getting setting ${key}:`, error);
    return defaultValue;
  }
}

export async function setSetting(key: string, value: string, description?: string): Promise<boolean> {
  try {
    await prisma.siteSettings.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description }
    });
    
    return true;
  } catch (error) {
    console.error(`Error setting ${key}:`, error);
    return false;
  }
}