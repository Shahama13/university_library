import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  query?: string;
  genre?: string;
}

const buildHref = (page: number, query?: string, genre?: string) => {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (genre && genre !== "all") params.set("genre", genre);
  params.set("page", String(page));
  return `/search?${params.toString()}`;
};

const SearchPagination = ({ currentPage, totalPages, query, genre }: Props) => {
  if (totalPages <= 1) return null;

  const showLeadingEllipsis = currentPage > 2;
  const showMiddle = currentPage !== 1 && currentPage !== totalPages;
  const showTrailingEllipsis = currentPage < totalPages - 1;

  return (
    <div id="pagination">
      <Link
        href={buildHref(Math.max(1, currentPage - 1), query, genre)}
        aria-disabled={currentPage === 1}
        className={`pagination-btn_dark flex size-9 items-center justify-center ${
          currentPage === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronLeft className="size-4 text-light-100" />
      </Link>

      <Link href={buildHref(1, query, genre)}>
        <p className={currentPage === 1 ? "pagination-btn_light" : "pagination-btn_dark"}>
          1
        </p>
      </Link>

      {showLeadingEllipsis && <p className="px-1 text-light-100">...</p>}

      {showMiddle && (
        <Link href={buildHref(currentPage, query, genre)}>
          <p className="pagination-btn_light">{currentPage}</p>
        </Link>
      )}

      {showTrailingEllipsis && <p className="px-1 text-light-100">...</p>}

      <Link href={buildHref(totalPages, query, genre)}>
        <p
          className={
            currentPage === totalPages ? "pagination-btn_light" : "pagination-btn_dark"
          }
        >
          {totalPages}
        </p>
      </Link>

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1), query, genre)}
        aria-disabled={currentPage === totalPages}
        className={`pagination-btn_dark flex size-9 items-center justify-center ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronRight className="size-4 text-light-100" />
      </Link>
    </div>
  );
};

export default SearchPagination;