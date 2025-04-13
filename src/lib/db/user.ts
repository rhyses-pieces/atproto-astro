import type { NewUser, UpdateUser, User } from "./types";
import { db } from ".";

export async function getUser(did: string): Promise<User> {
  const result = await db
    .selectFrom("user")
    .selectAll()
    .where("did", "=", did)
    .executeTakeFirstOrThrow(error => {
      console.error(error);
      throw new Error("Couldn't find that user!");
    });
  return result;
}

export async function addUser(did: string, handle: string, nickname?: string) {
  const user: NewUser = {
    did,
    handle,
    active: true,
    nickname,
    created_at: new Date().toISOString(),
  };

  await db.insertInto("user").values(user).executeTakeFirstOrThrow(error => {
    console.error(error);
    throw new Error("Couldn't add user!");
  });
  return await getUser(user.did);
}

export async function updateUser(did: string, user: UpdateUser) {
  await db
    .updateTable("user")
    .where("did", "=", did)
    .where("id", "=", user.id!)
    .set(user)
    .executeTakeFirstOrThrow(error => {
      console.error(error);
      throw new Error("Couldn't update user!");
    });
  
  return await getUser(did);
}

export async function deleteUser(did: string) {
  await db.deleteFrom("user").where("did", "=", did).executeTakeFirstOrThrow(error => {
    console.error(error);
    throw new Error("Couldn't delete user!");
  });
}