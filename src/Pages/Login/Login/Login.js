import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate("");
  const { providerLogin, signIn, setLoading } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError("");
        navigate(from, { replace: true });
      })
      .catch((e) => {
        console.error(e);
        setError(e.code);
      });
    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((e) => {
        console.error(e);
        setError(e.code);
      });
    setLoading(false);
  };

  const handleGitHubSignIn = () => {
    providerLogin(gitHubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((e) => {
        console.error(e);
        setError(e.code);
      });
    setLoading(false);
  };

  return (
    <div className="w-75  mx-auto">
      <Form
        onSubmit={handleSubmit}
        className="shadow p-5 mb-4 bg-body rounded w-100"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h3 className="fw-bold">
            {" "}
            <Form.Label>Login</Form.Label>
          </h3>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Text className="text-danger">{error}</Form.Text>
        <br />
        <Button
          className="mb-3 fw-semibold"
          variant="outline-primary"
          type="submit"
        >
          Login
        </Button>{" "}
        <br />
        <Button
          onClick={handleGoogleSignIn}
          variant="outline-info"
          className="mb-3 fw-semibold"
        >
          <FaGoogle></FaGoogle> Login with Google
        </Button>{" "}
        <br />
        <Button
          className="fw-semibold"
          onClick={handleGitHubSignIn}
          variant="outline-dark"
        >
          <FaGithub></FaGithub> Login with GitHub
        </Button>
        <p>
          <small>
            {" "}
            New to this website? Please <Link to="/register">Register</Link>
          </small>
        </p>
      </Form>
    </div>
  );
};

export default Login;
