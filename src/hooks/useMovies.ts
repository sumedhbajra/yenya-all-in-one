import { useEffect, useState } from "react";

const KEY: string = `afe881d7`;

export interface MovieProp {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface QueryProps {
  query: string;
}

function useMovies({ query }: QueryProps) {
  const [movies, setMovies] = useState<MovieProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies.");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") setError(error.message); // Safely accessing the error message
        } else {
          setError("n unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);
  return { isLoading, error, movies };
}

export default useMovies;
