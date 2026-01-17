// import React from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";

// export default function AddTrainer() {
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (f) => {
//     const payload = {
//       name: f.name,
//       email: f.email,
//       password: f.password,
//       phone: f.phone,
//       specialization: f.specialization,
//       experience: f.experience,
//       profilePicture: f.profilePicture,
//     };
//     const res = await fetch(`${BASE}/api/trainer/add-trainer`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     const obj = await res.json();
//     if (res.ok) {
//       Swal.fire("Trainer", obj.message || "Added", "success");
//       reset();
//     } else {
//       Swal.fire("Failed", obj.message || "Could not add trainer", "error");
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">Add Trainer</h5>
//       <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label">Username</label>
//           <input className="form-control" {...register("name")} required />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             {...register("email")}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             {...register("password")}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Phone</label>
//           <input className="form-control" {...register("phone")} />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Specialization</label>
//           <input className="form-control" {...register("specialization")} />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Experience</label>
//           <input className="form-control" {...register("experience")} />
//         </div>
//         <div className="col-md-12">
//           <label className="form-label">Profile Picture URL</label>
//           <input className="form-control" {...register("profilePicture")} />
//         </div>
//         <div className="col-12">
//           <button className="btn btn-primary">
//             <i className="bi bi-plus"></i> Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// import React from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";

// export default function AddTrainer() {
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (f) => {
//     const payload = {
//       name: f.name,
//       email: f.email,
//       password: f.password,
//       phone: f.phone,
//       specialization: f.specialization,
//       experience: f.experience,
//       profilePicture: f.profilePicture,
//     };
//     const res = await fetch(`${BASE}/api/trainer/add-trainer`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     const obj = await res.json();
//     if (res.ok) {
//       Swal.fire(
//         "Trainer Added",
//         obj.message || "Successfully added!",
//         "success"
//       );
//       reset();
//     } else {
//       Swal.fire("Failed", obj.message || "Could not add trainer", "error");
//     }
//   };

//   return (
//     <div className="card shadow-sm p-4">
//       <h4 className="mb-4 text-center fw-bold">Add New Trainer</h4>
//       <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Full Name</label>
//           <input
//             type="text"
//             placeholder="Enter full name"
//             className="form-control"
//             {...register("name")}
//             required
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Email</label>
//           <input
//             type="email"
//             placeholder="trainer@example.com"
//             className="form-control"
//             {...register("email")}
//             required
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Password</label>
//           <input
//             type="password"
//             placeholder="Enter password"
//             className="form-control"
//             {...register("password")}
//             required
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Phone</label>
//           <input
//             type="tel"
//             placeholder="e.g. +91 9876543210"
//             className="form-control"
//             {...register("phone")}
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Specialization</label>
//           <input
//             type="text"
//             placeholder="e.g. Yoga, Strength Training"
//             className="form-control"
//             {...register("specialization")}
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Experience (Years)</label>
//           <input
//             type="number"
//             placeholder="e.g. 5"
//             min="0"
//             className="form-control"
//             {...register("experience")}
//           />
//         </div>

//         <div className="col-12">
//           <label className="form-label fw-semibold">Profile Picture URL</label>
//           <input
//             type="file"
//             placeholder="https://example.com/photo.jpg"
//             className="form-control"
//             {...register("profilePicture")}
//           />
//         </div>

//         <div className="col-12 text-center mt-3">
//           <button type="submit" className="btn btn-danger px-5">
//             <i className="bi bi-plus-circle me-2"></i> Add Trainer
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// ------------------------------------------------------------------------------------------------------------
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";
const BASE = "https://final-gym-backend.onrender.com";

export default function AddTrainer() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (f) => {
    try {
      // Build trainer object (excluding file)
      const trainer = {
        name: f.name,
        email: f.email,
        password: f.password,
        phone: f.phone,
        specialization: f.specialization,
        experience: f.experience,
      };

      // Build FormData
      const formData = new FormData();
      formData.append("trainer", JSON.stringify(trainer)); // stringified JSON
      if (f.profilePicture && f.profilePicture[0]) {
        formData.append("file", f.profilePicture[0]); // first file
      }

      // API call
      const res = await fetch(`${BASE}/api/trainer/with-image`, {
        method: "POST",
        body: formData,
      });

      const obj = await res.json();

      if (res.ok) {
        Swal.fire(
          "Trainer Added",
          obj.message || "Successfully added!",
          "success"
        );
        reset();
      } else {
        Swal.fire("Failed", obj.message || "Could not add trainer", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4 text-center fw-bold">Add New Trainer</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            className="form-control"
            {...register("name")}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            placeholder="trainer@example.com"
            className="form-control"
            {...register("email")}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            {...register("password")}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Phone</label>
          <input
            type="tel"
            placeholder="e.g. +91 9876543210"
            className="form-control"
            {...register("phone")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Specialization</label>
          <input
            type="text"
            placeholder="e.g. Yoga, Strength Training"
            className="form-control"
            {...register("specialization")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Experience (Years)</label>
          <input
            type="number"
            placeholder="e.g. 5"
            min="0"
            className="form-control"
            {...register("experience")}
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            {...register("profilePicture")}
          />
        </div>
        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-danger px-5">
            <i className="bi bi-plus-circle me-2"></i> Add Trainer
          </button>
        </div>
      </form>
    </div>
  );
}
