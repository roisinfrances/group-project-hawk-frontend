import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import Header from "./Header";

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
        <Header role={role} logoutFunction={logout} />
        <Dashboard client={client} role={role} />
        </div>
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )
      } 
    </>
  );
}

export default App;
