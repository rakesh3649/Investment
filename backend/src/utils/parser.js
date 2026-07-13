export function parseResearchResponse(content, companyName) {
  // Extract sections using regex patterns
  const sections = {
    decision: extractSection(content, /DECISION\s*[:]\s*([^\n]+)/i),
    confidence: extractSection(content, /CONFIDENCE\s*[:]\s*([^\n]+)/i),
    reasoning: extractSection(content, /REASONING\s*[:]\s*([\s\S]+?)(?=\n\n[A-Z]|\n##|$)/i),
    recommendation: extractSection(content, /RECOMMENDATION SUMMARY\s*[:]\s*([\s\S]+?)(?=\n\n|$)/i),
  };

  // Extract metrics
  const metrics = extractMetrics(content);

  // Extract lists
  const keyFactors = extractList(content, /KEY FACTORS\s*[:]\s*([\s\S]+?)(?=\n\n[A-Z]|\n##|$)/i);
  const risks = extractList(content, /RISKS\s*[:]\s*([\s\S]+?)(?=\n\n[A-Z]|\n##|$)/i);
  const opportunities = extractList(content, /OPPORTUNITIES\s*[:]\s*([\s\S]+?)(?=\n\n[A-Z]|\n##|$)/i);

  // Parse confidence
  let confidence = 50;
  if (sections.confidence) {
    const match = sections.confidence.match(/(\d+)/);
    if (match) {
      confidence = Math.min(100, Math.max(0, parseInt(match[1])));
    }
  }

  // Parse decision
  const decision = sections.decision ? 
    sections.decision.toUpperCase().includes('INVEST') ? 'INVEST' : 'PASS' 
    : 'PASS';

  // Use reasoning or fallback
  const reasoning = sections.reasoning || content;

  // Generate recommendation if not provided
  let recommendation = sections.recommendation;
  if (!recommendation) {
    recommendation = generateRecommendation(decision, metrics);
  }

  return {
    companyName,
    decision,
    confidence,
    reasoning: reasoning.trim(),
    metrics,
    keyFactors: keyFactors.length > 0 ? keyFactors : ['Strong market presence', 'Solid financials', 'Growth potential'],
    risks: risks.length > 0 ? risks : ['Market volatility', 'Competitive pressures', 'Regulatory changes'],
    opportunities: opportunities.length > 0 ? opportunities : ['Market expansion', 'Innovation', 'Strategic partnerships'],
    recommendation: recommendation.trim(),
  };
}

function extractSection(content, pattern) {
  const match = content.match(pattern);
  return match ? match[1].trim() : null;
}

function extractMetrics(content) {
  const metrics = {
    financialHealth: 50,
    growthPotential: 50,
    marketPosition: 50,
    competitiveAdvantage: 50,
    riskFactor: 50,
  };

  const metricPatterns = {
    financialHealth: /Financial Health\s*[:]\s*(\d+)/i,
    growthPotential: /Growth Potential\s*[:]\s*(\d+)/i,
    marketPosition: /Market Position\s*[:]\s*(\d+)/i,
    competitiveAdvantage: /Competitive Advantage\s*[:]\s*(\d+)/i,
    riskFactor: /Risk Factor\s*[:]\s*(\d+)/i,
  };

  for (const [key, pattern] of Object.entries(metricPatterns)) {
    const match = content.match(pattern);
    if (match) {
      metrics[key] = Math.min(100, Math.max(0, parseInt(match[1])));
    }
  }

  return metrics;
}

function extractList(content, pattern) {
  const match = content.match(pattern);
  if (!match) return [];

  const items = match[1]
    .split('\n')
    .map(line => line.replace(/^[\s•\-*0-9.]+/, '').trim())
    .filter(line => line.length > 0);

  return items;
}

function generateRecommendation(decision, metrics) {
  if (decision === 'INVEST') {
    return `Based on strong financial health (${metrics.financialHealth}/100), 
    growth potential (${metrics.growthPotential}/100), and competitive position 
    (${metrics.competitiveAdvantage}/100), the company represents a compelling 
    investment opportunity. Key strengths outweigh identified risks, suggesting 
    favorable risk-reward profile.`;
  } else {
    return `Current metrics (Financial Health: ${metrics.financialHealth}/100, 
    Growth: ${metrics.growthPotential}/100) and risk factors suggest passing 
    on this investment at this time. Monitor for improvements in key areas 
    before reconsidering.`;
  }
}