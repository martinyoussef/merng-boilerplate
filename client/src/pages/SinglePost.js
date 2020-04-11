import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { AuthContext } from "../context/auth";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import IconButton from "@material-ui/core/IconButton";
import MessageIcon from "@material-ui/icons/Message";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log(postId);

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (loading) return <p>Loading...</p>;
  if (!data.getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = data.getPost;

    postMarkup = (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {username}
          </Typography>
          <Typography color="textSecondary">{body}</Typography>
          <Typography color="textSecondary">
            {moment(createdAt).fromNow()}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikeButton user={user} post={{ id, likes, likeCount }} />

          <IconButton aria-label="comment">
            <MessageIcon />
          </IconButton>
          <span>{commentCount} Comments</span>

          {user && user.username === username && (
            <DeleteButton postId={id} callback={deletePostCallback} />
          )}
        </CardActions>
      </Card>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
