import React from "react";
// import { Button, Form } from 'semantic-ui-react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ""
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      //   data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts]
        }
      });
      values.body = "";
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        Create a post
      </Typography>
      <form noValidate onSubmit={onSubmit}>
        <TextField
          id="body"
          name="body"
          type="text"
          label="Body"
          value={values.body}
          onChange={onChange}
          variant="outlined"
          helperText={error && error.graphQLErrors[0].message}
          error={error ? true : false}
        />
        <br /> <br />
        {/* {errors.general && <p style={{ color: "red" }}>{errors.general}</p>} */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
