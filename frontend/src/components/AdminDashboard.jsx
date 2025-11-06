// src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {user?.name} (Role: {user?.role})</p>
    </div>
  );
}
