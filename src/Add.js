import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import { MultiSelect } from "react-multi-select-component";

function Add(props) {
  const [disabled, cDisabled] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [selected3, setSelected3] = useState([]);

  const submitHandler = (e) => {
    console.log("submit handler");
    e.preventDefault();
    cDisabled(true);
    let result;
    let rooms = [];
    selected.map((item) => {
      rooms.push(item.value);
    });
    let areas = [];
    selected2.map((item) => {
      areas.push(item.value);
    });
    let products = [];
    selected3.map((item) => {
      products.push(item.value);
    });
    if (props.currentQuote) {
      console.log("update called");
      result = props.client.updateQuote(
        props.currentQuote._id,
        rooms,
        areas,
        e.target.jobDescription.value,
        products,
        e.target.cost.value,
        e.target.date.value
      );
    } else {
      console.log("add called");

      result = props.client.addQuote(
        rooms,
        areas,
        e.target.jobDescription.value,
        products,
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
    { label: "Kitchen", value: "Kitchen " },
    { label: "Bathroom", value: "Bathroom " },
    { label: "Bedroom", value: "Bedroom " },
    { label: "Living Room", value: "Living room " },
    { label: "Hallway", value: "Hallway " },
    { label: "Dining Room", value: "Dining room " },
    { label: "Cellar ", value: "Cellar " },
  ];

  const options2 = [
    { label: "Ceiling", value: "Ceiling " },
    { label: "Interior walls", value: "Interior walls " },
    { label: "Exterior walls", value: "Exterior walls " },
    { label: "Doors", value: "Doors " },
    { label: "Stairs", value: "Stairs " },
    { label: "Floors", value: "Floors " }
  ];

  const options3 = [
    { label: "Interior paint", value: "Interior paint " },
    { label: "Exterior paint", value: "Exterior paint " },
    { label: "Plaster", value: "Plaster " },
    { label: "Wood", value: "Wood " },
    { label: "Paint thinner", value: "Paint thinner " },
    { label: "Filler", value: "Filler " },
    { label: "Varnish", value: "Varnish " },
    { label: "Tiles", value: "Tiles " },
    { label: "Grout", value: "Grout " },
    { label: "Adhesive", value: "Adhesive " },
    { label: "Wallpaper", value: "Wallpaper  " },
    { label: "Wallpaper paste", value: "Wallpaper paste " },
    { label: "Paint Roller", value: "Paint Roller " },
    { label: "Brush", value: "Brush " }



  ];

  return (
    <>
      <div className="add">
        {props.currentQuote ? "Update Selected Job" : "Add New Job"}
      </div>
      <br />
      <Form className="mx-4" onSubmit={(e) => submitHandler(e)} id="addForm">
        <Row sm={2}>
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
        <Row sm={2}>
          <Col>
            <Form.Group controlId="areas">
              <Form.Label>Areas</Form.Label>
              <div>
                <MultiSelect
                  options={options2}
                  value={selected2}
                  onChange={setSelected2}
                  labelledBy="Select"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row sm={2}>
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
        <Row sm={2}>
          <Col>
            <Form.Group controlId="productsRequired">
              <Form.Label>Products Required</Form.Label>
              <div>
                <MultiSelect
                  options={options3}
                  value={selected3}
                  onChange={setSelected3}
                  labelledBy="Select"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row sm={2}>
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
        <Row sm={2}>
          <Col>
            <Form.Group controlId="date">
              <Form.Label>Date and time</Form.Label>
              <Form.Control
                type="date"
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
