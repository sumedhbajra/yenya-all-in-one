import PostProvider from "../features/yenya-blog/MyPostContext";
import YenyaBlog from "../features/yenya-blog/YenyaBlog";

export default function M2Week2() {
  // useMemo, useCallback and more for data optimization
  return (
    <>
      <PostProvider>
        <YenyaBlog />
      </PostProvider>
    </>
  );
}
