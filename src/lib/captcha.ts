import { getSetting } from "@/lib/settings";

export async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = await getSetting('turnstile_secret_key');
    
    if (!secretKey) {
      console.error('Turnstile secret key not configured');
      return false;
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error verifying captcha:', error);
    return false;
  }
}