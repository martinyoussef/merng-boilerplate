import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";

// Components
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

//MUI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MessageIcon from "@material-ui/icons/Message";
import Typography from "@material-ui/core/Typography";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card style={{ margin: "2rem" }}>
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
        <span>{commentCount} Comments</span>

        {user && user.username === username && <DeleteButton postId={id} />}
      </CardActions>
    </Card>
  );
}

export default PostCard;
