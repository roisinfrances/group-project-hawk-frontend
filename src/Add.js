import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import { MultiSelect } from "react-multi-select-component";

function Add(props) {
  const [disabled, cDisabled] = useState(false);
  const [selected, setSelected] = useState([]);

  const submitHandler = (e) => {
    console.log("submit handler");
    e.preventDefault();
    cDisabled(true);
    let result;
    let rooms = [];
    selected.map((item) => {
      rooms.push(item.value);
    });
    if (props.currentQuote) {
      console.log("update called");
      result = props.client.updateQuote(
        props.currentQuote._id,
        rooms,
        e.target.areas.value,
        e.target.jobDescription.value,
        e.target.productsRequired.value,
        e.target.cost.value,
        e.target.date.value
      );
    } else {
      console.log("add called");

      result = props.client.addQuote(
        rooms,
        e.target.areas.value,
        e.target.jobDescription.value,
        e.target.productsRequired.value,
        e.target.cost.value,
        e.target.date.value
      );
    }

    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        toastr.success(
          "You can now view the quote on the Dashboard",
          "Quote added!"
        );
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  const options = [
    { label: "Kitchen", value: "kitchen" },
    { label: "Bathroom", value: "bathroom" },
    { label: "Living Room", value: "living room" },
  ];

  return (
    <>
      <div className="add">
        {props.currentQuote ? "Update Selected Job" : "Add New Job"}
      </div>
      <br />
      <Form className="mx-4" onSubmit={(e) => submitHandler(e)} id="addForm">
        <Row sm={4}>
          <Col>
            <Form.Group controlId="rooms">
              <Form.Label>Rooms</Form.Label>
              <div>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row sm={4}>
          <Col>
            <Form.Group controlId="areas">
              <Form.Label>Areas</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.currentQuote?.areas}
                disabled={disabled}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row sm={4}>
          <Col>
            <Form.Group controlId="jobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.currentQuote?.jobDescription}
                disabled={disabled}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={4}>
          <Col>
            <Form.Group controlId="productsRequired">
              <Form.Label>Products Required</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.currentQuote?.productsRequired}
                disabled={disabled}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={4}>
          <Col>
            <Form.Group controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                defaultValue={props.currentQuote?.cost}
                disabled={disabled}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={4}>
          <Col>
            <Form.Group controlId="date">
              <Form.Label>Date and time</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue={props.currentQuote?.date}
                disabled={disabled}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Button variant="warning" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </Button>
      </Form>
    </>
  );
}

export default Add;
