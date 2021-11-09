import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Add from "./Add";
import Button from 'react-bootstrap/Button';
import moment from 'moment';

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvent(id).then(() => refreshList());
  };

  const updateEvent = (event) => {
    cCurrent(event);
  };

  useEffect(() => {
    refreshList();
  }, []);

  
  const buildrows = () => {
  
    return events.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.name}</td>
          <td>{current.location}</td>
          <td>{current.description}</td>
          {/* moment().format('MMMM Do YYYY, h:mm:ss a') */}
          <td>{moment(current.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
          <td>
            <Button onClick={() => removeEvent(current._id)} variant="danger">Remove</Button>
            
            <Button onClick={() => updateEvent(current)} type="button" variant="warning">Update</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      Dashboard
      <br />
      <Table className="mx-4" size="sm" responsive="md" fluid>
        <thead>
          <tr>
            <th>Event</th>
            <th>Location</th>
            <th>Description</th>
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
        currentEvent={current}
      />
    </>
  );
}

export default Dashboard;
