import styles from "./AdminArea.module.scss";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Admin, Resource, ListGuesser, email } from "react-admin";
import { useEffect, useState } from "react";
import Login from "./LogIn";
import useAuth from "../hooks/useAuth";
import { requestOrdersList } from "../../services/emails";
const AdminArea = () => {
  const [isUserLogged, setIsLogged] = useState(false);
  const { auth } = useAuth();

  const requestData = async () => {
    try {
      await requestOrdersList().then((response) => {
        response.json().then((result) => {
          console.log("Response from Server:", result);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestData();
  }, []);
  return <div>Here will be Admin Area</div>;
};

export default AdminArea;
