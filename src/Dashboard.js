import React, { useState, useEffect } from "react";
//import Table from "react-bootstrap/Table";
import Add from "./Add";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return quotes.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.rooms}</td>
          <td>{current.areas}</td>
          <td>{current.jobDescription}</td>
          <td>{current.productsRequired}</td>
          <td>{current.cost}</td>

          {/* moment().format('MMMM Do YYYY, h:mm:ss a') */}
          <td>{moment(current.date).format("MMMM Do YYYY, h:mm a")}</td>
          <td>
            <Button 
            className="mx-1" 
            onClick={() => removeQuote(current._id)} 
            variant="danger">
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
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <br />
      <Table className="mx-4" size="sm" responsive="md" fluid>
        <thead>
          <tr>
            <th>Rooms</th>
            <th>Areas</th>
            <th>Job Details</th>
            <th>Products</th>
            <th>Cost</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </Table>
      <br />
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentQuote={current}
      />
    </>
  );
}

export default Dashboard;
