import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Styles
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import "./App.css";

//Authentication
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

// Components
import Navbar from "./components/Navbar";
// import Container from "@material-ui/core/Container";

// Routes
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

// Theme Styles
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3374d6",
      main: "#0052CC",
      dark: "#00398e",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ffab00",
      dark: "#FF991F",
      contrastText: "#172B4D"
    }
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/posts/:postId" component={SinglePost} />
          </div>
        </Router>
      </MuiThemeProvider>
    </AuthProvider>
  );
}

export default App;
