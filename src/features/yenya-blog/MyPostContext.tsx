import { createContext, useState, ReactNode, useMemo, useContext } from "react";

export interface PostData {
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
  const [data, setData] = useState<PostData[]>([
    {
      title: "Exploring the Mountains:",
      dialog: `The adventure of a lifetime awaits in the mountains. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "City Lights at Night:",
      dialog: `Experience the beauty of city life when the sun goes down. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "The Tranquil Beach:",
      dialog: `Relax by the sea and listen to the waves. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "The Art of Mindfulness:",
      dialog: `Practice being present and enjoy each moment. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "Journey Through the Forest:",
      dialog: `Wander through dense trees and discover nature's hidden secrets. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "The Wonders of Space:",
      dialog: `Explore the vast universe and its mysteries. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "Culinary Delights:",
      dialog: `Taste the best dishes from around the world. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "Learning to Code:",
      dialog: `Start your journey into programming and software development. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "Exploring Historical Sites:",
      dialog: `Step back in time by visiting ancient ruins and historical landmarks. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "Adventure in the Desert:",
      dialog: `Feel the heat and marvel at the sand dunes in the desert. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "Sailing Across the Seas:",
      dialog: `Embark on a journey across the ocean. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "Exploring the Depths of the Ocean:",
      dialog: `Discover the fascinating underwater world. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
    {
      title: "The Magic of Music:",
      dialog: `Immerse yourself in the rhythm and melodies of different genres. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima earum dolorem quis repudiandae! Illo a dolorum corrupti! Odio, adipisci illo!`,
    },
  ]);

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
    <MyPostContext.Provider value={value}>{children}</MyPostContext.Provider>
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
