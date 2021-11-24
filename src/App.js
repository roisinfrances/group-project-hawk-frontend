import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import {Button, Row} from 'react-bootstrap';
import { findAllByRole } from "@testing-library/dom";

function App() {
  const [token,changeToken] = useState(window.localStorage.getItem("token"));
  const [role,changeRole] = useState(window.localStorage.getItem("role"));

  const client = new ApiClient(
    token,
    () => logout()
  );

  const login = (payload) => {
    window.localStorage.setItem("token",payload.token);
    window.localStorage.setItem("role",payload.role);
    changeToken(payload.token);
    changeRole(payload.role)
  }
  
  //logout user
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("role");
    changeToken(undefined);
    changeRole(undefined);
  }

  return (
    <>
      {token ? (
        <div class="p-4">
        <Dashboard client={client} role={role} />
        <br></br>
        <Row>
          <Button  variant="secondary" onClick={logout} size="sm">
            Log Out
          </Button>
        </Row>
        </div>
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )
      } 
    </>
  );
}

export default App;
