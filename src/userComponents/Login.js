import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

// const BASE = "http://localhost:8080";
const BASE = "https://final-gym-backend.onrender.com";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setIsLogin, setUserId, setRole, setUserName } =
    useContext(LoginContext);
  const navigate = useNavigate();

  const onSubmit = async (form) => {
    if (form.role === "customer") {
      const res = await fetch(`${BASE}/api/customers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const obj = await res.json();
      if (res.ok) {
        const user = obj.data;

        setIsLogin(true);
        setUserId(user?.id ?? null);
        setRole("customer");
        setUserName(user?.name ?? "");

        sessionStorage.setItem("userId", user?.id ?? "");
        sessionStorage.setItem("userName", user?.name ?? "");
        sessionStorage.setItem("role", "customer");

        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: obj.message || "Login successful",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      } else {
        Swal.fire(
          "Failed",
          obj.message || "Invalid customer credentials",
          "error"
        );
      }
    }

    if (form.role === "admin") {
      const res = await fetch(`${BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const obj = await res.json();
      if (res.ok) {
        const admin = obj.data;

        setIsLogin(true);
        setUserId(admin?.id ?? null);
        setRole("admin");
        setUserName(admin?.name ?? "");

        sessionStorage.setItem("userId", admin?.id ?? "");
        sessionStorage.setItem("userName", admin?.name ?? "");
        sessionStorage.setItem("role", "admin");

        Swal.fire({
          icon: "success",
          title: "Admin",
          text: obj.message || "Login successful",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard");
      } else {
        Swal.fire(
          "Failed",
          obj.message || "Invalid admin credentials",
          "error"
        );
      }
    }
  };

  return (
    <div className="container-fluid">
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow-lg p-4"
          style={{ width: "400px", borderRadius: "15px" }}
        >
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            {/* Role */}
            <div className="col-12">
              <label className="form-label">Login as</label>
              <select
                className="form-select"
                {...register("role", { required: "Role is required" })}
              >
                <option value="">-- Select Role --</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-danger small">{errors.role.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="col-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger small">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="col-12">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger small">{errors.password.message}</p>
              )}
            </div>

            <div className="col-12 d-grid">
              <button className="btn btn-primary">
                <i className="bi bi-box-arrow-in-right"></i> Login
              </button>
            </div>

            <div className="col-12 text-center mt-3">
              <p className="mb-0">
                Don't have an account? <a href="/register">Register here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

{
  // import React, { useContext } from "react";
  // import { useForm } from "react-hook-form";
  // import Swal from "sweetalert2";
  // import { LoginContext } from "../context/LoginContext";
  // import { useNavigate } from "react-router-dom";
  // const BASE = "http://localhost:8080";
  // export default function Login() {
  //   const { register, handleSubmit } = useForm();
  //   const { setIsLogin, setUserId, setRole } = useContext(LoginContext);
  //   const navigate = useNavigate();
  //   const onSubmit = async (form) => {
  //     try {
  //       if (form.role === "customer") {
  //         const res = await fetch(`${BASE}/api/customers/login`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ email: form.email, password: form.password }),
  //         });
  //         const obj = await res.json();
  //         if (res.ok) {
  //           const user = obj.data;
  //           setIsLogin(true);
  //           setUserId(user?.id ?? null);
  //           setRole("customer");
  //           Swal.fire("Welcome", obj.message || "Login successful", "success");
  //           navigate("/");
  //         } else {
  //           Swal.fire(
  //             "Failed",
  //             obj.message || "Invalid customer credentials",
  //             "error"
  //           );
  //         }
  //       } else if (form.role === "admin") {
  //         const res = await fetch(`${BASE}/api/admin/login`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ email: form.email, password: form.password }),
  //         });
  //         const obj = await res.json();
  //         if (res.ok) {
  //           const admin = obj.data;
  //           setIsLogin(true);
  //           setUserId(admin?.id ?? null);
  //           setRole("admin");
  //           Swal.fire("Admin", obj.message || "Login successful", "success");
  //           navigate("/dashboard");
  //         } else {
  //           Swal.fire(
  //             "Failed",
  //             obj.message || "Invalid admin credentials",
  //             "error"
  //           );
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Login error:", err);
  //       Swal.fire(
  //         "Error",
  //         "Something went wrong. Please try again later.",
  //         "error"
  //       );
  //     }
  //   };
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  //       <div
  //         className="card shadow-lg p-4"
  //         style={{ width: "400px", borderRadius: "15px" }}
  //       >
  //         <h3 className="text-center mb-4">Login</h3>
  //         <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
  //           {/* Role Selection */}
  //           <div className="col-12">
  //             <label className="form-label">Login as</label>
  //             <select className="form-select" {...register("role")} required>
  //               <option value="" className="form-label">
  //                 -- Select Role --
  //               </option>
  //               <option value="customer">Customer</option>
  //               <option value="admin">Admin</option>
  //             </select>
  //           </div>
  //           {/* Email */}
  //           <div className="col-12">
  //             <label className="form-label">Email</label>
  //             <input
  //               type="email"
  //               className="form-control"
  //               placeholder="Enter email"
  //               {...register("email")}
  //               required
  //             />
  //           </div>
  //           {/* Password */}
  //           <div className="col-12">
  //             <label className="form-label">Password</label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               placeholder="Enter password"
  //               {...register("password")}
  //               required
  //             />
  //           </div>
  //           {/* Submit */}
  //           <div className="col-12 d-grid">
  //             <button className="btn btn-primary">
  //               <i className="bi bi-box-arrow-in-right"></i> Login
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
  // -------------------------------------------------------------------------------------------------------------
  // import React, { useContext } from "react";
  // import { useForm } from "react-hook-form";
  // import Swal from "sweetalert2";
  // import { LoginContext } from "../context/LoginContext";
  // import { useNavigate } from "react-router-dom";
  // const BASE = "http://localhost:8080";
  // export default function Login() {
  //   const { register, handleSubmit } = useForm();
  //   const { setIsLogin, setUserId, setRole, setUserName } =
  //     useContext(LoginContext);
  //   const navigate = useNavigate();
  //   const onSubmit = async (form) => {
  //     if (form.role === "customer") {
  //       const res = await fetch(`${BASE}/api/customers/login`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: form.email, password: form.password }),
  //       });
  //       const obj = await res.json();
  //       if (res.ok) {
  //         const user = obj.data;
  //         setIsLogin(true);
  //         setUserId(user?.id ?? null);
  //         setRole("customer");
  //         setUserName(user?.name ?? ""); // 👈 save name
  //         Swal.fire("Welcome", obj.message || "Login successful", "success");
  //         navigate("/");
  //       } else {
  //         Swal.fire(
  //           "Failed",
  //           obj.message || "Invalid customer credentials",
  //           "error"
  //         );
  //       }
  //     }
  //     if (form.role === "admin") {
  //       const res = await fetch(`${BASE}/api/admin/login`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: form.email, password: form.password }),
  //       });
  //       const obj = await res.json();
  //       if (res.ok) {
  //         const admin = obj.data;
  //         setIsLogin(true);
  //         setUserId(admin?.id ?? null);
  //         setRole("admin");
  //         setUserName(admin?.name ?? ""); // 👈 save name
  //         Swal.fire("Admin", obj.message || "Login successful", "success");
  //         navigate("/dashboard");
  //       } else {
  //         Swal.fire(
  //           "Failed",
  //           obj.message || "Invalid admin credentials",
  //           "error"
  //         );
  //       }
  //     }
  //   };
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  //       <div
  //         className="card shadow-lg p-4"
  //         style={{ width: "400px", borderRadius: "15px" }}
  //       >
  //         <h3 className="text-center mb-4">Login</h3>
  //         <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
  //           {/* Role Selection */}
  //           <div className="col-12">
  //             <label className="form-label">Login as</label>
  //             <select className="form-select" {...register("role")} required>
  //               <option value="">-- Select Role --</option>
  //               <option value="customer">Customer</option>
  //               <option value="admin">Admin</option>
  //             </select>
  //           </div>
  //           {/* Email */}
  //           <div className="col-12">
  //             <label className="form-label">Email</label>
  //             <input
  //               type="email"
  //               className="form-control"
  //               placeholder="Enter email"
  //               {...register("email")}
  //               required
  //             />
  //           </div>
  //           {/* Password */}
  //           <div className="col-12">
  //             <label className="form-label">Password</label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               placeholder="Enter password"
  //               {...register("password")}
  //               required
  //             />
  //           </div>
  //           {/* Submit */}
  //           <div className="col-12 d-grid">
  //             <button className="btn btn-primary">
  //               <i className="bi bi-box-arrow-in-right"></i> Login
  //             </button>
  //           </div>
  //           <div className="col-12 text-center mt-3">
  //             <p className="mb-0">
  //               Don't have an account? <a href="/register">Register here</a>
  //             </p>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
  // import React, { useContext } from "react";
  // import { useForm } from "react-hook-form";
  // import Swal from "sweetalert2";
  // import { LoginContext } from "../context/LoginContext";
  // import { useNavigate } from "react-router-dom";
  // const BASE = "http://localhost:8080";
  // export default function Login() {
  //   const { register, handleSubmit } = useForm();
  //   const { setIsLogin, setUserId, setRole, setUserName } =
  //     useContext(LoginContext);
  //   const navigate = useNavigate();
  //   const onSubmit = async (form) => {
  //     if (form.role === "customer") {
  //       const res = await fetch(`${BASE}/api/customers/login`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: form.email, password: form.password }),
  //       });
  //       const obj = await res.json();
  //       if (res.ok) {
  //         const user = obj.data;
  //         // 👉 Save to context
  //         setIsLogin(true);
  //         setUserId(user?.id ?? null);
  //         setRole("customer");
  //         setUserName(user?.name ?? "");
  //         // 👉 Save to sessionStorage
  //         sessionStorage.setItem("userId", user?.id ?? "");
  //         sessionStorage.setItem("userName", user?.name ?? "");
  //         sessionStorage.setItem("role", "customer");
  //         Swal.fire("Welcome", obj.message || "Login successful", "success");
  //         navigate("/");
  //       } else {
  //         Swal.fire(
  //           "Failed",
  //           obj.message || "Invalid customer credentials",
  //           "error"
  //         );
  //       }
  //     }
  //     if (form.role === "admin") {
  //       const res = await fetch(`${BASE}/api/admin/login`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: form.email, password: form.password }),
  //       });
  //       const obj = await res.json();
  //       if (res.ok) {
  //         const admin = obj.data;
  //         // 👉 Save to context
  //         setIsLogin(true);
  //         setUserId(admin?.id ?? null);
  //         setRole("admin");
  //         setUserName(admin?.name ?? "");
  //         // 👉 Save to sessionStorage
  //         sessionStorage.setItem("userId", admin?.id ?? "");
  //         sessionStorage.setItem("userName", admin?.name ?? "");
  //         sessionStorage.setItem("role", "admin");
  //         Swal.fire("Admin", obj.message || "Login successful", "success");
  //         navigate("/dashboard");
  //       } else {
  //         Swal.fire(
  //           "Failed",
  //           obj.message || "Invalid admin credentials",
  //           "error"
  //         );
  //       }
  //     }
  //   };
  //   return (
  //     <div className="container-fluid">
  //       <button
  //         className="btn btn-outline-dark"
  //         onClick={() => {
  //           navigate("/");
  //         }}
  //       >
  //         Home
  //       </button>
  //       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  //         <div
  //           className="card shadow-lg p-4"
  //           style={{ width: "400px", borderRadius: "15px" }}
  //         >
  //           <h3 className="text-center mb-4">Login</h3>
  //           <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
  //             <div className="col-12">
  //               <label className="form-label">Login as</label>
  //               <select className="form-select" {...register("role")} required>
  //                 <option value="">-- Select Role --</option>
  //                 <option value="customer">Customer</option>
  //                 <option value="admin">Admin</option>
  //               </select>
  //             </div>
  //             <div className="col-12">
  //               <label className="form-label">Email</label>
  //               <input
  //                 type="email"
  //                 className="form-control"
  //                 placeholder="Enter email"
  //                 {...register("email")}
  //                 required
  //               />
  //             </div>
  //             <div className="col-12">
  //               <label className="form-label">Password</label>
  //               <input
  //                 type="password"
  //                 className="form-control"
  //                 placeholder="Enter password"
  //                 {...register("password")}
  //                 required
  //               />
  //             </div>
  //             <div className="col-12 d-grid">
  //               <button className="btn btn-primary">
  //                 <i className="bi bi-box-arrow-in-right"></i> Login
  //               </button>
  //             </div>
  //             <div className="col-12 text-center mt-3">
  //               <p className="mb-0">
  //                 Don't have an account? <a href="/register">Register here</a>
  //               </p>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // import React, { useContext, useState } from "react";
  // import { useForm } from "react-hook-form";
  // import Swal from "sweetalert2";
  // import { LoginContext } from "../context/LoginContext";
  // import { useNavigate } from "react-router-dom";
  // const BASE = "http://localhost:8080";
  // export default function Login() {
  //   const { register, handleSubmit } = useForm();
  //   const { setIsLogin, setUserId, setRole, setUserName } =
  //     useContext(LoginContext);
  //   const navigate = useNavigate();
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  //   const onSubmit = async (form) => {
  //     setIsSubmitting(true);
  //     if (form.role === "customer") {
  //       const res = await fetch(`${BASE}/api/customers/login`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: form.email, password: form.password }),
  //       });
  //       const obj = await res.json();
  //       if (res.ok) {
  //         const user = obj.data;
  //         setIsLogin(true);
  //         setUserId(user?.id ?? null);
  //         setRole("customer");
  //         setUserName(user?.name ?? "");
  //         sessionStorage.setItem("userId", user?.id ?? "");
  //         sessionStorage.setItem("userName", user?.name ?? "");
  //         sessionStorage.setItem("role", "customer");
  //         Swal.fire({
  //           toast: true,
  //           position: "top-end",
  //           icon: "success",
  //           title: obj.message || "Login successful",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //         navigate("/");
  //       } else {
  //         Swal.fire({
  //           toast: true,
  //           position: "top-end",
  //           icon: "error",
  //           title: obj.message || "Invalid customer credentials",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       }
  //     }
  //     if (form.role === "admin") {
  //       const res = await fetch(`${BASE}/api/admin/login`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: form.email, password: form.password }),
  //       });
  //       const obj = await res.json();
  //       if (res.ok) {
  //         const admin = obj.data;
  //         setIsLogin(true);
  //         setUserId(admin?.id ?? null);
  //         setRole("admin");
  //         setUserName(admin?.name ?? "");
  //         sessionStorage.setItem("userId", admin?.id ?? "");
  //         sessionStorage.setItem("userName", admin?.name ?? "");
  //         sessionStorage.setItem("role", "admin");
  //         Swal.fire({
  //           toast: true,
  //           position: "top-end",
  //           icon: "success",
  //           title: obj.message || "Admin login successful",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //         navigate("/dashboard");
  //       } else {
  //         Swal.fire({
  //           toast: true,
  //           position: "top-end",
  //           icon: "error",
  //           title: obj.message || "Invalid admin credentials",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       }
  //     }
  //     setIsSubmitting(false);
  //   };
  //   return (
  //     <div className="container-fluid">
  //       <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
  //         Home
  //       </button>
  //       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  //         <div
  //           className="card p-4"
  //           style={{ width: "350px", borderRadius: "10px" }}
  //         >
  //           <h3 className="text-center mb-3">Login</h3>
  //           <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
  //             <div className="col-12">
  //               <label className="form-label">Login as</label>
  //               <select className="form-select" {...register("role")} required>
  //                 <option value="">-- Select Role --</option>
  //                 <option value="customer">Customer</option>
  //                 <option value="admin">Admin</option>
  //               </select>
  //             </div>
  //             <div className="col-12">
  //               <label className="form-label">Email</label>
  //               <input
  //                 type="email"
  //                 className="form-control"
  //                 placeholder="Enter email"
  //                 {...register("email")}
  //                 required
  //               />
  //             </div>
  //             <div className="col-12">
  //               <label className="form-label">Password</label>
  //               <input
  //                 type="password"
  //                 className="form-control"
  //                 placeholder="Enter password"
  //                 {...register("password")}
  //                 required
  //               />
  //             </div>
  //             <div className="col-12 d-grid">
  //               <button
  //                 type="submit"
  //                 className="btn btn-primary"
  //                 disabled={isSubmitting}
  //               >
  //                 {isSubmitting ? "Logging in..." : "Login"}
  //               </button>
  //             </div>
  //             <div className="col-12 text-center mt-2">
  //               <p className="mb-0">
  //                 Don't have an account? <a href="/register">Register here</a>
  //               </p>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
