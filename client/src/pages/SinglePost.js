import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
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
      <>
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
        {user && (
          <>
            <Typography gutterBottom variant="h5" component="h2">
              Post a comment
            </Typography>
            <form noValidate>
              <TextField
                id="text"
                name="text"
                type="text"
                label="Body"
                placeholder="comment..."
                value={comment}
                onChange={event => setComment(event.target.value)}
                variant="outlined"
                ref={commentInputRef}
              />
              <br /> <br />
              <Button
                type="submit"
                disabled={comment.trim() === ""}
                onClick={submitComment}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </>
        )}
        <>
          {comments.map(comment => (
            <Card key={comment.id}>
              <CardContent>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Typography>{comment.username}</Typography>
                <Typography>{moment(comment.createdAt).fromNow()}</Typography>
                <Typography>{comment.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </>
      </>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

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
