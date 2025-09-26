export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

// Google Books API
const GOOGLE_BOOKS_BASE = "https://www.googleapis.com/books/v1";

export const fetchBooks = async ({ query }: { query: string }): Promise<Book[]> => {
  const endpoint = `${GOOGLE_BOOKS_BASE}/volumes?q=${encodeURIComponent(
    query || "bestsellers"
  )}&printType=books&maxResults=30`;

  const response = await fetch(endpoint, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }

  const data = await response.json();
  const items = (data.items || []) as any[];

  const books: Book[] = items.map((item) => {
    const v = item.volumeInfo || {};
    return {
      id: item.id,
      title: v.title,
      authors: v.authors,
      publishedDate: v.publishedDate,
      description: v.description,
      averageRating: v.averageRating,
      ratingsCount: v.ratingsCount,
      thumbnail: v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || null,
    } as Book;
  });

  return books;
};

export const fetchBookDetails = async (bookId: string): Promise<BookDetails> => {
  const endpoint = `${GOOGLE_BOOKS_BASE}/volumes/${bookId}`;
  const response = await fetch(endpoint, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch book details: ${response.statusText}`);
  }

  const item = await response.json();
  const v = item.volumeInfo || {};

  const book: BookDetails = {
    id: item.id,
    title: v.title,
    authors: v.authors,
    publishedDate: v.publishedDate,
    description: v.description,
    averageRating: v.averageRating,
    ratingsCount: v.ratingsCount,
    thumbnail: v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || null,
    pageCount: v.pageCount,
    categories: v.categories,
    publisher: v.publisher,
    language: v.language,
  };

  return book;
};
