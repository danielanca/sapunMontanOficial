import React from "react";
import { Redirect } from "react-router-dom";

import { DefaultLayout } from "./layouts";
import BlogOverview from "./views/BlogOverview";
import AddNewPost from "./views/AddNewPost";
import OrdersTable from "./views/OrdersTable";
import ProductsPage from './views/ProductsPage';
import EditProduct from "../EditProduct";
import EditStrings from "../EditStrings/EditStrings";

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
    component: OrdersTable
  },
  { 
    path:'manage-product',
    layout: DefaultLayout,
    component: ProductsPage
  },
  { 
    path:'edit/:productID',
    layout: DefaultLayout,
    component: EditProduct
  },
  { 
    path:'content-list',
    layout: DefaultLayout,
    component: EditStrings
  }
];
