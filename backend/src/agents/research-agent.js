import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { RESEARCH_PROMPT } from '../prompts/index.js';
import { parseResearchResponse } from '../utils/parser.js';

export class InvestmentResearchAgent {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('⚠️ GEMINI_API_KEY not set or using placeholder. Using mock mode.');
      this.mockMode = true;
      return;
    }

    try {
      this.model = new ChatGoogleGenerativeAI({
        modelName: 'gemini-1.5-pro',
        temperature: 0.3,
        maxOutputTokens: 8192,
        apiKey: apiKey,
      });
      this.mockMode = false;
      console.log('✅ Gemini AI initialized successfully');
    } catch (error) {
      console.warn('⚠️ Failed to initialize Gemini AI:', error.message);
      console.warn('⚠️ Running in mock mode');
      this.mockMode = true;
    }
  }

  async analyzeCompany(companyData, newsItems, marketContext) {
    try {
      if (this.mockMode) {
        console.log('📝 Running in mock mode - generating simulated response');
        return this.generateMockResponse(companyData);
      }

      // Format data for the prompt
      const formattedData = this.formatCompanyData(companyData);
      const formattedNews = this.formatNewsData(newsItems);

      // Prepare the prompt
      const prompt = RESEARCH_PROMPT
        .replace('{companyData}', formattedData)
        .replace('{newsData}', formattedNews)
        .replace('{marketContext}', marketContext);

      console.log('📝 Sending request to Google Gemini...');

      // Get LLM response
      const response = await this.model.invoke([
        new SystemMessage(
          'You are an expert investment analyst with decades of experience. ' +
          'Provide detailed, data-driven investment recommendations with clear reasoning.'
        ),
        new HumanMessage(prompt),
      ]);

      console.log('✅ Received response from Gemini');

      // Parse and structure the response
      const result = parseResearchResponse(
        response.content.toString(),
        companyData.name
      );

      // Add timestamp
      result.timestamp = new Date().toISOString();

      return result;
    } catch (error) {
      console.error('❌ Error in research agent:', error);
      console.log('📝 Falling back to mock response');
      return this.generateMockResponse(companyData);
    }
  }

  generateMockResponse(companyData) {
    const isStrongCompany = companyData.revenueGrowth > 0.1 && companyData.profitMargin > 0.15;
    const decision = isStrongCompany ? 'INVEST' : 'PASS';
    const confidence = isStrongCompany ? 75 + Math.floor(Math.random() * 20) : 40 + Math.floor(Math.random() * 30);

    return {
      companyName: companyData.name,
      decision: decision,
      confidence: confidence,
      reasoning: `Based on analysis of ${companyData.name} financial data:\n\n` +
        `The company shows ${isStrongCompany ? 'strong' : 'moderate'} fundamentals with revenue growth of ${(companyData.revenueGrowth * 100).toFixed(1)}% ` +
        `and profit margins of ${(companyData.profitMargin * 100).toFixed(1)}%. ` +
        `The P/E ratio of ${companyData.peRatio.toFixed(1)} suggests ${companyData.peRatio > 25 ? 'premium' : 'reasonable'} valuation.\n\n` +
        `Market position appears ${companyData.sector ? 'strong in the ' + companyData.sector + ' sector' : 'competitive'} ` +
        `with room for growth.`,
      metrics: {
        financialHealth: Math.min(100, Math.floor(50 + (companyData.profitMargin * 200))),
        growthPotential: Math.min(100, Math.floor(50 + (companyData.revenueGrowth * 150))),
        marketPosition: Math.min(100, Math.floor(50 + Math.random() * 30)),
        competitiveAdvantage: Math.min(100, Math.floor(50 + Math.random() * 30)),
        riskFactor: Math.min(100, Math.floor(50 + Math.random() * 30)),
      },
      keyFactors: [
        `${companyData.sector || 'Industry'} leadership position`,
        `${(companyData.revenueGrowth * 100).toFixed(1)}% revenue growth trajectory`,
        `Profit margins of ${(companyData.profitMargin * 100).toFixed(1)}%`,
        `Strong balance sheet with ${companyData.currentRatio.toFixed(2)} current ratio`,
        `Analyst consensus: ${companyData.analystRating || 'Hold'}`,
      ],
      risks: [
        'Market volatility and economic uncertainty',
        'Competitive pressures in the sector',
        'Potential regulatory changes',
      ],
      opportunities: [
        'Expansion into new markets',
        'Product innovation and development',
        'Strategic partnerships and acquisitions',
      ],
      recommendation: isStrongCompany 
        ? `${companyData.name} demonstrates strong fundamentals and growth potential. The company's market position, financial health, and growth trajectory make it a compelling investment opportunity.`
        : `${companyData.name} shows moderate fundamentals with some areas of concern. While the company has potential, current metrics suggest waiting for better entry points or clearer growth signals.`,
      timestamp: new Date().toISOString(),
    };
  }

  formatCompanyData(data) {
    return `
Company: ${data.name} (${data.symbol})
Sector: ${data.sector}
Industry: ${data.industry}

📊 FINANCIAL METRICS:
┌─────────────────────────┬──────────────┐
│ Metric                  │ Value        │
├─────────────────────────┼──────────────┤
│ Market Cap              │ $${(data.marketCap / 1e9).toFixed(2)}B │
│ P/E Ratio               │ ${data.peRatio.toFixed(2)}          │
│ EPS                     │ $${data.eps.toFixed(2)}             │
│ Revenue                 │ $${(data.revenue / 1e9).toFixed(2)}B │
│ Revenue Growth          │ ${(data.revenueGrowth * 100).toFixed(1)}%         │
│ Profit Margin           │ ${(data.profitMargin * 100).toFixed(1)}%         │
│ Debt/Equity             │ ${data.debtToEquity.toFixed(2)}          │
│ Current Ratio           │ ${data.currentRatio.toFixed(2)}          │
│ Price/Book              │ ${data.priceToBook.toFixed(2)}          │
│ Dividend Yield          │ ${(data.dividendYield * 100).toFixed(2)}%         │
└─────────────────────────┴──────────────┘

📈 VALUATION:
• Analyst Rating: ${data.analystRating}
• Target Price: $${data.targetPrice.toFixed(2)}
• 52-Week Range: $${data.fiftyTwoWeekLow.toFixed(2)} - $${data.fiftyTwoWeekHigh.toFixed(2)}
`;
  }

  formatNewsData(newsItems) {
    if (!newsItems || newsItems.length === 0) {
      return '📰 No recent news available.';
    }

    return '📰 RECENT NEWS:\n' + newsItems.map((item, index) => `
${index + 1}. ${item.title}
   • Source: ${item.source}
   • Sentiment: ${item.sentiment.toUpperCase()}
   • Relevance: ${(item.relevanceScore * 100).toFixed(0)}%
   • Date: ${new Date(item.publishedAt).toLocaleDateString()}
   • URL: ${item.url}
`).join('\n');
  }
}