// import React, { useEffect, useState } from "react";

// const BASE = "http://localhost:8080";

// export default function ManageMembers() {
//   const [list, setList] = useState([]);

//   const load = async () => {
//     const res = await fetch(`${BASE}/api/customers/all`);
//     const obj = await res.json();
//     setList(obj.data || []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">All Members</h5>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Age</th>
//               <th>Sex</th>
//               <th>Weight</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((c) => (
//               <tr key={c.id}>
//                 <td>{c.id}</td>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.age}</td>
//                 <td>{c.sex}</td>
//                 <td>{c.weight}</td>
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

// export default function ManageMembers() {
//   const [list, setList] = useState([]);

//   const load = async () => {
//     const res = await fetch(`${BASE}/api/customers/all`);
//     const obj = await res.json();
//     setList(obj.data || []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const del = async (id) => {
//     const res = await fetch(`${BASE}/api/admin/customer/${id}`, {
//       method: "DELETE",
//     });
//     const obj = await res.json();

//     if (res.ok) {
//       Swal.fire("Deleted", obj.message || "Member deleted", "success");
//       load(); // Refresh the list
//     } else {
//       Swal.fire("Failed", obj.message || "Could not delete", "error");
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">All Members</h5>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Age</th>
//               <th>Sex</th>
//               <th>Weight</th>
//               <th>Actions</th> {/* New column for Delete */}
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((c) => (
//               <tr key={c.id}>
//                 <td>{c.id}</td>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.age}</td>
//                 <td>{c.sex}</td>
//                 <td>{c.weight}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => del(c.id)}
//                     title="Delete member"
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

const BASE = "http://localhost:8080";

export default function ManageMembers() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await fetch(`${BASE}/api/customers/all`);
    const obj = await res.json();
    console.log(obj);

    setList(obj.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    // Show confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`${BASE}/api/admin/customer/${id}`, {
        method: "DELETE",
      });
      const obj = await res.json();

      if (res.ok) {
        Swal.fire("Deleted!", obj.message || "Member deleted", "success");
        load(); // Refresh the list
      } else {
        Swal.fire("Failed!", obj.message || "Could not delete member", "error");
      }
    }
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">All Members</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Weight</th>
              <th>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.age}</td>
                <td>{c.sex}</td>
                <td>{c.weight}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => del(c.id)}
                    title="Delete member"
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
