import React, { useState } from 'react';
import ResultsDisplay from './ResultsDisplay';
import LoadingSpinner from './LoadingSpinner';
import { analyzeCompany } from '../services/api';

const ResearchInterface = () => {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      setError('Please enter a company name');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeCompany(companyName.trim());
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze company');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setCompanyName('');
  };

  return (
    <div className="container">
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '3rem', 
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          🤖 AI Investment Research Agent
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem' }}>
          Enter a company name to get AI-powered investment analysis
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '8px' }}>
          Try: Apple, Microsoft, Tesla, Amazon, Google, Nvidia
        </p>
      </div>

      {!result ? (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Apple, Microsoft, Tesla"
                className="input-field"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading || !companyName.trim()}
                style={{ minWidth: '120px' }}
              >
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            {error && (
              <div style={{
                padding: '12px',
                background: '#fff5f5',
                border: '1px solid #fc8181',
                borderRadius: '8px',
                color: '#c53030'
              }}>
                {error}
              </div>
            )}
          </form>

          {isLoading && (
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <LoadingSpinner />
              <p style={{ color: 'white', marginTop: '16px' }}>
                Analyzing company data... This may take a moment
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <h2 style={{ color: 'white', fontSize: '1.8rem' }}>
              📊 Research Results
            </h2>
            <button
              onClick={handleReset}
              className="btn-secondary"
            >
              New Analysis
            </button>
          </div>
          <ResultsDisplay result={result} />
        </div>
      )}
    </div>
  );
};

export default ResearchInterface;