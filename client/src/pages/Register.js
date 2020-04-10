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

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
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

  function registerUser() {
    addUser();
  }

  return (
    <Card style={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Welcome - Sign up!
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
            id="email"
            name="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={onChange}
            variant="outlined"
            helperText={errors.email}
            error={errors.email ? true : false}
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={onChange}
            variant="outlined"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          />
          <br /> <br />
          {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Sign up
            {loading && <CircularProgress size={30} />}
          </Button>
          <br />
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </CardContent>
    </Card>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
