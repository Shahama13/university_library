import BookList from "@/components/BookList";
import BookOverView from "@/components/BookOverView";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import Image from "next/image";

export default function Home() {


  return (

    <>
      <BookOverView {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>

  );
}
