import { useState } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState([]); // backend will fill this
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1 className="title">Hattan New Year Party</h1>
      <h2 className="subtitle">Admin Dashboard</h2>

      <input
        className="search"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Advance</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="9" className="empty">
                No records yet
              </td>
            </tr>
          ) : (
            filteredData.map((row, index) => (
              <tr key={row.phone}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.gender}</td>
                <td>{row.category}</td>
                <td>{row.advance}</td>
                <td>{row.balance}</td>
                <td className={`status ${row.status?.toLowerCase()}`}>
                  {row.status}
                </td>
                <td>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
