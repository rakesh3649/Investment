import axios from 'axios';

// Note: In production, you would use a real financial API
// This is a simulated service with realistic mock data

export async function getCompanyData(companyName) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const normalizedName = companyName.toLowerCase().trim();
  
  // Mock database of company data
  const mockData = {
    'apple': {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketCap: 2800000000000,
      peRatio: 30.5,
      eps: 6.16,
      revenue: 383285000000,
      revenueGrowth: 0.08,
      profitMargin: 0.25,
      debtToEquity: 1.5,
      currentRatio: 0.99,
      priceToBook: 46.2,
      dividendYield: 0.005,
      analystRating: 'Buy',
      targetPrice: 210.50,
      fiftyTwoWeekHigh: 199.62,
      fiftyTwoWeekLow: 154.40,
    },
    'microsoft': {
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      sector: 'Technology',
      industry: 'Software',
      marketCap: 3100000000000,
      peRatio: 36.2,
      eps: 11.56,
      revenue: 211915000000,
      revenueGrowth: 0.12,
      profitMargin: 0.34,
      debtToEquity: 0.4,
      currentRatio: 1.65,
      priceToBook: 14.2,
      dividendYield: 0.009,
      analystRating: 'Strong Buy',
      targetPrice: 440.00,
      fiftyTwoWeekHigh: 390.00,
      fiftyTwoWeekLow: 290.00,
    },
    'tesla': {
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      sector: 'Automotive',
      industry: 'Electric Vehicles',
      marketCap: 780000000000,
      peRatio: 55.3,
      eps: 3.12,
      revenue: 96773000000,
      revenueGrowth: 0.35,
      profitMargin: 0.13,
      debtToEquity: 1.2,
      currentRatio: 1.2,
      priceToBook: 12.5,
      dividendYield: 0,
      analystRating: 'Hold',
      targetPrice: 250.00,
      fiftyTwoWeekHigh: 299.29,
      fiftyTwoWeekLow: 150.00,
    },
    'amazon': {
      name: 'Amazon.com Inc.',
      symbol: 'AMZN',
      sector: 'Consumer Cyclical',
      industry: 'E-commerce',
      marketCap: 1850000000000,
      peRatio: 48.7,
      eps: 2.90,
      revenue: 574785000000,
      revenueGrowth: 0.11,
      profitMargin: 0.06,
      debtToEquity: 0.8,
      currentRatio: 1.1,
      priceToBook: 8.5,
      dividendYield: 0,
      analystRating: 'Buy',
      targetPrice: 180.00,
      fiftyTwoWeekHigh: 184.00,
      fiftyTwoWeekLow: 118.00,
    },
    'google': {
      name: 'Alphabet Inc.',
      symbol: 'GOOGL',
      sector: 'Technology',
      industry: 'Internet Content & Information',
      marketCap: 1700000000000,
      peRatio: 25.8,
      eps: 5.80,
      revenue: 307394000000,
      revenueGrowth: 0.09,
      profitMargin: 0.24,
      debtToEquity: 0.3,
      currentRatio: 2.1,
      priceToBook: 6.5,
      dividendYield: 0,
      analystRating: 'Buy',
      targetPrice: 150.00,
      fiftyTwoWeekHigh: 141.00,
      fiftyTwoWeekLow: 101.00,
    },
    'nvidia': {
      name: 'NVIDIA Corporation',
      symbol: 'NVDA',
      sector: 'Technology',
      industry: 'Semiconductors',
      marketCap: 2200000000000,
      peRatio: 52.3,
      eps: 4.52,
      revenue: 60922000000,
      revenueGrowth: 0.78,
      profitMargin: 0.42,
      debtToEquity: 0.2,
      currentRatio: 2.8,
      priceToBook: 35.6,
      dividendYield: 0.0004,
      analystRating: 'Strong Buy',
      targetPrice: 850.00,
      fiftyTwoWeekHigh: 950.00,
      fiftyTwoWeekLow: 400.00,
    }
  };

  // Find matching company
  let foundCompany = null;
  for (const [key, data] of Object.entries(mockData)) {
    if (normalizedName.includes(key) || key.includes(normalizedName) ||
        data.name.toLowerCase().includes(normalizedName) ||
        data.symbol.toLowerCase().includes(normalizedName)) {
      foundCompany = data;
      break;
    }
  }

  if (foundCompany) {
    return foundCompany;
  }

  // Return generic data if company not found
  return {
    name: companyName,
    symbol: companyName.toUpperCase().substring(0, 4),
    sector: 'Unknown',
    industry: 'Unknown',
    marketCap: 10000000000,
    peRatio: 15.0,
    eps: 2.50,
    revenue: 5000000000,
    revenueGrowth: 0.05,
    profitMargin: 0.12,
    debtToEquity: 0.8,
    currentRatio: 1.5,
    priceToBook: 2.0,
    dividendYield: 0.02,
    analystRating: 'Hold',
    targetPrice: 100.00,
    fiftyTwoWeekHigh: 120.00,
    fiftyTwoWeekLow: 80.00,
  };
}

export async function getMarketContext(companyName) {
  // Simulate market context
  const contexts = [
    `The current market environment shows moderate volatility with investors focusing on 
    earnings quality and growth sustainability. Interest rates remain elevated, impacting 
    valuation multiples across sectors.`,
    
    `Markets are navigating through a period of economic uncertainty with inflation concerns 
    and potential recession risks. However, certain sectors like technology and healthcare 
    continue to show resilience.`,
    
    `Global markets are experiencing mixed signals with geopolitical tensions and 
    central bank policies creating headwinds. Innovation and AI adoption are driving 
    growth in many sectors.`
  ];

  return contexts[Math.floor(Math.random() * contexts.length)];
}