/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DELAY_REQUESTS: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
