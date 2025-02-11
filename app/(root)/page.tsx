import BookOverview from "@/components/book-overview";
import BookList from "@/components/book-list";
import { sampleBooks } from "@/constants";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(13)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview
      //  userId={session?.user?.id as string}
       {...latestBooks[0]} 
       />
      <BookList
        title="Popular Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
