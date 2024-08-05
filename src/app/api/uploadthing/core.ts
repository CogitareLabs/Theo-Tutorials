import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/rateLimit";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");

      // Prevent uploads from users who haven't permission to upload
      const fullUserWithMetadata = await clerkClient.users.getUser(user.userId);
      console.log("fullUserWithMetadata", fullUserWithMetadata);
      if (fullUserWithMetadata?.privateMetadata?.["can-upload"] === false)
        throw new UploadThingError("User don't have permission to upload");

      // Rate limit uploads
      const { success } = await ratelimit.limit(user.userId);
      if (!success) throw new UploadThingError("Rate limit exceeded");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
