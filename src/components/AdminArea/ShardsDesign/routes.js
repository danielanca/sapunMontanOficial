import React from "react";
import { Redirect } from "react-router-dom";

import { DefaultLayout } from "./layouts";
import BlogOverview from "./views/BlogOverview";
import AddNewPost from "./views/AddNewPost";
import Tables from "./views/Tables";

export default [
  {
    path: "",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "addpost",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "orders",
    layout: DefaultLayout,
    component: Tables
  }
];
