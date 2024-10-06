import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import Empty from "../ui/Empty";
import Error from "../ui/Error";

export default function M1Week4() {
  const [query, setQuery] = useState<string>("Nepal");
  const buttonDesign: string = `col-span-1 place-self-start rounded-lg inline-block  bg-orange-500 px-4 py-4
  font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-orange-400
  focus:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2 `;
  return (
    <div className="grid grid-row-3 grid-cols-3 gap-20">
      <Counter />

      <input
        type="text"
        className="border-2 border-stale-500 col-span-1 p-4"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button className={buttonDesign} onClick={() => setQuery("")}>
        Clear
      </button>
      <div className="col-span-3 grid grid-cols-4">
        <RandomStuff query={query} />
      </div>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState<number>(0);
  const buttonDesign: string = `inline-block rounded-full bg-orange-500 px-4 py-4 h-20 w-20 
    font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-orange-400
    focus:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2 `;
  return (
    <div className="grid grid-cols-10 w-full place-content-center place-items-center h-40 col-span-3 pb-20 border-b-2">
      <span className="col-start-2 col-span-2 ">
        <button className={buttonDesign} onClick={() => setCount(count + 1)}>
          +
        </button>
      </span>
      <span className="col-span-4 border-slate-500 border-4 border-dashed px-40 py-10 w-[300px] font-bold text-5xl text-center">
        {count}
      </span>
      <span className="col-span-2">
        <button className={buttonDesign} onClick={() => setCount(count - 1)}>
          -
        </button>
      </span>
    </div>
  );
}

const KEY: string = `f84fc31d`;

interface QueryProps {
  query: string;
}

interface ErrorState {
  name: string;
  message: string;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

function RandomStuff({ query }: QueryProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
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
      } catch (err: ErrorState) {
        if (err.name !== "AbortError") setError(err.message);
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

  if (isLoading) return <Loader />;
  if (error) return <Empty />;
  if (movies.length === 0) return <Error />;

  return (
    <div className="col-span-1">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

interface MovieProps {
  movie: Movie;
}

function Movie({ movie }: MovieProps) {
  console.log(movie);
  return (
    <div>
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
    </div>
  );
}
