import React, { useState } from "react";
import {Button, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';


function Add(props) {
  const [disabled, cDisabled] = useState(false);
  
  const submitHandler = (e) => {
    console.log("submit handler")
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvent) {
      result = props.client.updateEvent(
        props.currentEvent._id,
        e.target.eventName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.date.value
      );
    } else {
      result = props.client.addEvent(e.target.eventName.value, e.target.location.value, e.target.description.value, e.target.date.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        toastr.success("You can now view the event on the Dashboard","Event added!")
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      {props.currentEvent ? "Update" : "Add"}
      <br />
      <Form className="mx-4" onSubmit={(e) => submitHandler(e)} id="addForm">
        <Row>
          <Col>
              <Form.Group controlId="eventName" >
                <Form.Label>Name of the event</Form.Label>
                <Form.Control type="text" defaultValue={props.currentEvent?.name} disabled={disabled} required
                />
              </Form.Group>
          </Col>
          <Col>
              <Form.Group controlId="location" >
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" defaultValue={props.currentEvent?.location} disabled={disabled} required
                />
              </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col>
              <Form.Group controlId="date" >
                <Form.Label>Date and time</Form.Label>
                <Form.Control type="datetime-local" defaultValue={props.currentEvent?.date} disabled={disabled} required
                />
              </Form.Group>
          </Col>
          <Col>
              <Form.Group controlId="description" >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={props.currentEvent?.description} disabled={disabled} required
                />
              </Form.Group>
          </Col>
        </Row>
        <Button variant="warning" type="submit" disabled={disabled}>
        {" "}
          Submit{" "}
        </Button>
      </Form>
      
    </>
  );
}

export default Add;
