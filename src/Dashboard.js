import React, { useState, useEffect } from "react";
//import Table from "react-bootstrap/Table";
import Add from "./Add";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function Dashboard(props) {
  const [quotes, cQuotes] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getQuotes().then((response) => cQuotes(response.data));
  };

  const removeQuote = (id) => {
    props.client.removeQuote(id).then(() => refreshList());
  };

  const updateQuote = (quote) => {
    cCurrent(quote);
  };

  const addJob = (current) => {
    console.log(current)
    props.client.startJob(current._id).then(() => refreshList());
  };

  useEffect(() => {
    refreshList();
  }, []);

  const inProgressJobs = quotes.filter(q => q.started && q.completed === undefined);
  const completedJobs = quotes.filter(q => q.started && q.completed);

  const buildrows = (jobs) => {
    return jobs.map((current) => {
      return (
        <Tr key={current._id}>
          <Td>{current.rooms}</Td>
          <Td>{current.areas}</Td>
          <Td>{current.jobDescription}</Td>
          <Td>{current.productsRequired}</Td>
          <Td>£{current.cost}</Td>
          <Td>{moment(current.started).format("MMMM Do YYYY, h:mm a")}</Td>
          <Td>{moment(current.completed).format("MMMM Do YYYY, h:mm a")}</Td>

          {/* moment().format('MMMM Do YYYY, h:mm:ss a') */}
          <Td>{moment(current.date).format("MMMM Do YYYY, h:mm a")}</Td>
          <Td>
            <Button
              className="mx-1"
              onClick={() => removeQuote(current._id)}
              variant="danger"
            >
              Remove
            </Button>

            <Button
              className="mx-1"
              onClick={() => updateQuote(current)}
              type="button"
              variant="warning"
            >
              Update
            </Button>
            <Button className="mx-1" variant="success" onClick={() => addJob(current)}>
              Start Job
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <>
      <br />

      <Tabs
        defaultActiveKey="quotes"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="quotes" title="Quotes">
          <Table size="sm" responsive="md" fluid>
            <Thead>
              <Tr>
                <Th>Rooms</Th>
                <Th>Areas</Th>
                <Th>Job Details</Th>
                <Th>Products</Th>
                <Th>Cost</Th>
                <Th>Started</Th>
                <Th>Completed</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>{buildrows(quotes)}</Tbody>
          </Table>
          <br />
          <br />
        </Tab>
        <Tab eventKey="inProgress" title="Jobs In Progress">
          <Table size="sm" responsive="md" fluid>
            <Thead>
              <Tr>
                <Th>Rooms</Th>
                <Th>Areas</Th>
                <Th>Job Details</Th>
                <Th>Products</Th>
                <Th>Cost</Th>
                <Th>Started</Th>
                <Th>Completed</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>{buildrows(inProgressJobs)}</Tbody>
          </Table>
        </Tab>
        <Tab eventKey="completed" title="Completed Jobs">
          <Table size="sm" responsive="md" fluid>
            <Thead>
              <Tr>
                <Th>Rooms</Th>
                <Th>Areas</Th>
                <Th>Job Details</Th>
                <Th>Products</Th>
                <Th>Cost</Th>
                <Th>Started</Th>
                <Th>Completed</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>{buildrows(completedJobs)}</Tbody>
          </Table>
        </Tab>

        {props.role === "admin" &&

          <Tab eventKey="adminOnly" title="Admin Only">
            <h2>For Admins Only</h2>
            <Button variant="info" href="https://docs.google.com/spreadsheets/d/1Xxx_pVpF_1i3KNPnpoy1MM4oN5x-L9kaj3QaTbF0lQo/edit?usp=sharing" target="_blank">
              Price Estimation
            </Button>
          </Tab>

        }

        <Tab eventKey="add" title="New Quote">
          <Add
            client={props.client}
            refreshList={() => {
              refreshList();
              cCurrent(undefined);
            }}
            currentQuote={current}
          />
        </Tab>
      </Tabs>
    </>
  );
}

export default Dashboard;
