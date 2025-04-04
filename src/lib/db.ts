import { createPool } from "mariadb";
import { Kysely, Migrator, MysqlDialect, type Migration, type MigrationProvider } from "kysely";

export type Status = {
  uri: string;
  authorDid: string;
  status: string;
  createdAt: string;
  indexedAt: string;
}

export type AuthSession = {
  key: string;
  session: AuthSessionJson;
}

export type AuthState = {
  key: string;
  state: AuthStateJson;
}

type AuthSessionJson = string;
type AuthStateJson = string;

export type DatabaseSchema = {
  status: Status;
  auth_session: AuthSession;
  auth_state: AuthState;
}

export type Database = Kysely<DatabaseSchema>;

export function createDb(): Database {
  return new Kysely<DatabaseSchema>({
    dialect: new MysqlDialect({
      pool: async () => createPool({
        database: import.meta.env.DATABASE_NAME,
        host: import.meta.env.DATABASE_HOST,
        user: import.meta.env.DATABASE_USER,
        password: import.meta.env.DATABASE_PASSWORD,
        dateStrings: true,
      }),
    }),
  });
}

export const db = createDb();

const migrations: Record<string, Migration> = {};

const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations;
  },
};

migrations['01'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable("status")
      .addColumn("uri", "varchar", column => column.primaryKey())
      .addColumn("authorDid", "varchar", column => column.notNull())
      .addColumn("status", "varchar", column => column.notNull())
      .addColumn("created_at", "timestamp", column => column.notNull())
      .addColumn("indexed_at", "timestamp", column => column.notNull())
      .execute();
    await db.schema
      .createTable("auth_session")
      .addColumn("key", "varchar", column => column.primaryKey())
      .addColumn("session", "varchar", column => column.notNull())
      .execute();
    await db.schema
      .createTable("auth_state")
      .addColumn("key", "varchar", column => column.primaryKey())
      .addColumn("state", "varchar", column => column.notNull())
      .execute();
  },
  async down(db: Kysely<unknown>) {
    await db.schema.dropTable("status").execute();
    await db.schema.dropTable("auth_session").execute();
    await db.schema.dropTable("auth_state").execute();
  },
}

export async function runMigrations(db: Database) {
  const migrator = new Migrator({ db, provider: migrationProvider });
  const { error } = await migrator.migrateToLatest();
  if (error) throw error;
}