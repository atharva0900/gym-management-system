import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./userComponents/Home";
import PageNotFound from "./PageNotFound";
import Register from "./userComponents/Register";
import Login from "./userComponents/Login";
import FetchPackages from "./userComponents/packages/FetchPackages.js";

import LoginProvider from "./context/LoginContext.js";

import Dashboard from "./adminComponents/Dashboard.js";
import AddPackage from "./adminComponents/packagesCRUD/AddPackage.js";
import ManagePackages from "./adminComponents/packagesCRUD/ManagePackages.js";
import ManageTrainers from "./adminComponents/trainersCRUD/ManageTrainers.js";
import AddTrainer from "./adminComponents/trainersCRUD/AddTrainer.js";
import ManageMembers from "./adminComponents/membersCRUD/ManageMembers.js";
import ManageMemberships from "./adminComponents/membershipsCRUD/ManageMemberships.js";

import Membership from "./userComponents/Membership.js";
import FetchTrainers from "./userComponents/trainers/FetchTrainers.js";
import AboutUs from "./userComponents/StaticComponents/AboutUs.js";
import ContactUs from "./userComponents/StaticComponents/ContactUs.js";
import HeroSection from "./userComponents/StaticComponents/HeroSection.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/membership", element: <Membership /> },
  { path: "/trainers", element: <FetchTrainers /> },
  { path: "/packages", element: <FetchPackages /> },
  { path: "/aboutUs", element: <AboutUs /> },
  { path: "/contactUs", element: <ContactUs /> },
  { path: "/heroSectionUs", element: <HeroSection /> },

  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <ManagePackages /> },
      { path: "add-package", element: <AddPackage /> },
      { path: "manage-trainers", element: <ManageTrainers /> },
      { path: "add-trainer", element: <AddTrainer /> },
      { path: "manage-members", element: <ManageMembers /> },
      { path: "manage-memberships", element: <ManageMemberships /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
    <RouterProvider router={routes}></RouterProvider>
  </LoginProvider>
);
