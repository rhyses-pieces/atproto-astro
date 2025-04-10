import type { Database } from "./types";
import { createPool } from "mariadb";
import { Kysely, MysqlDialect } from "kysely";

const dialect = new MysqlDialect({
  pool: async () => createPool({
    database: import.meta.env.DATABASE_NAME,
    host: import.meta.env.DATABASE_HOST,
    user: import.meta.env.DATABASE_USER,
    password: import.meta.env.DATABASE_PASSWORD,
    dateStrings: true,
  })
});

export const db = new Kysely<Database>({ dialect });