import BookOverview from "@/components/book-overview";
import BookList from "@/components/book-list";
import { sampleBooks } from "@/constants";

export default function Home() {
  return (
   <>
    <BookOverview 
      {...sampleBooks[0]}
    />
    <BookList 
      title="Popular Books"
      books={sampleBooks}
      containerClassName="mt-28"
    />  
   </>
  );
}
