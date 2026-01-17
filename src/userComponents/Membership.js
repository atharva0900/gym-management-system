// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { LoginContext } from "../context/LoginContext";

// const BASE = "http://localhost:8080";

// export default function Membership() {
//   const { userId, isLogin } = useContext(LoginContext);
//   const { register, handleSubmit, reset } = useForm();
//   const [packages, setPackages] = useState([]);
//   const [trainers, setTrainers] = useState([]);

//   const loadData = async () => {
//     const pRes = await fetch(`${BASE}/api/packages`);
//     const pObj = await pRes.json();
//     setPackages(pObj.data || []);

//     // Trainer endpoints per your backend
//     const tRes = await fetch(`${BASE}/api/trainer/all-trainer`);
//     const tObj = await tRes.json();
//     setTrainers(tObj.data || []);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const postMembership = async (payload) => {
//     // Primary intended endpoint (with leading slash)
//     const res = await fetch(`${BASE}/api/memberships/add-membership`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     if (res.ok) {
//       return res;
//     }
//     // Fallback to handle missing leading slash in controller
//     return fetch(`${BASE}/api/membershipsadd-membership`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//   };

//   const onSubmit = async (f) => {
//     const payload = {
//       startDate: f.startDate,
//       endDate: f.endDate,
//       status: "PENDING",
//       customer: { id: isLogin ? userId : parseInt(f.customerId) },
//       gymPackage: { id: parseInt(f.packageId) },
//       trainer: f.trainerId ? { id: parseInt(f.trainerId) } : null,
//     };
//     const res = await postMembership(payload);
//     const obj = await res.json();
//     if (res.ok) {
//       Swal.fire("Membership", obj.message || "Created", "success");
//       reset();
//     } else {
//       Swal.fire(
//         "Failed",
//         obj.message || "Could not create membership",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h3 className="mb-3">Create Membership</h3>
//       <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
//         {!isLogin && (
//           <div className="col-md-4">
//             <label className="form-label">Customer ID</label>
//             <input
//               className="form-control"
//               {...register("customerId")}
//               required
//             />
//           </div>
//         )}
//         <div className="col-md-4">
//           <label className="form-label">Package</label>
//           <select className="form-select" {...register("packageId")} required>
//             <option value="">Select package</option>
//             {packages.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.packageName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-4">
//           <label className="form-label">Trainer (optional)</label>
//           <select className="form-select" {...register("trainerId")}>
//             <option value="">No trainer</option>
//             {trainers.map((t) => (
//               <option key={t.id} value={t.id}>
//                 {t.username || t.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* <div className="col-md-4">
//           <label className="form-label">Start Date</label>
//           <input
//             type="date"
//             className="form-control"
//             {...register("startDate")}
//             required
//           />
//         </div>
//         <div className="col-md-4">
//           <label className="form-label">End Date</label>
//           <input
//             type="date"
//             className="form-control"
//             {...register("endDate")}
//             required
//           />
//         </div> */}
//         <div className="col-12">
//           <button className="btn btn-primary">
//             <i className="bi bi-plus-circle"></i> Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { LoginContext } from "../context/LoginContext";

// const BASE = "http://localhost:8080";

// export default function Membership() {
//   const { userId, isLogin } = useContext(LoginContext);
//   const { register, handleSubmit, reset } = useForm();
//   const [packages, setPackages] = useState([]);
//   const [trainers, setTrainers] = useState([]);
//   const [list, setList] = useState([]);

//   const loadData = async () => {
//     try {
//       const pRes = await fetch(`${BASE}/api/packages`);
//       const pObj = await pRes.json();
//       setPackages(pObj.data || []);

//       const tRes = await fetch(`${BASE}/api/trainer/all-trainer`);
//       const tObj = await tRes.json();
//       setTrainers(tObj.data || []);
//     } catch (err) {
//       console.error("Failed to fetch packages/trainers", err);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const postMembership = async (payload) => {
//     const res = await fetch(`${BASE}/api/memberships/add-membership`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     return res;
//   };

//   const onSubmit = async (f) => {
//     const payload = {
//       status: "PENDING",
//       customer: { id: isLogin ? userId : parseInt(f.customerId) },
//       gymPackage: { id: parseInt(f.packageId) },
//       trainer: f.trainerId ? { id: parseInt(f.trainerId) } : null,
//     };

//     try {
//       const res = await postMembership(payload);
//       const obj = await res.json();
//       if (res.ok) {
//         Swal.fire("Membership", obj.message || "Created", "success");
//         reset();
//       } else {
//         Swal.fire(
//           "Failed",
//           obj.message || "Could not create membership",
//           "error"
//         );
//       }
//     } catch (err) {
//       Swal.fire("Error", "Failed to connect to server", "error");
//     }
//   };
//   const load = async () => {
//     if (!isLogin) return;

//     const res = await fetch(`${BASE}/api/customers/${userId}`); //// imp
//     const obj = await res.json();
//     console.log("Fetched customer object:", obj); // 👈 log here
//     console.log(obj);
//   };

//   useEffect(() => {
//     if (isLogin) {
//       load();
//     }
//   }, [isLogin, userId]);

//   return (
//     <>
//       <div className="container py-4">
//         <h3 className="mb-3">Create Membership</h3>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="row g-3 shadow p-4 rounded bg-light"
//         >
//           {!isLogin && (
//             <div className="col-md-6">
//               <label className="form-label">Customer ID</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Enter customer ID"
//                 {...register("customerId")}
//                 required
//               />
//             </div>
//           )}

//           <div className="col-md-6">
//             <label className="form-label">Package</label>
//             <select className="form-select" {...register("packageId")} required>
//               <option value="">-- Select a Package --</option>
//               {packages.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.packageName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Trainer (optional)</label>
//             <select className="form-select" {...register("trainerId")}>
//               <option value="">-- No trainer --</option>
//               {trainers.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.username || t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-12 text-end">
//             <button type="submit" className="btn btn-primary px-4">
//               <i className="bi bi-plus-circle"></i> Submit
//             </button>
//           </div>
//         </form>
//       </div>

//       <tbody>
//         {list.memberships && list.memberships.length > 0 ? (
//           list.memberships.map((m) => (
//             <tr key={m.id}>
//               <td>{list.name}</td> {/* customer name */}
//               <td>{m.id}</td> {/* membership id */}
//               <td>{m.gymPackage?.packageName}</td>
//               <td>{m.trainer ? m.trainer.name : "—"}</td>
//               <td>{m.status}</td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="5" className="text-center">
//               No membership found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </>
//   );
// }

// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { LoginContext } from "../context/LoginContext";

// const BASE = "http://localhost:8080";

// export default function Membership() {
//   const { userId, isLogin } = useContext(LoginContext);
//   const { register, handleSubmit, reset } = useForm();
//   const [packages, setPackages] = useState([]);
//   const [trainers, setTrainers] = useState([]);
//   const [list, setList] = useState({}); // 👈 should be object, not array

//   // fetch packages and trainers
//   const loadData = async () => {
//     try {
//       const pRes = await fetch(`${BASE}/api/packages`);
//       const pObj = await pRes.json();
//       setPackages(pObj.data || []);

//       const tRes = await fetch(`${BASE}/api/trainer/all-trainer`);
//       const tObj = await tRes.json();
//       setTrainers(tObj.data || []);
//     } catch (err) {
//       console.error("Failed to fetch packages/trainers", err);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // post membership
//   const postMembership = async (payload) => {
//     const res = await fetch(`${BASE}/api/memberships/add-membership`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     return res;
//   };

//   const onSubmit = async (f) => {
//     const payload = {
//       status: "PENDING",
//       customer: { id: isLogin ? userId : parseInt(f.customerId) },
//       gymPackage: { id: parseInt(f.packageId) },
//       trainer: f.trainerId ? { id: parseInt(f.trainerId) } : null,
//     };

//     try {
//       const res = await postMembership(payload);
//       const obj = await res.json();
//       if (res.ok) {
//         Swal.fire("Membership", obj.message || "Created", "success");
//         reset();
//         load(); // 👈 reload memberships after creating
//       } else {
//         Swal.fire(
//           "Failed",
//           obj.message || "Could not create membership",
//           "error"
//         );
//       }
//     } catch (err) {
//       Swal.fire("Error", "Failed to connect to server", "error");
//     }
//   };

//   // fetch memberships of logged in customer
//   const load = async () => {
//     if (!isLogin) return;

//     const res = await fetch(`${BASE}/api/customers/${userId}`);
//     const obj = await res.json();
//     console.log("Fetched customer object:", obj.data);

//     setList(obj.data || {}); // 👈 save customer with memberships
//   };

//   useEffect(() => {
//     if (isLogin) {
//       load();
//     }
//   }, [isLogin, userId]);

//   return (
//     <>
//       <div className="container py-4">
//         <h3 className="mb-3">Create Membership</h3>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="row g-3 shadow p-4 rounded bg-light"
//         >
//           {!isLogin && (
//             <div className="col-md-6">
//               <label className="form-label">Customer ID</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Enter customer ID"
//                 {...register("customerId")}
//                 required
//               />
//             </div>
//           )}

//           <div className="col-md-6">
//             <label className="form-label">Package</label>
//             <select className="form-select" {...register("packageId")} required>
//               <option value="">-- Select a Package --</option>
//               {packages.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.packageName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Trainer (optional)</label>
//             <select className="form-select" {...register("trainerId")}>
//               <option value="">-- No trainer --</option>
//               {trainers.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.username || t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-12 text-end">
//             <button type="submit" className="btn btn-primary px-4">
//               <i className="bi bi-plus-circle"></i> Submit
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Membership Table */}
//       <div className="row">
//         <div className="d-flex justify-content-center align-items-center mt-4">
//           <div className="col-md-6 col-lg-5"></div>
//         </div>

//         {list.memberships && list.memberships.length > 0 ? (
//           list.memberships.map((m) => (
//             <div key={m.id} className="col-md-6 col-lg-4 mb-4">
//               <div className="card shadow-lg border-0 h-100">
//                 {/* Card Header */}
//                 <div className="card-header bg-primary text-white">
//                   <h5 className="mb-0">{list.name}</h5>
//                   <small>
//                     {list.email} | {list.phone}
//                   </small>
//                 </div>

//                 {/* Card Body */}
//                 <div className="card-body">
//                   <h6 className="card-title text-secondary">
//                     Package:{" "}
//                     <span className="fw-bold text-dark">
//                       {m.gymPackage?.packageName || "N/A"}
//                     </span>
//                   </h6>
//                   <p className="card-text mb-1">
//                     <strong>Trainer:</strong>{" "}
//                     {m.trainer ? m.trainer.name : "Not Assigned"}
//                   </p>
//                   <p className="card-text mb-1">
//                     <strong>Duration:</strong>{" "}
//                     {m.gymPackage?.durationInMonths
//                       ? `${m.gymPackage.durationInMonths} months`
//                       : "N/A"}
//                   </p>
//                   <p className="card-text mb-1">
//                     <strong>Price:</strong>{" "}
//                     {m.gymPackage?.price ? `₹${m.gymPackage.price}` : "N/A"}
//                   </p>
//                   <p className="card-text mb-1">
//                     <strong>Status:</strong>{" "}
//                     <span
//                       className={`badge ${
//                         m.status === "ACTIVE" ? "bg-success" : "bg-danger"
//                       }`}
//                     >
//                       {m.status}
//                     </span>
//                   </p>
//                   <p className="card-text mb-1">
//                     <strong>Expiry Date:</strong>{" "}
//                     {m.endDate
//                       ? new Date(m.endDate).toLocaleDateString()
//                       : "N/A"}
//                   </p>

//                   {/* Extra Customer Info */}
//                   <hr />
//                   <p className="card-text mb-1">
//                     <strong>Age:</strong> {list.age || "N/A"}
//                   </p>
//                   <p className="card-text mb-1">
//                     <strong>Sex:</strong> {list.sex || "N/A"}
//                   </p>
//                   <p className="card-text mb-1">
//                     <strong>Weight:</strong> {list.weight || "N/A"} kg
//                   </p>
//                 </div>

//                 {/* Card Footer */}
//                 <div className="card-footer bg-light d-flex justify-content-between">
//                   <small className="text-muted">Membership ID: {m.id}</small>
//                   <button className="btn btn-sm btn-outline-primary">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-12 text-center">
//             <p>No membership found</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const BASE = "http://localhost:8080";

export default function Membership() {
  const { userId, isLogin } = useContext(LoginContext);
  const { register, handleSubmit, reset } = useForm();
  const [packages, setPackages] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [list, setList] = useState({});

  const navigate = useNavigate(() => {
    navigate("/");
  });
  // fetch packages and trainers
  const loadData = async () => {
    try {
      const pRes = await fetch(`${BASE}/api/packages`);
      const pObj = await pRes.json();
      setPackages(pObj.data || []);

      const tRes = await fetch(`${BASE}/api/trainer/all-trainer`);
      const tObj = await tRes.json();
      setTrainers(tObj.data || []);
    } catch (err) {
      console.error("Failed to fetch packages/trainers", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // post membership
  const postMembership = async (payload) => {
    const res = await fetch(`${BASE}/api/memberships/add-membership`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res;
  };

  const onSubmit = async (f) => {
    const payload = {
      status: "PENDING",
      customer: { id: isLogin ? userId : parseInt(f.customerId) },
      gymPackage: { id: parseInt(f.packageId) },
      trainer: f.trainerId ? { id: parseInt(f.trainerId) } : null,
    };

    try {
      const res = await postMembership(payload);
      const obj = await res.json();
      if (res.ok) {
        Swal.fire("Membership", obj.message || "Created", "success");
        reset();
        load();
      } else {
        Swal.fire(
          "Failed",
          obj.message || "Could not create membership",
          "error"
        );
      }
    } catch (err) {
      Swal.fire("Error", "Failed to connect to server", "error");
    }
  };

  // fetch memberships of logged in customer
  const load = async () => {
    if (!isLogin) return;

    const res = await fetch(`${BASE}/api/customers/${userId}`);
    const obj = await res.json();
    setList(obj.data || {});
  };

  useEffect(() => {
    if (isLogin) {
      load();
    }
  }, [isLogin, userId]);

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Customer Dashboard</h2>
        <p className="text-muted">
          Welcome {list.name ? list.name : "Customer"} | Manage your memberships
          here
        </p>
      </div>

      {/* Create Membership Form */}
      <div className="card shadow-lg mb-5 border-0">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Membership</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            {!isLogin && (
              <div className="col-md-6">
                <label className="form-label">Customer ID</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter customer ID"
                  {...register("customerId")}
                  required
                />
              </div>
            )}

            <div className="col-md-6">
              <label className="form-label">Package</label>
              <select
                className="form-select"
                {...register("packageId")}
                required
              >
                <option value="">-- Select a Package --</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {`${p.packageName} and price  ${p.price}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Trainer (optional)</label>
              <select className="form-select" {...register("trainerId")}>
                <option value="">-- No trainer --</option>
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.username || t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 text-end">
              <button type="submit" className="btn btn-success px-4">
                <i className="bi bi-plus-circle"></i> Add Membership
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Memberships Section */}
      <h4 className="fw-bold mb-4">Your Memberships</h4>
      <div className="row">
        {list.memberships && list.memberships.length > 0 ? (
          list.memberships.map((m) => (
            <div key={m.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                {/* Card Header */}
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0">{list.name}</h5>
                  <small>
                    {list.email} | {list.phone}
                  </small>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <h6 className="card-title text-primary fw-bold">
                    {m.gymPackage?.packageName || "N/A"}
                  </h6>
                  <p className="mb-1">
                    <strong>Trainer:</strong>{" "}
                    {m.trainer ? m.trainer.name : "Not Assigned"}
                  </p>
                  <p className="mb-1">
                    <strong>Duration:</strong>{" "}
                    {m.gymPackage?.durationInMonths
                      ? `${m.gymPackage.durationInMonths} months`
                      : "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Price:</strong>{" "}
                    {m.gymPackage?.price ? `₹${m.gymPackage.price}` : "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        m.status === "APPROVED"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {m.status}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Expiry:</strong>{" "}
                    {m.endDate
                      ? new Date(m.endDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  {/* <hr />
                  <p className="mb-1">
                    <strong>Age:</strong> {list.age || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Sex:</strong> {list.sex || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Weight:</strong> {list.weight || "N/A"} kg
                  </p> */}
                </div>

                {/* Footer */}
                <div className="card-footer bg-light d-flex justify-content-between">
                  <small className="text-muted h4 ">
                    Membership ID: {m.id}
                  </small>
                  {/* <button className="btn btn-sm btn-outline-primary">
                    View Details
                  </button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="alert alert-info">No memberships found</div>
          </div>
        )}
      </div>
    </div>
  );
}
