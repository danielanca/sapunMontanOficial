import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const CheckAuth = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.auth.authorise === false ? <Outlet /> : <Navigate to="/admin" state={{ from: location }} replace />;
};

export default CheckAuth;
