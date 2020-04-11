import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";

// Components
import LikeButton from "./LikeButton";

//MUI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageIcon from "@material-ui/icons/Message";
import Typography from "@material-ui/core/Typography";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
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

        <IconButton aria-label="comment" component={Link} to={`/posts/${id}`}>
          <MessageIcon />
        </IconButton>
        <span>2 Comments</span>

        {user && user.username === username && (
          <IconButton
            color="secondary"
            aria-label="like post"
            onClick={() => console.log("Delete post")}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default PostCard;
