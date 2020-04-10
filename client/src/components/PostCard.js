import React from "react";
import moment from "moment";

//MUI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";
import Typography from "@material-ui/core/Typography";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const likePost = () => console.log("Post liked!");
  const commentOnPost = () => console.log("Comment made!");
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
        <IconButton aria-label="like post" onClick={likePost}>
          <FavoriteIcon />
        </IconButton>
        <span>1 Like</span>
        <IconButton aria-label="comment" onClick={commentOnPost}>
          <MessageIcon />
        </IconButton>
        <span>2 Comments</span>
      </CardActions>
    </Card>
  );
}

export default PostCard;
