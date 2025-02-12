"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;

  try {
    // Check if the book exists and is available
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (book.length === 0)
      return {
        success: false,
        error: "Book not found",
      };

    if (book[0].availableCopies <= 0)
      return {
        success: false,
        error: "Book is not available",
      };

    const dueDate = dayjs().add(7, "days").toDate().toDateString();

    // Create the borrow record
    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    // Update book availability
    await db
      .update(books)
      .set({
        availableCopies: book[0].availableCopies - 1,
      })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log("Error happened while borrowing the book", error);
    return {
      success: false,
      error: "Error happened while borrowing the book",
    };
  }
};
