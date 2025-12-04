const Dashboard = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--electric)', marginBottom: '1rem' }}>Portfolio Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'var(--card)', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--muted)' }}>Portfolio Value</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)' }}>$24,730.12</p>
          <p style={{ color: 'rgba(37,99,235,0.9)', marginTop: '0.5rem' }}>+3.8% Today</p>
        </div>
        <div style={{ background: 'var(--card)', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--muted)' }}>Day Change</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)' }}>+$912.45</p>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Realized + Unrealized</p>
        </div>
        <div style={{ background: 'var(--card)', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--muted)' }}>Open Orders</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)' }}>2 Active</p>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Limit and market orders</p>
        </div>
      </div>

      <section style={{ marginTop: '1.5rem' }}>
        <h3 style={{ color: 'var(--electric)' }}>Recent Trades</h3>
        <p style={{ color: 'var(--muted)' }}>A snapshot of your most recent executed trades.</p>
      </section>
    </div>
  )
}

export default Dashboard
