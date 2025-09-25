import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  // Mock implementation - no actual database calls
  console.log(`Mock: Updating search count for "${query}" - ${movie.title}`);
  return Promise.resolve();
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    // Fallback: Get popular movies from TMDB and convert to TrendingMovie format
    const TMDB_CONFIG = {
      BASE_URL: "https://api.themoviedb.org/3",
      API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
      },
    };

    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/popular?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch trending movies: ${response.statusText}`);
    }

    const data = await response.json();
    const movies = data.results.slice(0, 5); // Get top 5 popular movies

    // Convert TMDB movies to TrendingMovie format
    const trendingMovies: TrendingMovie[] = movies.map((movie: any) => ({
      searchTerm: movie.title,
      movie_id: movie.id,
      title: movie.title,
      count: Math.floor(Math.random() * 100) + 1, // Mock search count
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));

    console.log("Fetched trending movies from TMDB:", trendingMovies.length);
    return trendingMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
