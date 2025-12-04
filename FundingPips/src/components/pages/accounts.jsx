const Accounts = () => {
  const accounts = [
    { id: 1, name: 'Brokerage - Primary', balance: 13450.12 },
    { id: 2, name: 'Brokerage - IRA', balance: 9876.54 }
  ]

  return (
    <div>
      <h2 style={{ color: 'var(--electric)', marginBottom: '1rem' }}>Trading Accounts</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {accounts.map(a => (
          <div key={a.id} style={{ background: 'var(--card)', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--white)' }}>{a.name}</h4>
            <p style={{ color: 'var(--muted)' }}>Available Buying Power</p>
            <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>${a.balance.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accounts
