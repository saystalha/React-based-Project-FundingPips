const UserDashboard = () => {
  return (
    <div>
      <h1 style={{ color: "var(--electric)" }}>User Dashboard</h1>
      <p style={{ color: "var(--muted)" }}>
        Welcome — your personalized trading dashboard.
      </p>
      <section style={{ marginTop: "1rem" }}>
        <div
          style={{
            background: "var(--card)",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "var(--muted)" }}>Quick Actions</h3>
          <p style={{ color: "var(--white)" }}>
            View portfolio, place orders, and check analytics.
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
