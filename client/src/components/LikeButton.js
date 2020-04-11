import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <>
        <IconButton color="primary" aria-label="like post" onClick={likePost}>
          <FavoriteIcon />
        </IconButton>
      </>
    ) : (
      <>
        <IconButton aria-label="like post" onClick={likePost}>
          <FavoriteIcon />
        </IconButton>
      </>
    )
  ) : (
    <IconButton aria-label="like post" component={Link} to="/login">
      <FavoriteIcon />
    </IconButton>
  );

  return (
    <>
      {likeButton}
      <span>{likeCount}</span>
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
