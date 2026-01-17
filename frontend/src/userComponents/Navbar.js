import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import Swal from "sweetalert2";
import { LoginContext } from "../context/LoginContext";

export default function Navbar() {
  const {
    isLogin,
    setIsLogin,
    setUserId,
    role,
    setRole,
    userName,
    setUserName,
  } = useContext(LoginContext);

  const navigate = useNavigate();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    sex: "",
    weight: "",
  });

  // Logout
  const handleLogout = () => {
    setIsLogin(false);
    setUserId(null);
    setRole("customer");
    setUserName("");
    sessionStorage.removeItem("gym_session");
    navigate("/");
  };

  // Open modal with existing data
  const handleOpenModal = () => {
    const session = JSON.parse(sessionStorage.getItem("gym_session"));
    if (!session) {
      Swal.fire(
        "Error",
        "User ID not found in session. Please login again",
        "error"
      );
      navigate("/login");
      return;
    }

    setFormData({
      name: session.userName || "",
      email: session.email || "",
      phone: session.phone || "",
      age: session.age || "",
      sex: session.sex || "",
      weight: session.weight || "",
    });

    setShowModal(true);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile update
  const handleSave = async () => {
    const session = JSON.parse(sessionStorage.getItem("gym_session"));
    if (!session) {
      Swal.fire(
        "Error",
        "User not found in session. Please login again",
        "error"
      );
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/customers/update/${session.userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        Swal.fire("Success", "Profile updated successfully!", "success");

        // Update context & session
        setUserName(updated.name);
        sessionStorage.setItem(
          "gym_session",
          JSON.stringify({
            ...session,
            userName: updated.name,
            email: updated.email,
            phone: updated.phone,
            age: updated.age,
            sex: updated.sex,
            weight: updated.weight,
          })
        );

        setShowModal(false);
      } else {
        Swal.fire("Error", "Failed to update profile", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server not reachable", "error");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3 shadow">
        <Link
          className="navbar-brand fw-bold"
          to="hero"
          smooth={true}
          duration={500}
        >
          <i className="bi bi-activity me-1"></i> T3 Fitness
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            {/* Smooth Scroll Links */}
            <li className="nav-item">
              <Link className="nav-link" to="hero" smooth={true} duration={10}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="about" smooth={true} duration={10}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="trainers"
                smooth={true}
                duration={10}
              >
                Trainers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="packages"
                smooth={true}
                duration={10}
              >
                Packages
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="contact"
                smooth={true}
                duration={10}
              >
                Contact Us
              </Link>
            </li>

            {/* Routes for logged-in users */}
            {isLogin && role === "customer" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/membership">
                  Membership
                </NavLink>
              </li>
            )}
            {isLogin && role === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!isLogin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isLogin && (
              <div className="d-flex align-items-center gap-3 text-white">
                <span className="fw-semibold">{userName}</span>
                {/* <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleOpenModal}
                >
                  Update Profile
                </button> */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                <input
                  className="form-control mb-2"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  className="form-control mb-2"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                <input
                  className="form-control mb-2"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
                <input
                  className="form-control mb-2"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  placeholder="Sex"
                />
                <input
                  className="form-control mb-2"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
{
  // import React, { useContext } from "react";
  // import { NavLink, useNavigate } from "react-router-dom";
  // import { LoginContext } from "../context/LoginContext";
  // export default function Navbar() {
  //   const {
  //     isLogin,
  //     setIsLogin,
  //     setUserId,
  //     role,
  //     setRole,
  //     userName,
  //     setUserName,
  //   } = useContext(LoginContext);
  //   const navigate = useNavigate();
  //   return (
  //     <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
  //       <div className="container-fluid">
  //         <NavLink className="navbar-brand" to={"/"}>
  //           <i className="bi bi-activity"></i> T3 Fitness
  //         </NavLink>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-bs-toggle="collapse"
  //           data-bs-target="#nav"
  //           aria-controls="nav"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse" id="nav">
  //           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to={"/aboutUs"}>
  //                 About Us
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to={"/contactUs"}>
  //                 Contact Us
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to={"/"}>
  //                 Packages
  //               </NavLink>
  //             </li>
  //             {/* 👇 Add Trainers link here */}
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to={"/trainers"}>
  //                 Trainers
  //               </NavLink>
  //             </li>
  //             {isLogin && role === "customer" && (
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to={"/membership"}>
  //                   Membership
  //                 </NavLink>
  //               </li>
  //             )}
  //             {isLogin && role === "admin" && (
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to={"/dashboard"}>
  //                   Dashboard
  //                 </NavLink>
  //               </li>
  //             )}
  //           </ul>
  //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
  //             {!isLogin && (
  //               <>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to={"/register"}>
  //                     Register
  //                   </NavLink>
  //                 </li>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to={"/login"}>
  //                     Login
  //                   </NavLink>
  //                 </li>
  //               </>
  //             )}
  //             {isLogin && (
  //               <li className="nav-item d-flex align-items-center">
  //                 <span className="me-3 fw-bold text-primary">{userName}</span>
  //                 <button
  //                   className="btn btn-link nav-link"
  //                   onClick={() => {
  //                     setIsLogin(false);
  //                     setUserId(null);
  //                     setRole("customer");
  //                     setUserName(""); // clear name
  //                     sessionStorage.removeItem("gym_session");
  //                     navigate("/");
  //                   }}
  //                 >
  //                   Logout
  //                 </button>
  //               </li>
  //             )}
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // }
  // import React, { useContext } from "react";
  // import { NavLink, useNavigate } from "react-router-dom";
  // import { LoginContext } from "../context/LoginContext";
  // export default function Navbar() {
  //   const { isLogin, setIsLogin, userName, setUserId, setRole, setUserName } =
  //     useContext(LoginContext);
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     setIsLogin(false);
  //     setUserId(null);
  //     setRole("customer");
  //     setUserName("");
  //     sessionStorage.removeItem("gym_session"); // clear session
  //     navigate("/login");
  //   };
  //   return (
  //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
  //       <NavLink className="navbar-brand fw-bold" to="/">
  //         Gym System
  //       </NavLink>
  //       <div className="collapse navbar-collapse">
  //         <ul className="navbar-nav me-auto">
  //           {!isLogin && (
  //             <>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/login">
  //                   Login
  //                 </NavLink>
  //               </li>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/register">
  //                   Register
  //                 </NavLink>
  //               </li>
  //             </>
  //           )}
  //           {isLogin && (
  //             <>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/">
  //                   Home
  //                 </NavLink>
  //               </li>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/dashboard">
  //                   Dashboard
  //                 </NavLink>
  //               </li>
  //             </>
  //           )}
  //         </ul>
  //         {isLogin && (
  //           <div className="d-flex align-items-center gap-3 text-white">
  //             <span>{userName}</span>
  //             <button
  //               className="btn btn-outline-light btn-sm"
  //               onClick={handleLogout}
  //             >
  //               Logout
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     </nav>
  //   );
  // }
  // import React, { useContext } from "react";
  // import { NavLink, useNavigate } from "react-router-dom";
  // import { LoginContext } from "../context/LoginContext";
  // export default function Navbar() {
  //   const {
  //     isLogin,
  //     setIsLogin,
  //     setUserId,
  //     role,
  //     setRole,
  //     userName,
  //     setUserName,
  //   } = useContext(LoginContext);
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     setIsLogin(false);
  //     setUserId(null);
  //     setRole("customer");
  //     setUserName("");
  //     sessionStorage.removeItem("gym_session"); // clear session
  //     navigate("/login");
  //   };
  //   return (
  //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3 shadow">
  //       <NavLink className="navbar-brand fw-bold" to="/">
  //         <i className="bi bi-activity me-1"></i> T3 Fitness
  //       </NavLink>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#nav"
  //         aria-controls="nav"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>
  //       <div className="collapse navbar-collapse" id="nav">
  //         <ul className="navbar-nav me-auto">
  //           <li className="nav-item">
  //             <NavLink className="nav-link" to="/aboutUs">
  //               About Us
  //             </NavLink>
  //           </li>
  //           <li className="nav-item">
  //             <NavLink className="nav-link" to="/contactUs">
  //               Contact Us
  //             </NavLink>
  //           </li>
  //           <li className="nav-item">
  //             <NavLink className="nav-link" to="/">
  //               Packages
  //             </NavLink>
  //           </li>
  //           <li className="nav-item">
  //             <NavLink className="nav-link" to="/trainers">
  //               Trainers
  //             </NavLink>
  //           </li>
  //           {/* Role-specific links */}
  //           {isLogin && role === "customer" && (
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/membership">
  //                 Membership
  //               </NavLink>
  //             </li>
  //           )}
  //           {isLogin && role === "admin" && (
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/dashboard">
  //                 Dashboard
  //               </NavLink>
  //             </li>
  //           )}
  //         </ul>
  //         <ul className="navbar-nav ms-auto">
  //           {!isLogin && (
  //             <>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/register">
  //                   Register
  //                 </NavLink>
  //               </li>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/login">
  //                   Login
  //                 </NavLink>
  //               </li>
  //             </>
  //           )}
  //           {isLogin && (
  //             <div className="d-flex align-items-center gap-3 text-white">
  //               <span className="fw-semibold">{userName}</span>
  //               <button
  //                 className="btn btn-outline-light btn-sm"
  //                 onClick={handleLogout}
  //               >
  //                 Logout
  //               </button>
  //             </div>
  //           )}
  //         </ul>
  //       </div>
  //     </nav>
  //   );
  // }
  // -----------------
  // import React, { useContext, useState } from "react";
  // import { NavLink, useNavigate } from "react-router-dom";
  // import { LoginContext } from "../context/LoginContext";
  // export default function Navbar() {
  //   const {
  //     isLogin,
  //     setIsLogin,
  //     setUserId,
  //     role,
  //     setRole,
  //     userName,
  //     setUserName,
  //   } = useContext(LoginContext);
  //   const navigate = useNavigate();
  //   // modal states
  //   const [showModal, setShowModal] = useState(false);
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     age: "",
  //     sex: "",
  //     weight: "",
  //   });
  //   // open modal and fetch data
  //   const handleOpenModal = async () => {
  //     const userId = sessionStorage.getItem("userId");
  //     if (!userId) {
  //       alert("User ID not found in session. Please login again.");
  //       return;
  //     }
  //     try {
  //       const res = await fetch(`http://localhost:8080/api/customers/${userId}`);
  //       if (!res.ok) throw new Error("Failed to fetch customer details");
  //       const data = await res.json();
  //       setFormData({
  //         name: data.name || "",
  //         email: data.email || "",
  //         phone: data.phone || "",
  //         age: data.age || "",
  //         sex: data.sex || "",
  //         weight: data.weight || "",
  //       });
  //       setShowModal(true);
  //     } catch (err) {
  //       console.error("Error fetching customer:", err);
  //       alert("Error fetching profile details.");
  //     }
  //   };
  //   // handle input change
  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
  //   // save profile (update API call)
  //   const handleSave = async () => {
  //     const userId = sessionStorage.getItem("userId");
  //     try {
  //       const res = await fetch(
  //         `http://localhost:8080/api/customers/update/${userId}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(formData),
  //         }
  //       );
  //       if (res.ok) {
  //         alert("Profile updated successfully!");
  //         setUserName(formData.name); // update context name
  //         setShowModal(false);
  //       } else {
  //         alert("Error updating profile.");
  //       }
  //     } catch (err) {
  //       console.error("Error:", err);
  //       alert("Failed to update profile.");
  //     }
  //   };
  //   const handleLogout = () => {
  //     setIsLogin(false);
  //     setUserId(null);
  //     setRole("customer");
  //     setUserName("");
  //     sessionStorage.removeItem("gym_session");
  //     sessionStorage.removeItem("userId");
  //     navigate("/login");
  //   };
  //   return (
  //     <>
  //       <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3 shadow">
  //         <NavLink className="navbar-brand fw-bold" to="/">
  //           <i className="bi bi-activity me-1"></i> T3 Fitness
  //         </NavLink>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-bs-toggle="collapse"
  //           data-bs-target="#nav"
  //           aria-controls="nav"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse" id="nav">
  //           <ul className="navbar-nav me-auto">
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/aboutUs">
  //                 About Us
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/contactUs">
  //                 Contact Us
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/">
  //                 Packages
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/trainers">
  //                 Trainers
  //               </NavLink>
  //             </li>
  //             {isLogin && role === "customer" && (
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/membership">
  //                   Membership
  //                 </NavLink>
  //               </li>
  //             )}
  //             {isLogin && role === "admin" && (
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/dashboard">
  //                   Dashboard
  //                 </NavLink>
  //               </li>
  //             )}
  //           </ul>
  //           <ul className="navbar-nav ms-auto">
  //             {!isLogin && (
  //               <>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to="/register">
  //                     Register
  //                   </NavLink>
  //                 </li>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to="/login">
  //                     Login
  //                   </NavLink>
  //                 </li>
  //               </>
  //             )}
  //             {isLogin && (
  //               <div className="d-flex align-items-center gap-3 text-white">
  //                 <span className="fw-semibold">{userName}</span>
  //                 <button
  //                   className="btn btn-outline-light btn-sm"
  //                   onClick={handleOpenModal}
  //                 >
  //                   Update Profile
  //                 </button>
  //                 <button
  //                   className="btn btn-danger btn-sm"
  //                   onClick={handleLogout}
  //                 >
  //                   Logout
  //                 </button>
  //               </div>
  //             )}
  //           </ul>
  //         </div>
  //       </nav>
  //       {/* Modal */}
  //       {showModal && (
  //         <div
  //           className="modal fade show"
  //           style={{ display: "block" }}
  //           tabIndex="-1"
  //         >
  //           <div className="modal-dialog">
  //             <div className="modal-content">
  //               <div className="modal-header">
  //                 <h5 className="modal-title">Update Profile</h5>
  //                 <button
  //                   type="button"
  //                   className="btn-close"
  //                   onClick={() => setShowModal(false)}
  //                 ></button>
  //               </div>
  //               <div className="modal-body">
  //                 <input
  //                   type="text"
  //                   name="name"
  //                   className="form-control mb-2"
  //                   placeholder="Full Name"
  //                   value={formData.name}
  //                   onChange={handleChange}
  //                 />
  //                 <input
  //                   type="email"
  //                   name="email"
  //                   className="form-control mb-2"
  //                   placeholder="Email"
  //                   value={formData.email}
  //                   onChange={handleChange}
  //                 />
  //                 <input
  //                   type="text"
  //                   name="phone"
  //                   className="form-control mb-2"
  //                   placeholder="Phone"
  //                   value={formData.phone}
  //                   onChange={handleChange}
  //                 />
  //                 <input
  //                   type="number"
  //                   name="age"
  //                   className="form-control mb-2"
  //                   placeholder="Age"
  //                   value={formData.age}
  //                   onChange={handleChange}
  //                 />
  //                 <select
  //                   name="sex"
  //                   className="form-control mb-2"
  //                   value={formData.sex}
  //                   onChange={handleChange}
  //                 >
  //                   <option value="">Select Gender</option>
  //                   <option value="Male">Male</option>
  //                   <option value="Female">Female</option>
  //                   <option value="Other">Other</option>
  //                 </select>
  //                 <input
  //                   type="number"
  //                   name="weight"
  //                   className="form-control mb-2"
  //                   placeholder="Weight"
  //                   value={formData.weight}
  //                   onChange={handleChange}
  //                 />
  //               </div>
  //               <div className="modal-footer">
  //                 <button
  //                   className="btn btn-secondary"
  //                   onClick={() => setShowModal(false)}
  //                 >
  //                   Close
  //                 </button>
  //                 <button className="btn btn-primary" onClick={handleSave}>
  //                   Save Changes
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // }
  // ------------------------------------------------------------------------------------------------------------------------------------
  // import React, { useContext, useState } from "react";
  // import { NavLink, useNavigate } from "react-router-dom";
  // import Swal from "sweetalert2";
  // import { LoginContext } from "../context/LoginContext";
  // export default function Navbar() {
  //   const {
  //     isLogin,
  //     setIsLogin,
  //     setUserId,
  //     role,
  //     setRole,
  //     userName,
  //     setUserName,
  //   } = useContext(LoginContext);
  //   const navigate = useNavigate();
  //   // Modal state
  //   const [showModal, setShowModal] = useState(false);
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     age: "",
  //     sex: "",
  //     weight: "",
  //   });
  //   // Logout
  //   const handleLogout = () => {
  //     setIsLogin(false);
  //     setUserId(null);
  //     setRole("customer");
  //     setUserName("");
  //     sessionStorage.removeItem("gym_session");
  //     navigate("/login");
  //   };
  //   // Open modal with existing data
  //   const handleOpenModal = () => {
  //     const session = JSON.parse(sessionStorage.getItem("gym_session"));
  //     if (!session) {
  //       Swal.fire(
  //         "Error",
  //         "User ID not found in session. Please login again",
  //         "error"
  //       );
  //       navigate("/login");
  //       return;
  //     }
  //     setFormData({
  //       name: session.userName || "",
  //       email: session.email || "",
  //       phone: session.phone || "",
  //       age: session.age || "",
  //       sex: session.sex || "",
  //       weight: session.weight || "",
  //     });
  //     setShowModal(true);
  //   };
  //   // Handle input change
  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
  //   // Save profile update
  //   const handleSave = async () => {
  //     const session = JSON.parse(sessionStorage.getItem("gym_session"));
  //     if (!session) {
  //       Swal.fire(
  //         "Error",
  //         "User not found in session. Please login again",
  //         "error"
  //       );
  //       return;
  //     }
  //     try {
  //       const res = await fetch(
  //         `http://localhost:8080/api/customers/update/${session.userId}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(formData),
  //         }
  //       );
  //       if (res.ok) {
  //         const updated = await res.json();
  //         Swal.fire("Success", "Profile updated successfully!", "success");
  //         // Update context & session
  //         setUserName(updated.name);
  //         sessionStorage.setItem(
  //           "gym_session",
  //           JSON.stringify({
  //             ...session,
  //             userName: updated.name,
  //             email: updated.email,
  //             phone: updated.phone,
  //             age: updated.age,
  //             sex: updated.sex,
  //             weight: updated.weight,
  //           })
  //         );
  //         setShowModal(false);
  //       } else {
  //         Swal.fire("Error", "Failed to update profile", "error");
  //       }
  //     } catch (err) {
  //       Swal.fire("Error", "Server not reachable", "error");
  //     }
  //   };
  //   return (
  //     <>
  //       <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3 shadow">
  //         <NavLink className="navbar-brand fw-bold" to="/">
  //           <i className="bi bi-activity me-1"></i> T3 Fitness
  //         </NavLink>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-bs-toggle="collapse"
  //           data-bs-target="#nav"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse" id="nav">
  //           <ul className="navbar-nav me-auto">
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/aboutUs">
  //                 About Us
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/contactUs">
  //                 Contact Us
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/">
  //                 Packages
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" to="/trainers">
  //                 Trainers
  //               </NavLink>
  //             </li>
  //             {isLogin && role === "customer" && (
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/membership">
  //                   Membership
  //                 </NavLink>
  //               </li>
  //             )}
  //             {isLogin && role === "admin" && (
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/dashboard">
  //                   Dashboard
  //                 </NavLink>
  //               </li>
  //             )}
  //           </ul>
  //           <ul className="navbar-nav ms-auto">
  //             {!isLogin && (
  //               <>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to="/register">
  //                     Register
  //                   </NavLink>
  //                 </li>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to="/login">
  //                     Login
  //                   </NavLink>
  //                 </li>
  //               </>
  //             )}
  //             {isLogin && (
  //               <div className="d-flex align-items-center gap-3 text-white">
  //                 <span className="fw-semibold">{userName}</span>
  //                 <button
  //                   className="btn btn-outline-light btn-sm"
  //                   onClick={handleOpenModal}
  //                 >
  //                   Update Profile
  //                 </button>
  //                 <button
  //                   className="btn btn-danger btn-sm"
  //                   onClick={handleLogout}
  //                 >
  //                   Logout
  //                 </button>
  //               </div>
  //             )}
  //           </ul>
  //         </div>
  //       </nav>
  //       {/* Modal */}
  //       {showModal && (
  //         <div
  //           className="modal show d-block"
  //           tabIndex="-1"
  //           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  //         >
  //           <div className="modal-dialog">
  //             <div className="modal-content">
  //               <div className="modal-header">
  //                 <h5 className="modal-title">Update Profile</h5>
  //                 <button
  //                   type="button"
  //                   className="btn-close"
  //                   onClick={() => setShowModal(false)}
  //                 ></button>
  //               </div>
  //               <div className="modal-body">
  //                 <input
  //                   className="form-control mb-2"
  //                   name="name"
  //                   value={formData.name}
  //                   onChange={handleChange}
  //                   placeholder="Full Name"
  //                 />
  //                 <input
  //                   className="form-control mb-2"
  //                   name="email"
  //                   value={formData.email}
  //                   onChange={handleChange}
  //                   placeholder="Email"
  //                 />
  //                 <input
  //                   className="form-control mb-2"
  //                   name="phone"
  //                   value={formData.phone}
  //                   onChange={handleChange}
  //                   placeholder="Phone"
  //                 />
  //                 <input
  //                   className="form-control mb-2"
  //                   name="age"
  //                   value={formData.age}
  //                   onChange={handleChange}
  //                   placeholder="Age"
  //                 />
  //                 <input
  //                   className="form-control mb-2"
  //                   name="sex"
  //                   value={formData.sex}
  //                   onChange={handleChange}
  //                   placeholder="Sex"
  //                 />
  //                 <input
  //                   className="form-control mb-2"
  //                   name="weight"
  //                   value={formData.weight}
  //                   onChange={handleChange}
  //                   placeholder="Weight"
  //                 />
  //               </div>
  //               <div className="modal-footer">
  //                 <button
  //                   type="button"
  //                   className="btn btn-secondary"
  //                   onClick={() => setShowModal(false)}
  //                 >
  //                   Close
  //                 </button>
  //                 <button
  //                   type="button"
  //                   className="btn btn-primary"
  //                   onClick={handleSave}
  //                 >
  //                   Save changes
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // }
}
