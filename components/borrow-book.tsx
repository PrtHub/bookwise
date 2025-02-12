"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { borrowBook } from "@/lib/actions/book";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
  isBookBorrowed?: boolean;
}

const BorrowBook = ({
  bookId,
  userId,
  isBookBorrowed,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [isBorrowing, setIsBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
    }

    setIsBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast({
          title: "Success",
          description: "Book borrowed successfully",
          variant: "success",
        });

        router.push("/my-profile");
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      disabled={isBorrowing}
      onClick={handleBorrowBook}
    >
      <Image src="/icons/book.svg" alt="book" width={24} height={24} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {isBorrowing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
         isBookBorrowed ? "Borrowed" : "Borrow Book"
        )}
      </p>
    </Button>
  );
};

export default BorrowBook;
