export const envConfig: Record<string, string> = {
  dev: 'https://dev.amaysim.com.au',
  staging: 'https://staging.amaysim.com.au',
  prod: 'https://www.amaysim.com.au',
};

export function getBaseUrl(): string {
  const env = process.env.TEST_ENV?.trim() || 'prod';
  if (!envConfig[env]) {
    throw new Error(`Unknown TEST_ENV "${env}".}`);
  }
  return envConfig[env];
}
