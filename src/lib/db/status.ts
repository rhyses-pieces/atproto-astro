import type { NewStatus, Status, UpdateStatus } from "./types";
import { db } from ".";

export async function getStatus(uri: string): Promise<Status> {
  const result = await db
    .selectFrom("status")
    .selectAll()
    .where("uri", "=", uri)
    .executeTakeFirstOrThrow(error => {
      console.error(error);
      throw new Error("Couldn't find that status!");
    });
  return result;
}

export async function addStatus(status: Status) {
  // validate the content here
  const newStatus: NewStatus = {
    uri: status.uri,
    author_did: status.author_did,
    content: status.content,
    created_at: status.created_at.toISOString(),
    indexed_at: new Date().toISOString(),
  };

  await db
    .insertInto("status")
    .values(newStatus)
    .executeTakeFirst();
  return await getStatus(status.uri);
}

export async function updateStatus(status: Status) {
  // validate content here
  const updatedStatus: UpdateStatus = {
    content: status.content,
    indexed_at: new Date().toISOString(),
  };

  await db
    .updateTable("status")
    .where("uri", "=", status.uri)
    .where("id", "=", status.id)
    .set(updatedStatus)
    .executeTakeFirstOrThrow(error => {
      console.error(error);
      throw new Error("Couldn't update status!");
    });
  return await getStatus(status.uri);
}

export async function deleteStatus(uri: string) {
  await db.deleteFrom("status").where("uri", "=", uri).executeTakeFirstOrThrow(error => {
    console.error(error);
    throw new Error("Couldn't delete status!");
  });
}