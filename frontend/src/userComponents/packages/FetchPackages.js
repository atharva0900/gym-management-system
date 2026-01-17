import React, { useEffect, useState } from "react";
import DisplayPackages from "./DisplayPackages";

// const BASE = "http://localhost:8080";
const BASE = "https://final-gym-backend.onrender.com";

export default function FetchPackages() {
  const [packages, setPackages] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");

  const fetchAll = async () => {
    const res = await fetch(`${BASE}/api/packages`);
    const obj = await res.json();
    setPackages(obj.data || []);
    setFiltered(obj.data || []);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    let arr = [...(packages || [])];
    if (query.trim().length > 0) {
      arr = arr.filter((p) =>
        (p.packageName || "").toLowerCase().includes(query.trim().toLowerCase())
      );
    }
    if (sort === "asc") {
      arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sort === "desc") {
      arr.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    setFiltered(arr);
  }, [query, sort, packages]);

  return (
    <div className="container py-3">
      <div className="d-flex gap-2 mb-3">
        {/* <input className="form-control" placeholder="Search package" value={query} onChange={e=>setQuery(e.target.value)} /> */}
        <select
          className="form-select w-25"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="">Sort by price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <DisplayPackages packagesValue={filtered} />
    </div>
  );
}
