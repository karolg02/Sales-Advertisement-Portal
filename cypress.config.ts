import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
    },
  },
  defaultCommandTimeout: 10000, // Domyślny timeout dla komend
  pageLoadTimeout: 60000, // Timeout dla ładowania stron
});