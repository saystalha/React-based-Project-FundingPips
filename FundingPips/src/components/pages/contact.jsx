import { useState } from 'react'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <main style={{
      padding: '1.5rem',
      background: 'var(--card)',
      borderRadius: '8px'
    }}>
      <h1 style={{
        fontSize: '2.25rem',
        fontWeight: 'bold',
        color: 'var(--electric)',
        marginBottom: '0.5rem'
      }}>Contact FundingPips</h1>
      <p style={{
        color: 'var(--muted)',
        marginBottom: '2rem'
      }}>Questions about trading, accounts, or integrations? Our support team is here to help.</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              color: 'var(--electric)',
              fontSize: '0.9rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
                style={{
                width: '100%',
                background: 'var(--card)',
                border: '2px solid rgba(37,99,235,0.12)',
                color: 'var(--white)',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'var(--electric)',
              fontSize: '0.9rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={{
                width: '100%',
                background: 'var(--card)',
                border: '2px solid var(--mint)',
                color: 'var(--white)',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'var(--electric)',
              fontSize: '0.9rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>Message</label>
            <textarea
              name="message"
              placeholder="How can we help? Describe your trading or account question..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: '100%',
                background: 'var(--card)',
                border: '2px solid rgba(37,99,235,0.12)',
                color: 'var(--white)',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'var(--electric)',
              color: 'var(--white)',
              fontWeight: '700',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.18s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--royal)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--electric)'}
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
          <div style={{
          background: 'var(--card)',
          borderLeft: '4px solid rgba(37,99,235,0.12)',
          padding: '1.5rem',
          borderRadius: '6px'
        }}>
          <h3 style={{
            color: 'var(--electric)',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1.5rem'
          }}>Get in Touch</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{
                fontWeight: '700',
                color: 'var(--electric)',
                marginBottom: '0.25rem'
              }}>📧 Email</p>
              <p style={{ color: 'var(--muted)' }}>support@fundingpips.example</p>
            </div>

            <div>
              <p style={{
                fontWeight: '700',
                color: 'var(--electric)',
                marginBottom: '0.25rem'
              }}>📱 Phone</p>
              <p style={{ color: 'var(--muted)' }}>+1 (555) 123-4567</p>
            </div>

            <div>
              <p style={{
                fontWeight: '700',
                color: 'var(--electric)',
                marginBottom: '0.25rem'
              }}>📍 Address</p>
              <p style={{ color: 'var(--muted)' }}>123 Market St<br />Your City, Country</p>
            </div>

            <div>
              <p style={{
                fontWeight: 'bold',
                color: 'var(--mint)',
                marginBottom: '0.25rem'
              }}>🕐 Hours</p>
              <p style={{ color: 'var(--muted)' }}>Monday - Friday: 9AM - 6PM<br />Weekend: By appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
        {submitted && (
        <div style={{
          marginTop: '2rem',
          background: 'rgba(162,217,206,0.12)',
          border: '2px solid var(--mint)',
          borderLeft: '4px solid var(--mint)',
          color: 'var(--mint)',
          padding: '1rem',
          borderRadius: '4px',
          textAlign: 'center',
          animation: 'slideUp 0.4s ease-out'
        }}>
          ✅ Thanks! Your message has been sent. Our team will get back to you soon.
        </div>
          )}
    </main>
  )
}

export default Contact
