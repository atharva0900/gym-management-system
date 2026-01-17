// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";

// export default function Dashboard() {
//   return (
//     <div className="container py-4">
//       <div className="d-flex gap-2 mb-3 flex-wrap">
//         <NavLink className="btn btn-outline-primary" to={"/dashboard"}>
//           Packages
//         </NavLink>
//         <NavLink
//           className="btn btn-outline-primary"
//           to={"/dashboard/add-package"}
//         >
//           Add Package
//         </NavLink>
//         <NavLink
//           className="btn btn-outline-primary"
//           to={"/dashboard/manage-trainers"}
//         >
//           Trainers
//         </NavLink>
//         <NavLink
//           className="btn btn-outline-primary"
//           to={"/dashboard/add-trainer"}
//         >
//           Add Trainer
//         </NavLink>
//         <NavLink
//           className="btn btn-outline-primary"
//           to={"/dashboard/manage-members"}
//         >
//           Members
//         </NavLink>
//         <NavLink
//           className="btn btn-outline-primary"
//           to={"/dashboard/manage-memberships"}
//         >
//           Memberships
//         </NavLink>

//       </div>
//       <Outlet />
//     </div>
//   );
// }

import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Dashboard() {
  const { setIsLogin, setUserId, setRole, setUserName } =
    useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear context
    setIsLogin(false);
    setUserId(null);
    setRole("");
    setUserName("");

    // clear sessionStorage
    sessionStorage.clear();

    // redirect to home
    navigate("/");
  };

  return (
    <div className="container py-4">
      <div className="d-flex gap-2 mb-3 flex-wrap">
        <NavLink className="btn btn-outline-primary" to={"/dashboard"}>
          Packages
        </NavLink>
        <NavLink
          className="btn btn-outline-primary"
          to={"/dashboard/add-package"}
        >
          Add Package
        </NavLink>
        <NavLink
          className="btn btn-outline-primary"
          to={"/dashboard/manage-trainers"}
        >
          Trainers
        </NavLink>
        <NavLink
          className="btn btn-outline-primary"
          to={"/dashboard/add-trainer"}
        >
          Add Trainer
        </NavLink>
        <NavLink
          className="btn btn-outline-primary"
          to={"/dashboard/manage-members"}
        >
          Members
        </NavLink>
        <NavLink
          className="btn btn-outline-primary"
          to={"/dashboard/manage-memberships"}
        >
          Memberships
        </NavLink>

        {/* Logout button */}
        <button className="btn btn-danger ms-auto" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
}
