const AdminDashboard = () => {
  return (
    <div>
      <h1 style={{ color: "var(--electric)" }}>Admin Dashboard</h1>
      <p style={{ color: "var(--muted)" }}>
        Manage users, view system metrics, and configure settings.
      </p>
      <section style={{ marginTop: "1rem" }}>
        <div
          style={{
            background: "var(--card)",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "var(--muted)" }}>User Management</h3>
          <p style={{ color: "var(--white)" }}>
            Invite, edit roles, or deactivate accounts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
