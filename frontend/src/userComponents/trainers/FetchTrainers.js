// import React, { useEffect, useState } from "react";
// import DisplayTrainers from "./DisplayTrainers";

// const BASE = "http://localhost:8080";

// export default function FetchTrainers() {
//   const [trainers, setTrainers] = useState(null);
//   const [filtered, setFiltered] = useState(null);
//   const [query, setQuery] = useState("");
//   const [sort, setSort] = useState("");

//   const fetchAll = async () => {
//     const res = await fetch(`${BASE}/api/trainer/all-trainer`);
//     const obj = await res.json();
//     setTrainers(obj.data || []);
//     setFiltered(obj.data || []);
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   useEffect(() => {
//     let arr = [...(trainers || [])];

//     // filter by trainerName
//     if (query.trim().length > 0) {
//       arr = arr.filter((t) =>
//         (t.trainerName || "").toLowerCase().includes(query.trim().toLowerCase())
//       );
//     }

//     // sort by experience (numeric years assumed)
//     if (sort === "asc") {
//       arr.sort((a, b) => (a.experience || 0) - (b.experience || 0));
//     }
//     if (sort === "desc") {
//       arr.sort((a, b) => (b.experience || 0) - (a.experience || 0));
//     }

//     setFiltered(arr);
//   }, [query, sort, trainers]);

//   return (
//     <div className="container py-3">
//       <div className="d-flex gap-2 mb-3">
//         <input
//           className="form-control"
//           placeholder="Search trainer"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <select
//           className="form-select"
//           onChange={(e) => setSort(e.target.value)}
//           value={sort}
//         >
//           <option value="">Sort by experience</option>
//           <option value="asc">Low to High</option>
//           <option value="desc">High to Low</option>
//         </select>
//       </div>
//       <DisplayTrainers trainersValue={filtered} />
//     </div>
//   );
// }

// FetchTrainers.jsx
import React, { useEffect, useState } from "react";
import DisplayTrainers from "./DisplayTrainers";

// const BASE = "http://localhost:8080";
const BASE = "https://final-gym-backend.onrender.com";

export default function FetchTrainers() {
  const [trainers, setTrainers] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");

  // Load all trainers
  const fetchAll = async () => {
    const res = await fetch(`${BASE}/api/trainer/all-trainer`);
    const obj = await res.json();
    const data = obj?.data || [];
    setTrainers(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Filter + sort whenever inputs change
  useEffect(() => {
    if (!trainers) return;

    let arr = [...trainers];

    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter((t) => {
        const name = (t.name || "").toLowerCase();
        const username = (t.username || "").toLowerCase();
        const spec = (t.specialization || "").toLowerCase();
        return name.includes(q) || username.includes(q) || spec.includes(q);
      });
    }

    const toNum = (v) => Number(v) || 0;
    if (sort === "asc") {
      arr.sort((a, b) => toNum(a.experience) - toNum(b.experience));
    } else if (sort === "desc") {
      arr.sort((a, b) => toNum(b.experience) - toNum(a.experience));
    }

    setFiltered(arr);
  }, [query, sort, trainers]);

  if (!trainers) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Controls */}
      <div className="bg-light p-3 rounded shadow-sm mb-4">
        <div className="row g-2 align-items-stretch">
          <div className="col-md-7 col-sm-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, username or specialization…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="col-md-3 col-sm-6">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by experience</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>

          <div className="col-md-2 col-sm-6 d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setQuery("");
                setSort("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      {filtered && filtered.length > 0 ? (
        <DisplayTrainers trainersValue={filtered} />
      ) : (
        <div className="alert alert-info text-center">
          No trainers found matching your criteria
        </div>
      )}
    </div>
  );
}
