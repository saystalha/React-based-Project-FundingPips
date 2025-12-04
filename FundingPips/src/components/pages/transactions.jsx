const Transactions = () => {
  const data = [
    { id: 1, date: '2025-11-30', symbol: 'AAPL', qty: 10, price: 182.3, side: 'Buy' },
    { id: 2, date: '2025-11-29', symbol: 'BTC-USD', qty: 0.01, price: 43800, side: 'Sell' },
    { id: 3, date: '2025-11-28', symbol: 'TSLA', qty: 2, price: 236.5, side: 'Buy' }
  ]

  return (
    <div>
      <h2 style={{ color: 'var(--electric)', marginBottom: '1rem' }}>Order History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
            <th style={{ padding: '0.5rem' }}>Date</th>
            <th style={{ padding: '0.5rem' }}>Symbol</th>
            <th style={{ padding: '0.5rem' }}>Qty</th>
            <th style={{ padding: '0.5rem' }}>Price</th>
            <th style={{ padding: '0.5rem' }}>Side</th>
          </tr>
        </thead>
        <tbody>
          {data.map(tx => (
            <tr key={tx.id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '0.6rem', color: 'var(--white)' }}>{tx.date}</td>
              <td style={{ padding: '0.6rem', color: 'var(--white)' }}>{tx.symbol}</td>
              <td style={{ padding: '0.6rem', color: 'var(--muted)' }}>{tx.qty}</td>
              <td style={{ padding: '0.6rem', color: 'var(--white)' }}>${tx.price.toLocaleString()}</td>
              <td style={{ padding: '0.6rem', color: tx.side === 'Buy' ? 'rgba(16,185,129,1)' : 'rgba(239,68,68,1)' }}>{tx.side}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
