import fs from 'fs';

async function updateStats() {
  try {
    const response = await fetch('https://api.github.com/repos/sarva-20/heimdall-mcp');
    const data = await response.json();
    
    const stats = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      watchers: data.watchers_count,
      lastUpdated: new Date().toISOString()
    };
    
    fs.writeFileSync('public/stats.json', JSON.stringify(stats, null, 2));
    console.log('✓ Stats updated:', stats);
  } catch (error) {
    console.error('✗ Error updating stats:', error);
  }
}

updateStats();
