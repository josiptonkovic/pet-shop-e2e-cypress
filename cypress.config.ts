import { dotenv } from 'cypress-plugin-dotenv';
import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    ...process.env
  },
  e2e: {
    setupNodeEvents(on, config) {
      return dotenv(config);
    },
  },
});
