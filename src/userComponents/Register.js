import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const navigate = useNavigate();
  const [adminExists, setAdminExists] = useState(null);
  const [role, setRole] = useState("customer");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // check if admin already exists
  useEffect(() => {
    const checkAdmin = async () => {
      // const res = await fetch("http://localhost:8080/api/admin/exists");
      const res = await fetch(
        "https://final-gym-backend.onrender.com/api/admin/exists"
      );
      if (!res.ok) {
        setAdminExists(false);
        return;
      }
      const data = await res.json();
      if (typeof data === "boolean") {
        setAdminExists(data);
        if (data) setRole("customer");
      } else if (typeof data?.data !== "undefined") {
        setAdminExists(data.data);
        if (data.data) setRole("customer");
      } else {
        setAdminExists(false);
      }
    };
    checkAdmin();
  }, []);

  // handle register submit
  const onSubmit = async (formData) => {
    const url =
      role === "admin"
        ? "https://final-gym-backend.onrender.com/api/admin/register"
        : "https://final-gym-backend.onrender.com/api/customers/register";

    const payload =
      role === "admin"
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            age: formData.age ? Number(formData.age) : null,
            sex: formData.sex,
          };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      Swal.fire(
        "Success",
        data?.message || "Registered successfully",
        "success"
      );
      reset();
      if (role === "admin") setAdminExists(true);

      // redirect to loginPage 1.5s so alert is showss
      setTimeout(() => navigate("/login"), 1500);
    } else {
      const errText = await res.text();
      Swal.fire("Error", errText || "Registration failed", "error");
    }
  };

  if (adminExists === null) {
    return <p className="text-center mt-5">Checking server...</p>;
  }

  return (
    <div className="container mt-4 w-50">
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-3">Register</h2>

        {!adminExists && (
          <div className="mb-3">
            <label className="form-label">Register as:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Customer extra fields */}
          {(adminExists || role === "customer") && (
            <>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit number",
                    },
                  })}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className={`form-control ${errors.age ? "is-invalid" : ""}`}
                  {...register("age", {
                    required: "Age is required",
                    min: {
                      value: 10,
                      message: "Must be at least 10 years old",
                    },
                    max: { value: 100, message: "Too old for gym 😅" },
                  })}
                />
                {errors.age && (
                  <div className="invalid-feedback">{errors.age.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className={`form-select ${errors.sex ? "is-invalid" : ""}`}
                  {...register("sex", { required: "Please select gender" })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.sex && (
                  <div className="invalid-feedback">{errors.sex.message}</div>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

{
  // import React, { useEffect, useState } from "react";
  // import "bootstrap/dist/css/bootstrap.min.css";
  // export default function Register() {
  //   const [adminExists, setAdminExists] = useState(null); // null = loading
  //   const [role, setRole] = useState("customer"); // default
  //   const [form, setForm] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     phone: "",
  //     address: "",
  //     age: "",
  //   });
  //   const [message, setMessage] = useState(null);
  //   const [submitting, setSubmitting] = useState(false);
  //   // useEffect with async/await (no then/catch)
  //   useEffect(() => {
  //     const checkAdmin = async () => {
  //       const res = await fetch("http://localhost:8080/api/admin/exists");
  //       if (!res.ok) {
  //         setAdminExists(false); // fallback
  //         return;
  //       }
  //       const data = await res.json();
  //       if (typeof data === "boolean") {
  //         setAdminExists(data);
  //         if (data) setRole("customer");
  //       } else if (typeof data?.data !== "undefined") {
  //         setAdminExists(data.data);
  //         if (data.data) setRole("customer");
  //       } else {
  //         setAdminExists(false);
  //       }
  //     };
  //     checkAdmin();
  //   }, []);
  //   const handleChange = (e) => {
  //     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setMessage(null);
  //     setSubmitting(true);
  //     const url =
  //       role === "admin"
  //         ? "http://localhost:8080/api/admin/register"
  //         : "http://localhost:8080/api/customers/register";
  //     const payload =
  //       role === "admin"
  //         ? { name: form.name, email: form.email, password: form.password }
  //         : {
  //             name: form.name,
  //             email: form.email,
  //             password: form.password,
  //             phone: form.phone,
  //             address: form.address,
  //             age: form.age ? Number(form.age) : null,
  //           };
  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       setMessage(data?.message || "Registered successfully");
  //       setForm({
  //         name: "",
  //         email: "",
  //         password: "",
  //         phone: "",
  //         address: "",
  //         age: "",
  //       });
  //       if (role === "admin") setAdminExists(true);
  //     } else {
  //       const errText = await res.text();
  //       setMessage(errText || "Registration failed");
  //     }
  //     setSubmitting(false);
  //   };
  //   if (adminExists === null) {
  //     return (
  //       <div className="d-flex justify-content-center align-items-center vh-100">
  //         <div className="spinner-border" role="status" aria-hidden="true"></div>
  //         <span className="ms-2">Checking server...</span>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="container py-5">
  //       <div className="row justify-content-center">
  //         <div className="col-sm-10 col-md-8 col-lg-6">
  //           <div className="card shadow-sm">
  //             <div className="card-body p-4">
  //               <h4 className="card-title mb-3 text-center">Register</h4>
  //               {adminExists ? (
  //                 <div className="alert "></div>
  //               ) : (
  //                 <div className="mb-3">
  //                   <label className="form-label">Role</label>
  //                   <select
  //                     className="form-select"
  //                     value={role}
  //                     onChange={(e) => setRole(e.target.value)}
  //                   >
  //                     <option value="admin">Admin</option>
  //                     <option value="customer">Customer</option>
  //                   </select>
  //                 </div>
  //               )}
  //               <form onSubmit={handleSubmit}>
  //                 {/* Name */}
  //                 <div className="mb-3">
  //                   <label className="form-label">Name</label>
  //                   <input
  //                     name="name"
  //                     value={form.name}
  //                     onChange={handleChange}
  //                     className="form-control"
  //                     placeholder="Full name"
  //                     required
  //                   />
  //                 </div>
  //                 {/* Email */}
  //                 <div className="mb-3">
  //                   <label className="form-label">Email</label>
  //                   <input
  //                     name="email"
  //                     type="email"
  //                     value={form.email}
  //                     onChange={handleChange}
  //                     className="form-control"
  //                     placeholder="email@example.com"
  //                     required
  //                   />
  //                 </div>
  //                 {/* Password */}
  //                 <div className="mb-3">
  //                   <label className="form-label">Password</label>
  //                   <input
  //                     name="password"
  //                     type="password"
  //                     value={form.password}
  //                     onChange={handleChange}
  //                     className="form-control"
  //                     placeholder="Choose a password"
  //                     required
  //                   />
  //                 </div>
  //                 {/* Customer fields */}
  //                 {(adminExists || role === "customer") && (
  //                   <>
  //                     <div className="mb-3">
  //                       <label className="form-label">Phone</label>
  //                       <input
  //                         name="phone"
  //                         value={form.phone}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="Phone number"
  //                       />
  //                     </div>
  //                     <div className="mb-3">
  //                       <label className="form-label">Address</label>
  //                       <input
  //                         name="address"
  //                         value={form.address}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="Address"
  //                       />
  //                     </div>
  //                     <div className="mb-3">
  //                       <label className="form-label">Age</label>
  //                       <input
  //                         name="age"
  //                         type="number"
  //                         min="0"
  //                         value={form.age}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="Age"
  //                       />
  //                     </div>
  //                     <div className="mb-3">
  //                       <label className="form-label">Age</label>
  //                       <input
  //                         name="weight"
  //                         type="number"
  //                         min="0"
  //                         value={form.weight}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="weight"
  //                       />
  //                     </div>
  //                   </>
  //                 )}
  //                 <button
  //                   type="submit"
  //                   className="btn btn-primary w-100"
  //                   disabled={submitting}
  //                 >
  //                   {submitting ? (
  //                     <>
  //                       <span
  //                         className="spinner-border spinner-border-sm me-2"
  //                         role="status"
  //                         aria-hidden="true"
  //                       ></span>
  //                       Registering...
  //                     </>
  //                   ) : (
  //                     `Register ${
  //                       adminExists || role === "customer" ? "Customer" : "Admin"
  //                     }`
  //                   )}
  //                 </button>
  //                 <div className="text-center mt-3">
  //                   <p className="mb-0">
  //                     Already have an account? <a href="/login">Login here</a>
  //                   </p>
  //                 </div>
  //               </form>
  //               {message && (
  //                 <div className="mt-3">
  //                   <div className="alert alert-secondary mb-0">{message}</div>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
{
  // import React, { useEffect, useState } from "react";
  // import "bootstrap/dist/css/bootstrap.min.css";
  // import {
  //   FaUser,
  //   FaEnvelope,
  //   FaLock,
  //   FaPhone,
  //   FaHome,
  //   FaBirthdayCake,
  //   FaDumbbell,
  //   FaWeight,
  // } from "react-icons/fa";
  // import { useNavigate } from "react-router-dom";
  // export default function Register() {
  //   const navigate = useNavigate(() => {
  //     navigate("/");
  //   });
  //   const [adminExists, setAdminExists] = useState(null);
  //   const [role, setRole] = useState("customer");
  //   const [form, setForm] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     phone: "",
  //     address: "",
  //     age: "",
  //     weight: "",
  //   });
  //   const [message, setMessage] = useState(null);
  //   const [submitting, setSubmitting] = useState(false);
  //   useEffect(() => {
  //     const checkAdmin = async () => {
  //       const res = await fetch("http://localhost:8080/api/admin/exists");
  //       if (!res.ok) {
  //         setAdminExists(false);
  //         return;
  //       }
  //       const data = await res.json();
  //       if (typeof data === "boolean") {
  //         setAdminExists(data);
  //         if (data) setRole("customer");
  //       } else if (typeof data?.data !== "undefined") {
  //         setAdminExists(data.data);
  //         if (data.data) setRole("customer");
  //       } else {
  //         setAdminExists(false);
  //       }
  //     };
  //     checkAdmin();
  //   }, []);
  //   const handleChange = (e) => {
  //     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setMessage(null);
  //     setSubmitting(true);
  //     const url =
  //       role === "admin"
  //         ? "http://localhost:8080/api/admin/register"
  //         : "http://localhost:8080/api/customers/register";
  //     const payload =
  //       role === "admin"
  //         ? { name: form.name, email: form.email, password: form.password }
  //         : {
  //             name: form.name,
  //             email: form.email,
  //             password: form.password,
  //             phone: form.phone,
  //             address: form.address,
  //             age: form.age ? Number(form.age) : null,
  //             weight: form.weight ? Number(form.weight) : null,
  //           };
  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       setMessage(data?.message || "Registered successfully");
  //       setForm({
  //         name: "",
  //         email: "",
  //         password: "",
  //         phone: "",
  //         address: "",
  //         age: "",
  //         weight: "",
  //       });
  //       if (role === "admin") setAdminExists(true);
  //     } else {
  //       const errText = await res.text();
  //       setMessage(errText || "Registration failed");
  //     }
  //     setSubmitting(false);
  //   };
  //   if (adminExists === null) {
  //     return (
  //       <div className="d-flex justify-content-center align-items-center vh-100">
  //         <div
  //           className="spinner-border text-primary"
  //           role="status"
  //           aria-hidden="true"
  //         ></div>
  //         <span className="ms-2 fw-bold text-primary">Checking server...</span>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="container py-5">
  //       <button
  //         className="btn btn-outline-dark"
  //         onClick={() => {
  //           navigate("/");
  //         }}
  //       >
  //         Home
  //       </button>
  //       <div className="row justify-content-center">
  //         <div className="col-sm-10 col-md-8 col-lg-6">
  //           <div className="card shadow-lg border-0 rounded-4">
  //             <div className="card-body p-5">
  //               <h3 className="card-title mb-4 text-center fw-bold text-primary">
  //                 <FaDumbbell className="me-2" />
  //                 Gym Registration
  //               </h3>
  //               {/* Role Selection */}
  //               {!adminExists && (
  //                 <div className="mb-4">
  //                   <label className="form-label fw-semibold">Register as</label>
  //                   <select
  //                     className="form-select"
  //                     value={role}
  //                     onChange={(e) => setRole(e.target.value)}
  //                   >
  //                     <option value="admin">🏋️ Admin</option>
  //                     <option value="customer">💪 Customer</option>
  //                   </select>
  //                 </div>
  //               )}
  //               <form onSubmit={handleSubmit} className="row g-3">
  //                 {/* Name */}
  //                 <div className="col-12">
  //                   <label className="form-label fw-semibold">
  //                     <FaUser className="me-2" /> Full Name
  //                   </label>
  //                   <input
  //                     name="name"
  //                     value={form.name}
  //                     onChange={handleChange}
  //                     className="form-control"
  //                     placeholder="John Doe"
  //                     required
  //                   />
  //                 </div>
  //                 {/* Email */}
  //                 <div className="col-12">
  //                   <label className="form-label fw-semibold">
  //                     <FaEnvelope className="me-2" /> Email
  //                   </label>
  //                   <input
  //                     name="email"
  //                     type="email"
  //                     value={form.email}
  //                     onChange={handleChange}
  //                     className="form-control"
  //                     placeholder="example@gym.com"
  //                     required
  //                   />
  //                 </div>
  //                 {/* Password */}
  //                 <div className="col-12">
  //                   <label className="form-label fw-semibold">
  //                     <FaLock className="me-2" /> Password
  //                   </label>
  //                   <input
  //                     name="password"
  //                     type="password"
  //                     value={form.password}
  //                     onChange={handleChange}
  //                     className="form-control"
  //                     placeholder="Choose a strong password"
  //                     required
  //                   />
  //                 </div>
  //                 {/* Customer Fields */}
  //                 {(adminExists || role === "customer") && (
  //                   <>
  //                     <div className="col-md-6">
  //                       <label className="form-label fw-semibold">
  //                         <FaPhone className="me-2" /> Phone
  //                       </label>
  //                       <input
  //                         name="phone"
  //                         value={form.phone}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="123-456-7890"
  //                       />
  //                     </div>
  //                     <div className="col-md-6">
  //                       <label className="form-label fw-semibold">
  //                         <FaHome className="me-2" /> Address
  //                       </label>
  //                       <input
  //                         name="address"
  //                         value={form.address}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="Street, City"
  //                       />
  //                     </div>
  //                     <div className="col-md-6">
  //                       <label className="form-label fw-semibold">
  //                         <FaBirthdayCake className="me-2" /> Age
  //                       </label>
  //                       <input
  //                         name="age"
  //                         type="number"
  //                         min="0"
  //                         value={form.age}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="Age"
  //                       />
  //                     </div>
  //                     <div className="col-md-6">
  //                       <label className="form-label fw-semibold">
  //                         <FaWeight className="me-2" /> Weight (kg)
  //                       </label>
  //                       <input
  //                         name="weight"
  //                         type="number"
  //                         min="0"
  //                         value={form.weight}
  //                         onChange={handleChange}
  //                         className="form-control"
  //                         placeholder="Weight"
  //                       />
  //                     </div>
  //                   </>
  //                 )}
  //                 {/* Submit Button */}
  //                 <div className="col-12">
  //                   <button
  //                     type="submit"
  //                     className="btn btn-primary w-100 py-2 fw-semibold"
  //                     disabled={submitting}
  //                   >
  //                     {submitting ? (
  //                       <>
  //                         <span
  //                           className="spinner-border spinner-border-sm me-2"
  //                           role="status"
  //                           aria-hidden="true"
  //                         ></span>
  //                         Registering...
  //                       </>
  //                     ) : (
  //                       `Register ${
  //                         adminExists || role === "customer"
  //                           ? "Customer"
  //                           : "Admin"
  //                       }`
  //                     )}
  //                   </button>
  //                 </div>
  //                 {/* Login Redirect */}
  //                 <div className="text-center mt-3">
  //                   <p className="mb-0">
  //                     Already have an account?{" "}
  //                     <a href="/login" className="fw-bold text-decoration-none">
  //                       Login here
  //                     </a>
  //                   </p>
  //                 </div>
  //               </form>
  //               {/* Message */}
  //               {message && (
  //                 <div className="mt-4">
  //                   <div className="alert alert-info text-center fw-semibold">
  //                     {message}
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
