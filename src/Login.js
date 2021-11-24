import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function Login(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    console.log("submitted");
    e.preventDefault();
    cDisabled(true);

    props.client
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false);
        console.log(response.data);
        props.loggedIn(response.data);
      })
      .catch((error) => {
        alert("an error occurred, please try again");
        console.log(error);
        cDisabled(false);
      });
  };

  return (
    <>
      <div className="login">Login</div>
      <br />
      <Form className="mx-4 my-4" onSubmit={(e) => submitHandler(e)}>
        <Row sm={4}>
          <Col>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" disabled={disabled} />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={4}>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" disabled={disabled} />
            </Form.Group>
          </Col>
        </Row>
        <Button
          className="mt-2"
          variant="secondary"
          type="submit"
          disabled={disabled}
        >
          {" "}
          Submit{" "}
        </Button>
      </Form>
    </>
  );
}

export default Login;
