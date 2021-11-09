import React, { useState } from "react";
import {Row, Col, Form, Button} from 'react-bootstrap';

function Login(props) {
  
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
  console.log("submitted");
   e.preventDefault();
   cDisabled(true);

   props.client
    .login(e.target.username.value,e.target.password.value)
    .then( (response) => {
      cDisabled(false);
      console.log(response.data.token);
      props.loggedIn(response.data.token);

    })
    .catch((error) => {
        alert("an error occurred, please try again")
        console.log(error);
        cDisabled(false);
    });
  };

  return (
    <>
      Login
      <br />
      <Form className="mx-4 my-4" onSubmit={(e) => submitHandler(e)}>
        <Row>
          <Col>
              <Form.Group controlId="username" >
                <Form.Label>username</Form.Label>
                <Form.Control type="text" disabled={disabled}
                />
              </Form.Group>
          </Col>
          <Col>
              <Form.Group controlId="password" >
                <Form.Label>password</Form.Label>
                <Form.Control type="password" disabled={disabled}
                />
              </Form.Group>
          </Col>
        </Row>
        <Button className="mt-2" variant="secondary" type="submit" disabled={disabled}>
        {" "}
          Submit{" "}
        </Button>
      </Form>
    </>
  );
}

export default Login;
