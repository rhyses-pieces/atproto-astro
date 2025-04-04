import { ActionError, defineAction, type ActionAPIContext } from "astro:actions";
import { z } from "astro:schema";
import { TID } from "@atproto/common";
import { db } from "@/lib/db";
import { getAgent } from "@/lib/auth/client";

export default defineAction({
  accept: "form",
  input: z.object({
    emoji: z.string().emoji({ message: "Contains non-emoji characters" }),
    status: z.string(),
  }),
  handler: async (input, context) => {
    const session = context.locals.session;
    if (!session) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "No session found!",
      });
    }

    const did = context.locals.session.userDid;
    if (!did) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "No identifier found for user.",
      });
    }

    const agent = await getAgent({ did });
    if (!agent?.did) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "Your login expired, try logging in again",
      });
    }

    const rkey = TID.nextStr();
    const record = {
      $type: "city.fruity.status",
      status: input,
      createdAt: new Date().toISOString(),
    };
    
    // TODO: validate record with lexicon

    let uri: string | undefined;
    try {
      const response = await agent.com.atproto.repo.putRecord({
        repo: agent.assertDid,
        collection: "city.fruity.status",
        rkey,
        record,
        validate: false,
      });
      uri = response.data.uri;
    } catch (error) {
      console.error(error, "Failed to write record...");
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Something went wrong with posting the status",
      });
    }

    try {
      await db.insertInto("status")
      .values({
        uri,
        authorDid: agent.assertDid,
        status: input.emoji + " " + input.status,
        createdAt: record.createdAt,
        indexedAt: new Date().toISOString(),
      })
      .execute();
    } catch (error) {
      console.warn(error, "failed to update, but this should be caught by firehose");
    }
  },
});