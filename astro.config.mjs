// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import { createDatabase } from 'db0';
import mysqlConnector from 'db0/connectors/mysql2';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
  session: {
    driver: "db0",
    options: {
      database: createDatabase(mysqlConnector({
        host: import.meta.env.DATABASE_HOST,
        user: import.meta.env.DATABASE_USER,
        password: import.meta.env.DATABASE_PASSWORD,
        database: import.meta.env.DATABASE_NAME,
        dateStrings: ["DATE", "DATETIME", "TIMESTAMP"],
      })),
      tableName: "status",
    },
    cookie: {
      name: "auth_session",
      sameSite: "lax",
      secure: import.meta.env.PROD,
      path: "/",
    },
  },
  experimental: {
    session: true,
  },
});