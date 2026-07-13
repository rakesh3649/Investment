export async function getCompanyNews(companyName) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const newsTemplates = [
    {
      title: `${companyName} Announces Record Quarterly Revenue`,
      source: 'Bloomberg',
      sentiment: 'positive',
    },
    {
      title: `${companyName} Launches Innovative New Product Line`,
      source: 'TechCrunch',
      sentiment: 'positive',
    },
    {
      title: `Analysts Upgrade ${companyName} Stock Rating`,
      source: 'Reuters',
      sentiment: 'positive',
    },
    {
      title: `${companyName} Reports Strong Earnings Beat`,
      source: 'CNBC',
      sentiment: 'positive',
    },
    {
      title: `${companyName} Faces Regulatory Investigation`,
      source: 'Financial Times',
      sentiment: 'negative',
    },
    {
      title: `${companyName} Announces Strategic Partnership`,
      source: 'WSJ',
      sentiment: 'positive',
    },
    {
      title: `${companyName} CEO Discusses Growth Strategy`,
      source: 'Forbes',
      sentiment: 'neutral',
    },
    {
      title: `${companyName} Supply Chain Challenges Emerge`,
      source: 'Reuters',
      sentiment: 'negative',
    },
    {
      title: `${companyName} Expands into Emerging Markets`,
      source: 'Bloomberg',
      sentiment: 'positive',
    },
    {
      title: `Competition Intensifies for ${companyName}`,
      source: 'Barron\'s',
      sentiment: 'negative',
    }
  ];

  // Select 4-6 random news items
  const numItems = Math.floor(Math.random() * 3) + 4;
  const shuffled = [...newsTemplates].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numItems);

  return selected.map((item, index) => ({
    ...item,
    url: `https://example.com/news/${companyName.toLowerCase()}-${Date.now()}-${index}`,
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    relevanceScore: 0.5 + Math.random() * 0.5,
  }));
}