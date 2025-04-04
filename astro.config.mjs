// @ts-check
import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: "server",
  env: {
    schema: {
      PORT: envField.number({
        context: "server",
        access: "public",
        default: 4321,
      }),
      PUBLIC_URL: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
    }
  },
  adapter: node({
    mode: 'standalone',
  }),
});