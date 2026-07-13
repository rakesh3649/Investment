import express from 'express';
import { InvestmentResearchAgent } from '../agents/research-agent.js';
import { getCompanyData, getMarketContext } from '../services/financial-data.js';
import { getCompanyNews } from '../services/news-service.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName || typeof companyName !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Company name is required',
        message: 'Please provide a valid company name'
      });
    }

    console.log(`🔍 Analyzing company: ${companyName}`);

    // Fetch all required data in parallel
    const [companyData, newsItems, marketContext] = await Promise.all([
      getCompanyData(companyName),
      getCompanyNews(companyName),
      getMarketContext(companyName),
    ]);

    console.log('📊 Data fetched successfully');
    console.log(`📰 Found ${newsItems.length} news items`);

    // Initialize agent and analyze
    const agent = new InvestmentResearchAgent();
    const result = await agent.analyzeCompany(
      companyData,
      newsItems,
      marketContext
    );

    console.log('✅ Analysis complete');
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('❌ Research API error:', error);
    res.status(500).json({
      success: false,
      error: 'Analysis failed',
      message: error.message
    });
  }
});

export default router;