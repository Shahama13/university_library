
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  isLoanedBook?: Boolean
}

interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: Date;
  dueDate: string;
  returnDate: string | null;
  status: borrowStatus;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullname: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface User {
  id: string;
  fullname: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: userStatusType;
  role: userRole;
  createdAt: Date | string | null;
  lastActivityDate: Date | string | null;
}
interface BorrowBookParams {
  bookId: string;
  userId: string;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";
type userStatusType = "PENDING" | "APPROVED" | "REJECTED" | null;
type userRole = "USER" | "ADMIN" | null;
type borrowStatus = "BORROWED" | "RETURNED" | "LATE_RETURNED"
