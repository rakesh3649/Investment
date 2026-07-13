import React from 'react';

const ResultsDisplay = ({ result }) => {
  const getDecisionStyle = (decision) => {
    return decision === 'INVEST' ? 'decision-invest' : 'decision-pass';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 70) return 'high';
    if (confidence >= 50) return 'medium';
    return 'low';
  };

  const getMetricColor = (value) => {
    if (value >= 70) return 'high';
    if (value >= 50) return 'medium';
    return 'low';
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Decision Banner */}
      <div className={`card ${getDecisionStyle(result.decision)}`} style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '3rem' }}>
              {result.decision === 'INVEST' ? '📈' : '⛔'}
            </span>
            <div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                color: result.decision === 'INVEST' ? '#48bb78' : '#fc8181'
              }}>
                {result.decision === 'INVEST' ? 'RECOMMENDED: INVEST' : 'RECOMMENDED: PASS'}
              </h2>
              <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>
                {result.companyName}
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748' }}>
              {result.confidence}%
            </div>
            <div style={{ color: '#718096', fontSize: '0.9rem' }}>Confidence Level</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid-5" style={{ marginBottom: '24px' }}>
        {Object.entries(result.metrics).map(([key, value]) => {
          const displayKey = key.replace(/([A-Z])/g, ' $1').trim();
          const color = getMetricColor(value);
          
          return (
            <div key={key} className="card">
              <div style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>
                {displayKey}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', marginTop: '4px' }}>
                {value}%
              </div>
              <div className="metric-bar">
                <div 
                  className={`metric-bar-fill ${color}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Reasoning */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '12px' }}>
          📝 Analysis & Reasoning
        </h3>
        <p style={{ color: '#4a5568', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
          {result.reasoning}
        </p>
      </div>

      {/* Key Factors, Risks, Opportunities */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h4 style={{ fontWeight: 'bold', color: '#2d3748', marginBottom: '12px' }}>
            ✅ Key Factors
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.keyFactors.map((factor, index) => (
              <li key={index} style={{ 
                padding: '6px 0',
                borderBottom: index < result.keyFactors.length - 1 ? '1px solid #f0f0f0' : 'none',
                color: '#4a5568',
                display: 'flex',
                alignItems: 'start',
                gap: '8px'
              }}>
                <span style={{ color: '#48bb78' }}>•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h4 style={{ fontWeight: 'bold', color: '#2d3748', marginBottom: '12px' }}>
            ⚠️ Risks
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.risks.map((risk, index) => (
              <li key={index} style={{ 
                padding: '6px 0',
                borderBottom: index < result.risks.length - 1 ? '1px solid #f0f0f0' : 'none',
                color: '#4a5568',
                display: 'flex',
                alignItems: 'start',
                gap: '8px'
              }}>
                <span style={{ color: '#fc8181' }}>•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h4 style={{ fontWeight: 'bold', color: '#2d3748', marginBottom: '12px' }}>
            🚀 Opportunities
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.opportunities.map((opportunity, index) => (
              <li key={index} style={{ 
                padding: '6px 0',
                borderBottom: index < result.opportunities.length - 1 ? '1px solid #f0f0f0' : 'none',
                color: '#4a5568',
                display: 'flex',
                alignItems: 'start',
                gap: '8px'
              }}>
                <span style={{ color: '#667eea' }}>•</span>
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendation Summary */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '12px', color: 'white' }}>
          💡 Recommendation Summary
        </h4>
        <p style={{ lineHeight: '1.8' }}>
          {result.recommendation}
        </p>
      </div>

      {/* Timestamp */}
      {result.timestamp && (
        <div style={{ 
          textAlign: 'right', 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '0.9rem',
          marginTop: '16px'
        }}>
          Analysis completed: {new Date(result.timestamp).toLocaleString()}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ResultsDisplay;