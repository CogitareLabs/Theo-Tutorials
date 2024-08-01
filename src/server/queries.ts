import "server-only";
import { db } from "./db";

export async function getMyImages() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return posts;
}
