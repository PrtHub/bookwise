import BookForm from "@/components/admin/forms/book-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"


const CreateNewBook = () => {
  return (
    <>
     <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full">
        <BookForm />
      </section>
    </>
  )
}

export default CreateNewBook