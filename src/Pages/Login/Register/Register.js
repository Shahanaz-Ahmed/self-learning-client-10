import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, setLoading } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, photoURL, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setError("");
        form.reset();
        handleUpdateUserProfile(name, photoURL);
        navigate("/login");
      })
      .catch((e) => {
        console.error(e);
        setError(e.code);
      });
    setLoading(false);
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
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
        className=" shadow-lg bg-body p-5 rounded w-100"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h3 className="fw-bold">
            <Form.Label>Register</Form.Label>
          </h3>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Your Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            name="photoURL"
            type="text"
            placeholder="Enter Photo URL"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
        <Button variant="outline-primary fw-semibold" type="submit">
          Register
        </Button>
        <p>
          <small>
            {" "}
            Already have an account? Please <Link to="/Login">Login</Link>
          </small>
        </p>
      </Form>
    </div>
  );
};

export default Register;
