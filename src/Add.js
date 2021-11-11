import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import Multiselect from "multiselect-react-dropdown";

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    console.log("submit handler");
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentQuote) {
      result = props.client.updateQuote(
        props.currentQuote._id,
        e.target.rooms.value,
        e.target.areas.value,
        e.target.jobDescription.value,
        e.target.productsRequired.value,
        e.target.cost.value,
        e.target.date.value
      );
    } else {
      result = props.client.addQuote(
        e.target.rooms.value,
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

  return (
    <>
      <div className="add">
        {props.currentQuote ? "Update selected job" : "Add new job"}
      </div>
      <br />
      <Form className="mx-4" onSubmit={(e) => submitHandler(e)} id="addForm">
        <Row sm={4}>
          <Col>
            <Form.Group controlId="rooms">
              <Form.Label>Rooms</Form.Label>
              <Multiselect
                displayValue="key"
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={function noRefCheck() {}}
                options={[
                  {
                    cat: "Group 1",
                    key: "Option 1",
                  },
                  {
                    cat: "Group 1",
                    key: "Option 2",
                  },
                  {
                    cat: "Group 1",
                    key: "Option 3",
                  },
                  {
                    cat: "Group 2",
                    key: "Option 4",
                  },
                  {
                    cat: "Group 2",
                    key: "Option 5",
                  },
                  {
                    cat: "Group 2",
                    key: "Option 6",
                  },
                  {
                    cat: "Group 2",
                    key: "Option 7",
                  },
                ]}
                showCheckbox
              />
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
                type="text"
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
