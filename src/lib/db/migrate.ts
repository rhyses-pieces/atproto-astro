import { Kysely, Migrator, sql, type Migration, type MigrationProvider } from "kysely";
import type { Database } from "./types";
import { db } from ".";
// import path from "path";
// import { promises as fs } from "fs";

const migrations: Record<string, Migration> = {}

const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations
  },
}

migrations['001'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable("user")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("did", "varchar(255)", (col) => col.notNull())
      .addColumn("handle", "text", (col) => col.notNull())
      .addColumn("active", "boolean", (col) => col.defaultTo(false))
      .addColumn("nickname", "text")
      .addColumn("description", "varchar(500)")
      // .addColumn("avatar", "blob")
      .addColumn("homepage", "text")
      // .addColumn("style", "varchar")
      .addColumn('created_at', "timestamp", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
      .execute();
    await db.schema
      .createTable('status')
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn('uri', 'varchar(255)', (col) => col.notNull())
      .addColumn('author_did', 'varchar(255)', (col) => col.notNull())
      .addColumn('content', 'varchar(500)', (col) => col.notNull())
      .addColumn('created_at', "timestamp", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
      .execute();
    await db.schema
      .createTable("session")
      .addColumn("id", "varchar(255)", (col) => col.primaryKey())
      .addColumn("user_did", "varchar(255)", (col) => col.notNull())
      .addColumn("expires_at", "timestamp", (col) => col.notNull())
      .execute();
    await db.schema
      .createTable('auth_session')
      .addColumn('session_key', 'varchar(255)', (col) => col.primaryKey())
      .addColumn('session', 'text', (col) => col.notNull())
      .execute();
    await db.schema
      .createTable('auth_state')
      .addColumn('state_key', 'varchar(255)', (col) => col.primaryKey())
      .addColumn('state', 'text', (col) => col.notNull())
      .execute();
  },
  async down(db: Kysely<unknown>) {
    await db.schema.dropTable("user").execute();
    await db.schema.dropTable('status').execute();
    await db.schema.dropTable("session").execute();
    await db.schema.dropTable('auth_session').execute();
    await db.schema.dropTable('auth_state').execute();
  },
}

async function migrateToLatest(db: Kysely<Database>) {
  const migrator = new Migrator({ db, provider: migrationProvider })
  const { error } = await migrator.migrateToLatest();
  if (error) {
    console.log("from migration")
    console.error(error);
    throw error;
  }
}

await migrateToLatest(db);

// file-based migrations with .sql files
// async function migrateToLatest() {
//   const migrator = new Migrator({
//     db,
//     provider: new FileMigrationProvider({
//       fs,
//       path,
//       migrationFolder: path.join(__dirname, "migrations"),
//     }),
//   });

//   const { error, results } = await migrator.migrateToLatest();

//   results?.forEach(result => {
//     if (result.status === "Success") {
//       console.log(`migration "${result.migrationName}" was executed successfully!`);
//     } else if (result.status === "Error") {
//       console.error(`failed to execute migration "${result.migrationName}"`);
//     }
//   });

//   if (error) {
//     console.error("failed to migrate!");
//     console.error(error);
//     process.exit(1);
//   }

//   await db.destroy();
// }

// await migrateToLatest();