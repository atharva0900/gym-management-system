// import React, { useEffect, useState } from 'react';

// const BASE = 'http://localhost:8080';

// export default function ManagePackages(){
//   const [list, setList] = useState([]);

//   const load = async () => {
//     const res = await fetch(`${BASE}/api/packages`);
//     const obj = await res.json();
//     setList(obj.data || []);
//   };

//   useEffect(() => { load(); }, []);

//   return (
//     <div className="card p-3">
//       <h5 className="mb-3">All Packages</h5>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Duration</th></tr></thead>
//           <tbody>
//             {list.map(p => (
//               <tr key={p.id}>
//                 <td>{p.id}</td>
//                 <td>{p.packageName}</td>
//                 <td>₹ {p.price}</td>
//                 <td>{p.durationInMonths} months</td>
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

export default function ManagePackages() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await fetch(`${BASE}/api/packages`);
    const obj = await res.json();
    setList(obj.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this package!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`${BASE}/api/admin/package/${id}`, {
        method: "DELETE",
      });
      const obj = await res.json();

      if (res.ok) {
        Swal.fire("Deleted!", obj.message || "Package deleted", "success");
        load(); // Refresh the list
      } else {
        Swal.fire(
          "Failed!",
          obj.message || "Could not delete package",
          "error"
        );
      }
    }
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">All Packages</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.packageName}</td>
                <td>₹ {p.price}</td>
                <td>{p.durationInMonths} months</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => del(p.id)}
                    title="Delete package"
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
