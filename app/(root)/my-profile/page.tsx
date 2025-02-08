import { signOut } from "@/auth";
import BookList from "@/components/book-list";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import React from "react";

const MyProfile = () => {
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
      <BookList title="Your Books" books={sampleBooks} />
    </>
  );
};

export default MyProfile;
