import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="spinner" style={{ margin: '0 auto' }} />
      <p style={{ 
        color: 'white', 
        marginTop: '16px',
        fontSize: '1.1rem'
      }}>
        Analyzing company data
        <span className="loading-dots" />
      </p>
    </div>
  );
};

export default LoadingSpinner;