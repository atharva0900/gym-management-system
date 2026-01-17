// import React from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";

// export default function AddPackage() {
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (f) => {
//     const payload = {
//       packageName: f.packageName,
//       description: f.description,
//       price: parseFloat(f.price),
//       durationInMonths: parseInt(f.durationInMonths),
//     };
//     const res = await fetch(`${BASE}/api/packages/add`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     const obj = await res.json();
//     if (res.ok) {
//       Swal.fire("Package", obj.message || "Added", "success");
//       reset();
//     } else {
//       Swal.fire("Failed", obj.message || "Could not add package", "error");
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">Add Package hello</h5>
//       <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label">Package Name</label>
//           <input
//             className="form-control"
//             {...register("packageName")}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Price</label>
//           <input
//             type="number"
//             step="0.01"
//             className="form-control"
//             {...register("price")}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Duration (months)</label>
//           <input
//             type="number"
//             className="form-control"
//             {...register("durationInMonths")}
//             required
//           />
//         </div>
//         <div className="col-md-12">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             rows="3"
//             {...register("description")}
//           ></textarea>
//         </div>
//         <div className="col-12">
//           <button className="btn btn-primary">
//             <i className="bi bi-plus-square"></i> Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BASE = "http://localhost:8080";

export default function AddPackage() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (f) => {
    const payload = {
      packageName: f.packageName,
      description: f.description,
      price: parseFloat(f.price),
      durationInMonths: parseInt(f.durationInMonths),
    };
    const res = await fetch(`${BASE}/api/packages/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const obj = await res.json();
    if (res.ok) {
      Swal.fire(
        "Package Added",
        obj.message || "Successfully added!",
        "success"
      );
      reset();
    } else {
      Swal.fire("Failed", obj.message || "Could not add package", "error");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4 text-center fw-bold">Add New Package</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Package Name</label>
          <input
            type="text"
            placeholder="Enter package name"
            className="form-control"
            {...register("packageName")}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Price (₹)</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 1999"
            className="form-control"
            {...register("price")}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Duration (Months)</label>
          <input
            type="number"
            min="1"
            placeholder="e.g. 3"
            className="form-control"
            {...register("durationInMonths")}
            required
          />
        </div>

        <div className="col-md-12">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            placeholder="Brief description of the package features"
            className="form-control"
            rows="4"
            {...register("description")}
          ></textarea>
        </div>

        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-danger px-5">
            <i className="bi bi-plus-square me-2"></i> Add Package
          </button>
        </div>
      </form>
    </div>
  );
}
