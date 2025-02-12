import BookOverview from "@/components/book-overview";
import BookList from "@/components/book-list";
// import { sampleBooks } from "@/constants";
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

   // Display a random book in the BookOverview component
   const randomIndex = Math.floor(Math.random() * latestBooks.length);
   const randomBook = latestBooks[randomIndex];

  return (
    <>
      <BookOverview userId={session?.user?.id as string} {...randomBook} />
      <BookList
        title="Popular Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
