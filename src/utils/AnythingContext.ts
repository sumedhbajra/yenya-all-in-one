import { createContext, useState, ReactNode, useMemo, useContext } from "react";

interface PostData {
  title: string;
  dialog: string;
}

interface PostContextProp {
  data: PostData[];
  addPost: (newPost: PostData) => void;
  clearAllPost: () => void;
  showArchieve: boolean;
  toggleShowArchieve: () => void;
}

const MyPostContext = createContext<PostContextProp | undefined>(undefined);

export default function PostProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PostData[]>([]);
  const [showArchieve, setShowArchieve] = useState<boolean>(false);

  const addPost = (newPost: PostData) => {
    setData((prevData) => [...prevData, newPost]);
  };

  const clearAllPost = () => {
    setData([]);
  };

  const toggleShowArchieve = () => {
    setShowArchieve((e) => !e);
  };

  const value = useMemo(
    () => ({
      data,
      addPost,
      clearAllPost,
      showArchieve,
      toggleShowArchieve,
    }),
    [data, showArchieve]
  );

  return (
    <MyPostContext.Provider value={{ name: "ahsjdvhj" }}>
      {children}
    </MyPostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(MyPostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider.");
  }
  return context;
}

/**
 * 1 Already existing data [data container]
 * 2 Can Add Post [add data to container]
 * 3 Randpm 1000 Post Archioeve [show 1000 random data] [add data to container]
 */
