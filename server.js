import http from 'http';
import { addDays, addWeeks, subDays, format } from 'date-fns';
import { URL } from 'url';

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse the URL and query parameters
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  
  // Set content type to JSON
  res.setHeader('Content-Type', 'application/json');

  // Only handle the calendar endpoint
  if (path === '/calendar' || path === '/') {
    const today = new Date();
    
    const response = {
      'add_6_days': format(addDays(today, 6), 'dd-MMM-yyyy'),
      'add_6_weeks': format(addWeeks(today, 6), 'dd-MMM-yyyy'),
      'subtract_187_days_from_12-Jan-2019': format(subDays(new Date('2019-01-12'), 187), 'dd-MMM-yyyy')
    };
    
    res.writeHead(200);
    res.end(JSON.stringify(response));
  } else {
    // 404 for unknown routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
