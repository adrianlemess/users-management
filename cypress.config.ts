import { devServer } from "@cypress/vite-dev-server";
import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  video: false,
  retries: {
    runMode: 3,
    openMode: 0,
  },
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  e2e: {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    setupNodeEvents(on, config) {
      on("dev-server:start", options => {
        return devServer({
          ...options,
          viteConfig: {
            configFile: path.resolve(__dirname, "vite.config.ts"),
          },
        });
      });

      return config;
    },
  },
});
