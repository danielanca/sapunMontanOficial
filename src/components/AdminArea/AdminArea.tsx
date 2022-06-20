import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Admin, Resource, ListGuesser, email } from "react-admin";
import { useEffect, useState } from "react";

import Login from "./LogIn";
import useAuth from "../hooks/useAuth";
import { requestOrdersList } from "../../services/emails";
import Dashboard from "./../AdminArea/Dashboard/index";

import React from "react";

import "./../../assets/scss/theme.scss";
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

  return <Dashboard />;
};

export default AdminArea;
