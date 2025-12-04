import React from 'react'

const InputField = ({ label, id, type = 'text', ...rest }) => {
  return (
    <label style={{display: 'flex', flexDirection: 'column', gap: '6px'}} htmlFor={id}>
      <span style={{fontSize: '14px', color: 'var(--electric)', fontWeight: '600'}}>{label}</span>
      <input 
        id={id} 
        name={id} 
        type={type} 
        {...rest}
        style={{
          padding: '0.75rem',
          backgroundColor: 'var(--card)',
          color: 'var(--white)',
          border: '1px solid rgba(37,99,235,0.14)',
          borderRadius: '4px',
          fontFamily: 'inherit',
          fontSize: '1rem',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          ...rest.style
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--electric)'
          e.target.style.boxShadow = '0 0 12px rgba(37,99,235,0.12)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(37,99,235,0.14)'
          e.target.style.boxShadow = 'none'
        }}
      />
    </label>
  )
}

export default InputField
