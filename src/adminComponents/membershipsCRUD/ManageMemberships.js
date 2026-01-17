import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BASE = "http://localhost:8080";

export default function ManageMemberships() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("APPROVED");

  const load = async () => {
    const res = await fetch(`${BASE}/api/memberships/all`);
    const obj = await res.json();
    setList(obj.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id) => {
    const res = await fetch(
      `${BASE}/api/admin/membership/${id}/status?status=${encodeURIComponent(
        status
      )}`,
      {
        method: "PUT",
      }
    );
    if (res.ok) {
      Swal.fire("Updated", "Status updated", "success");
      load();
      return;
    }
    // Fallback to membership controller's PATCH form if exists
    const res2 = await fetch(
      `${BASE}/api/memberships/${id}/status?status=${encodeURIComponent(
        status
      )}`,
      {
        method: "PATCH",
      }
    );
    if (res2.ok) {
      Swal.fire("Updated", "Status updated", "success");
      load();
    } else {
      const o = await res2.json();
      Swal.fire("Failed", o.message || "Could not update status", "error");
    }
  };

  const del = async (id) => {
    const res = await fetch(`${BASE}/api/memberships/${id}`, {
      method: "DELETE",
    });
    const o = await res.json();
    if (res.ok) {
      Swal.fire("Deleted", o.message || "Membership deleted", "success");
      load();
    } else {
      Swal.fire("Failed", o.message || "Could not delete", "error");
    }
  };

  return (
    <div className="card p-3">
      <div className="d-flex align-items-center gap-2 mb-3">
        <h5 className="mb-0">All Memberships</h5>
        <div className="ms-auto d-flex gap-2">
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Package</th>
              <th>Trainer</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>
                  {m.customer?.name} (id {m.customer?.id})
                </td>
                <td>{m.gymPackage?.packageName}</td>
                <td>{m.trainer ? m.trainer.name : "-"}</td>
                <td>{m.startDate}</td>
                <td>{m.endDate}</td>
                <td>{m.status}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => updateStatus(m.id)}
                    title="Update status"
                  >
                    <i className="bi bi-check2-circle"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => del(m.id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
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
