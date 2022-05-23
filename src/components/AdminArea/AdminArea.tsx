import styles from "./AdminArea.module.scss";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Admin, Resource, ListGuesser, email } from "react-admin";
import { useState } from "react";
import Login from "./LogIn";

const AdminArea = () => {
  const [isUserLogged, setIsLogged] = useState(false);

  return <div>Here will be Admin Area</div>;
};

export default AdminArea;
