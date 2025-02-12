import { auth, signOut } from "@/auth";
import BookList from "@/components/book-list";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import React from "react";
import {books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const MyProfile = async () => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/sign-in");

  const [borrowBook] = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id));

  const allBooks = await db
    .select()
    .from(books)
    .where(eq(books.id, borrowBook?.bookId));

  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-28"
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Your Borrowed Books" books={allBooks} />
    </>
  );
};

export default MyProfile;
