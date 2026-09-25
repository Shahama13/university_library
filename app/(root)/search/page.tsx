import SearchInput from "@/components/SearchInput";
import GenreFilter from "@/components/GenreFilter";
import SearchPagination from "@/components/SearchPagination";
import BookCard from "@/components/BookCard";
import { getGenres, searchBooks } from "@/lib/actions/book";

interface Props {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { query, genre, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [{ items: books, totalPages }, genres] = await Promise.all([
    searchBooks({ query, genre, page: currentPage }),
    getGenres(),
  ]);

  return (
    <div className="w-7xl max-w-8xl">
      <div className="library">
        <p className="library-subtitle">Discover your next great read:</p>
        <h1 className="library-title">
          Explore and Search for{" "}
          <span className="text-primary">Any Book</span> In Our Library
        </h1>

        <SearchInput />
      </div>

      <div className="mt-16 mb-20 flex w-full flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-bebas-neue text-4xl text-light-100">
            Search Results
          </h2>
          <GenreFilter genres={genres} />
        </div>

        {books.length > 0 ? (
          <ul className="book-list">
            {books.map((book) => (
              <BookCard key={book.id} {...book} variant="medium"/>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-center text-light-100">
            No books matched your search.
          </p>
        )}

        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
          genre={genre}
        />
      </div>
    </div>
  );
};

export default Page;