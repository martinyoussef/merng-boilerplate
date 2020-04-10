import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostCard from "../components/PostCard";

function Home() {
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
    </div>
  );
}

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
