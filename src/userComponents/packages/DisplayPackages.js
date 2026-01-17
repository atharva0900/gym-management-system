// import React from 'react';

// export default function DisplayPackages({ packagesValue }){
//   if(!packagesValue) return <div className="container py-4">Loading...</div>;
//   return (
//     <div className="container">
//       <div className="row g-3">
//         {packagesValue.map(p => (
//           <div className="col-md-4" key={p.id}>
//             <div className="card h-100">
//               <div className="card-body">
//                 <h5 className="card-title">{p.packageName}</h5>
//                 <p className="card-text">{p.description}</p>
//                 <p className="card-text"><i className="bi bi-clock"></i> {p.durationInMonths} months</p>
//                 <h6 className="text-primary">₹ {p.price}</h6>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useContext } from "react";
// import { LoginContext } from "../../context/LoginContext";
// import { useNavigate } from "react-router-dom";

// export default function DisplayPackages({ packagesValue }) {
//   const { isLogin } = useContext(LoginContext);
//   const navigate = useNavigate();
//   if (!packagesValue)
//     return <div className="container py-5 text-center">Loading...</div>;

//   const handleJoinNow = (pkg) => {
//     if (isLogin) {
//       navigate("/membership", { state: { selectedPackage: pkg } });
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <section className="py-0 bg-light bg-opacity-25 mb-5" id="packages">
//       <div className="container py-4">
//         <div className="row justify-content-center mb-5">
//           <div className="col-lg-6 text-center">
//             <h2 className="fw-bold position-relative d-inline-block pb-3">
//               Membership Packages
//               <span
//                 className="position-absolute bottom-0 start-50 translate-middle-x bg-danger"
//                 style={{ height: "3px", width: "100%" }}
//               ></span>
//             </h2>
//             <p className="lead text-muted">
//               Pick the package that suits your goals and lifestyle
//             </p>
//           </div>
//         </div>

//         <div className="row g-4">
//           {packagesValue.map((p) => (
//             <div className="col-md-4" key={p.id}>
//               <div className="card border-0 shadow h-100">
//                 <div className="card-body text-center p-4">
//                   {/* Package Name */}
//                   <h5 className="card-title fw-bold">{p.packageName}</h5>

//                   {/* Price */}
//                   <h2 className="my-3 text-danger">
//                     ₹{p.price}
//                     <small className="text-muted fw-light">
//                       {" "}
//                       / {p.durationInMonths} mo
//                     </small>
//                   </h2>

//                   {/* Description */}
//                   <p className="text-muted mb-3">{p.description}</p>

//                   {/* Features */}
//                   <ul className="list-unstyled mb-4 text-start">
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle-fill text-success me-2"></i>
//                       Duration: {p.durationInMonths} months
//                     </li>
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle-fill text-success me-2"></i>
//                       Full gym access
//                     </li>
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle-fill text-success me-2"></i>
//                       Locker room access
//                     </li>
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle-fill text-success me-2"></i>
//                       {p.packageName === "Ultimate"
//                         ? "Includes trainer + classes"
//                         : "Basic trainer guidance"}
//                     </li>
//                   </ul>

//                   {/* CTA */}
//                   <a
//                     href="#"
//                     className="btn btn-outline-danger w-100 rounded-pill"
//                     onClick={() => handleJoinNow(p)} // ✅ Correct way
//                   >
//                     Join Now
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function DisplayPackages({ packagesValue }) {
  const { isLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  if (!packagesValue)
    return <div className="container py-5 text-center">Loading...</div>;

  const handleJoinNow = (pkg) => {
    if (isLogin) {
      // ✅ Redirect to membership page if logged in
      navigate("/membership", { state: { selectedPackage: pkg } });
    } else {
      // ✅ Show SweetAlert toast before redirecting
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Login required to join a package",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <section className="py-0 bg-light bg-opacity-25 mb-5" id="packages">
      <div className="container py-4">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6 text-center">
            <h2 className="fw-bold position-relative d-inline-block pb-3">
              Membership Packages
              <span
                className="position-absolute bottom-0 start-50 translate-middle-x bg-danger"
                style={{ height: "3px", width: "100%" }}
              ></span>
            </h2>
            <p className="lead text-muted">
              Pick the package that suits your goals and lifestyle
            </p>
          </div>
        </div>

        <div className="row g-4">
          {packagesValue.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center p-4">
                  {/* Package Name */}
                  <h5 className="card-title fw-bold">{p.packageName}</h5>

                  {/* Price */}
                  <h2 className="my-3 text-danger">
                    ₹{p.price}
                    <small className="text-muted fw-light">
                      {" "}
                      / {p.durationInMonths} mo
                    </small>
                  </h2>

                  {/* Description */}
                  <p className="text-muted mb-3">{p.description}</p>

                  {/* Features */}
                  <ul className="list-unstyled mb-4 text-start">
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Duration: {p.durationInMonths} months
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Full gym access
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Locker room access
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {p.packageName === "Ultimate"
                        ? "Includes trainer + classes"
                        : "Basic trainer guidance"}
                    </li>
                  </ul>

                  {/* CTA */}
                  <button
                    className="btn btn-outline-danger w-100 rounded-pill"
                    onClick={() => handleJoinNow(p)}
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
