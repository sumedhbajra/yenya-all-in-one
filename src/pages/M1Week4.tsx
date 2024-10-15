import { useState } from "react";
import Loader from "../ui/Loader";
import Empty from "../ui/Empty";
import Error from "../ui/Error";
import useMovies, { MovieProp, QueryProps } from "../hooks/useMovies";

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

      <div className="col-span-3">
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

function RandomStuff({ query }: QueryProps) {
  const { isLoading, error, movies } = useMovies({ query });
  console.log(movies);
  console.log(error);
  if (isLoading) return <Loader />;
  if (error) return <Empty error={error} />;
  if (movies.length === 0) return <Error />; // start exporing life etc

  return (
    <div className="grid grid-cols-6 gap-10">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

interface MovieProps {
  movie: MovieProp;
}

function Movie({ movie }: MovieProps) {
  return (
    <div className="col-span-2 grid grid-rows-10 grid-cols-3 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 p-4 rounded-lg">
      <span className="col-span-3 row-span-1 flex justify-between align-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 w-72 h-16">
          {movie.Title}
        </h2>

        <p className="flex items-center text-white font-bold bg-red-500 h-10 px-6 py-8 rounded-full">
          {movie.Year}
        </p>
      </span>
      <div className="col-span-3 row-span-9 bg-yellow-500 place-self-center">
        <img
          className="w-full"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      </div>
    </div>
  );
}
