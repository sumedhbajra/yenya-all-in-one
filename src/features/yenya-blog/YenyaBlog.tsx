import Header from "../../ui/Header";
import { faker } from "@faker-js/faker";
import { PostData, usePost } from "./MyPostContext";
import { memo, useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    dialog: faker.hacker.phrase(),
  };
}

export default function YenyaBlog() {
  return (
    <div className="grid gap-10">
      <Header title={"⚛️ The YenyaSoft Blogs"} size="medium">
        <BlogCount />
      </Header>
      <Main />
      <PostArchieve />
    </div>
  );
}

const Main = memo(function Main() {
  return (
    <>
      <AddPost />
      <PostList />
    </>
  );
});

function BlogCount() {
  return (
    <div className="flex gap-10 items-center">
      <div className="font-bold text-3xl">🚀 X yenyasoft posts found</div>
      <button>Clear Blogs</button>
    </div>
  );
}

function AddPost() {
  return (
    <form className="bg-orange-100 grid grid-cols-12 h-auto gap-3 rounded-xl shadow-sm items-center">
      <input className="col-start-2 col-span-2 m-5 h-20 border-2 border-orange-200 p-2" />
      <textarea className="col-span-6 m-5 border-2 h-20 border-orange-200 p-2" />
      <button className="col-start-11 col-span-2 bg-orange-300 h-20 w-56">
        Post Blog
      </button>
    </form>
  );
}

function PostList() {
  const { data } = usePost();
  return (
    <div className="grid grid-cols-8 place-items-center gap-5">
      {data.map((post, key) => (
        <Post key={key} title={post.title} dialog={post.dialog} />
      ))}
    </div>
  );
}

function Post({ title, dialog }: PostData) {
  return (
    <div className="col-span-2 border-2 border-orange-100 flex flex-col gap-3 w-full p-6 h-96 hover:bg-orange-100">
      <h2 className="font-bold text-4xl">{title}</h2>
      <p>{dialog}</p>
    </div>
  );
}

function PostArchieve() {
  const { showArchieve, toggleShowArchieve } = usePost();
  console.log(showArchieve);

  const [newData] = useState(() => {
    return Array.from({ length: 30 }, () => createRandomPost());
  });
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="uppercase font-semibold text-4xl">post archieve</h1>
      </div>
      <div>
        <button
          className="bg-orange-300 w-72 px-10 py-5 text-3xl"
          onClick={toggleShowArchieve}
        >
          {showArchieve ? "Hide Archieve" : "Show Archieve"}
        </button>
      </div>
      {showArchieve
        ? newData.map((post, key) => (
            <Archieve key={key} title={post.title} dialog={post.dialog} />
          ))
        : null}
    </div>
  );
}

function Archieve({ title, dialog }: PostData) {
  return (
    <div className="flex items-center justify-between border border-orange-100">
      <div className="flex gap-4 p-2">
        <h3>{title}:</h3>
        <p>{dialog}</p>
      </div>
      <button className="font-semibold bg-orange-300 px-6 py-2 m-2">
        Add this post
      </button>
    </div>
  );
}
