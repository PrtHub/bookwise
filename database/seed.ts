import { config } from "dotenv";
import ImageKit from "imagekit";
import dummyBooks from "../dummybooks.json";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { books } from "./schema";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imageKit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.log("Error happened while uploading the image", error);
    return null;
  }
};

const seed = async () => {
  console.log("Seeding the database...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl: coverUrl,
        videoUrl: videoUrl,
      });
    }

    console.log("Seeding the database completed successfully");
  } catch (error) {
    console.log("Error happened while seeding the database", error);
  }
};

seed();
