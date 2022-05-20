import styles from "./AdminArea.module.scss";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Admin, Resource, ListGuesser } from "react-admin";
import { useState } from "react";
import Login from "./LogIn";
const AdminArea = () => {
  const [isUserLogged, setIsLogged] = useState(false);

  const isAuthenticated = () => {
    if (!isUserLogged) {
      return <Login></Login>;
    } else {
      <div>Here will be Admin Area</div>;
    }
  };
  return <>{isAuthenticated()}</>;
};

export default AdminArea;
