// import React, { useEffect, useState } from "react";

// const BASE = "http://localhost:8080";

// export default function ManageTrainers() {
//   const [list, setList] = useState([]);

//   const load = async () => {
//     const res = await fetch(`${BASE}/api/trainer/all-trainer`);
//     const obj = await res.json();
//     console.log(obj);

//     setList(obj.data || []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">All Trainers</h5>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Specialization</th>
//               <th>Experience</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((t) => (
//               <tr key={t.id}>
//                 <td>{t.id}</td>
//                 <td> {t.name}</td>
//                 <td>{t.email}</td>
//                 <td>{t.phone}</td>
//                 <td>{t.specialization}</td>
//                 <td>{t.experience}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";

// export default function ManageTrainers() {
//   const [list, setList] = useState([]);

//   const load = async () => {
//     const res = await fetch(`${BASE}/api/trainer/all-trainer`);
//     const obj = await res.json();
//     setList(obj.data || []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const del = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this trainer!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete!",
//     });

//     if (result.isConfirmed) {
//       const res = await fetch(`${BASE}/api/admin/trainer/${id}`, {
//         method: "DELETE",
//       });
//       const obj = await res.json();

//       if (res.ok) {
//         Swal.fire("Deleted!", obj.message || "Trainer deleted", "success");
//         load(); // Refresh the list
//       } else {
//         Swal.fire(
//           "Failed!",
//           obj.message || "Could not delete trainer",
//           "error"
//         );
//       }
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">All Trainers</h5>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Specialization</th>
//               <th>Experience</th>
//               <th>Actions</th> {/* Added Actions column */}
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((t) => (
//               <tr key={t.id}>
//                 <td>{t.id}</td>
//                 <td>{t.name}</td>
//                 <td>{t.email}</td>
//                 <td>{t.phone}</td>
//                 <td>{t.specialization}</td>
//                 <td>{t.experience}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => del(t.id)}
//                     title="Delete trainer"
//                   >
//                     <i className="bi bi-trash"></i> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// ---------

// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";

// export default function ManageTrainers() {
//   const [list, setList] = useState([]);

//   const load = async () => {
//     const res = await fetch(`${BASE}/api/trainer/all-trainer`);
//     const obj = await res.json();
//     setList(obj.data || []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const del = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this trainer!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete!",
//     });

//     if (result.isConfirmed) {
//       const res = await fetch(`${BASE}/api/admin/trainer/${id}`, {
//         method: "DELETE",
//       });
//       const obj = await res.json();

//       if (res.ok) {
//         Swal.fire("Deleted!", obj.message || "Trainer deleted", "success");
//         load();
//       } else {
//         Swal.fire(
//           "Failed!",
//           obj.message || "Could not delete trainer",
//           "error"
//         );
//       }
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">All Trainers</h5>
//       <div className="table-responsive">
//         <table className="table table-striped align-middle">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Profile</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Specialization</th>
//               <th>Experience</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((t) => (
//               <tr key={t.id}>
//                 <td>{t.id}</td>
//                 <td>
//                   {t.imageUrl ? (
//                     <img
//                       src={t.imageUrl}
//                       alt={t.name}
//                       width="50"
//                       height="50"
//                       style={{ borderRadius: "50%", objectFit: "cover" }}
//                     />
//                   ) : (
//                     <span className="text-muted">No Image</span>
//                   )}
//                 </td>
//                 <td>{t.name}</td>
//                 <td>{t.email}</td>
//                 <td>{t.phone}</td>
//                 <td>{t.specialization}</td>
//                 <td>{t.experience}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => del(t.id)}
//                     title="Delete trainer"
//                   >
//                     <i className="bi bi-trash"></i> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";

// export default function ManageTrainers() {
//   const [list, setList] = useState([]);

//   const load = async () => {
//     const res = await fetch(`${BASE}/api/trainer/all-trainer`);
//     const obj = await res.json();
//     setList(obj.data || []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const del = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this trainer!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete!",
//     });

//     if (result.isConfirmed) {
//       const res = await fetch(`${BASE}/api/admin/trainer/${id}`, {
//         method: "DELETE",
//       });
//       const obj = await res.json();

//       if (res.ok) {
//         Swal.fire("Deleted!", obj.message || "Trainer deleted", "success");
//         load(); // Refresh the list
//       } else {
//         Swal.fire(
//           "Failed!",
//           obj.message || "Could not delete trainer",
//           "error"
//         );
//       }
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">All Trainers</h5>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Photo</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Specialization</th>
//               <th>Experience</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((t) => (
//               <tr key={t.id}>
//                 <td>{t.id}</td>
//                 <td>
//                   {t.image_name ? (
//                     <img
//                       src={`http://localhost:8080/api/trainer/images/${t.imageName}`}
//                       alt={t.name}
//                       width="80"
//                       height="80"
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>

//                 <td>{t.name}</td>
//                 <td>{t.email}</td>
//                 <td>{t.phone}</td>
//                 <td>{t.specialization}</td>
//                 <td>{t.experience}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => del(t.id)}
//                     title="Delete trainer"
//                   >
//                     <i className="bi bi-trash"></i> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// const BASE = "http://localhost:8080";
const BASE = "https://final-gym-backend.onrender.com";

export default function ManageTrainers() {
  const [list, setList] = useState([]);

  // 🔹 Load Trainers
  const load = async () => {
    const res = await fetch(`${BASE}/api/trainer/all-trainer`);
    const obj = await res.json();
    setList(obj.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Delete Trainer
  const del = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this trainer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`${BASE}/api/admin/trainer/${id}`, {
        method: "DELETE",
      });
      const obj = await res.json();

      if (res.ok) {
        Swal.fire("Deleted!", obj.message || "Trainer deleted", "success");
        load(); // refresh trainers
      } else {
        Swal.fire(
          "Failed!",
          obj.message || "Could not delete trainer",
          "error"
        );
      }
    }
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">All Trainers</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>
                  {t.imageName ? (
                    <img
                      src={`${BASE}/api/trainer/images/${t.imageName}`}
                      alt={t.name}
                      width="80"
                      height="80"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td>{t.specialization}</td>
                <td>{t.experience}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => del(t.id)}
                    title="Delete trainer"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
