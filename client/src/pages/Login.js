import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Card style={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Login
        </Typography>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id="username"
            name="username"
            type="text"
            label="Username"
            value={values.username}
            onChange={onChange}
            variant="outlined"
            helperText={errors.username}
            error={errors.username ? true : false}
          />
          <br /> <br />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={onChange}
            variant="outlined"
            helperText={errors.password}
            error={errors.password ? true : false}
          />
          <br /> <br />
          {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Login
            {loading && <CircularProgress size={30} />}
          </Button>
          <br />
          <br />
          <small>
            Don't have an account? Register <Link to="/register">here</Link>
          </small>
        </form>
      </CardContent>
    </Card>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
