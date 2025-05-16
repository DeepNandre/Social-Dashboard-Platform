export const GA_CONFIG = {
  clientId: import.meta.env.VITE_GA_CLIENT_ID,
  clientSecret: import.meta.env.VITE_GA_CLIENT_SECRET,
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  scopes: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics.manage.users.readonly'
  ]
}; 