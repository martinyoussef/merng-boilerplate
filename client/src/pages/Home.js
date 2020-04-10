import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  let posts = "";
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    posts = { data: data.getPosts };
  }

  return (
    <div>
      <h1>Recent posts</h1>
      {loading ? (
        <h3>Loading posts..</h3>
      ) : (
        posts.data &&
        posts.data.map(post => <PostCard key={post.id} post={post} />)
      )}
      {user && <PostForm />}
    </div>
  );
}

export default Home;
