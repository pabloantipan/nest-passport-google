export interface Environment {
  // baseUrl: string;
  ENV: string;
  PORT: number;
  WEB_SERVICE_URL: string;
  LATENCY_NUMBER_ALERTS: number;
  PROJECT_ID: string;
  FIREBASE_DATABASE_URL: string;
  CORS_ALLOWED_ORIGIN: string;
}

export interface FirebaseConfiguration {
  API_KEY: string;
  AUTH_DOMAIN: string;
  DATABASE_URL: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MESSAGING_SENDER_ID: string;
  APP_ID: string;
}

export interface FirebaseRemoteConfiguration {
  MINIMUM_FETCH_INTERVAL_MILLIS: number;
  FETCH_TIMEOUT_MILLIS: number;
}
