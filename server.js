import http from 'http';
import { addDays, addWeeks, subDays, format } from 'date-fns';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  const today = new Date();

  const response = {
    'add_6_days': format(addDays(today, 6), 'dd-MMM-yyyy'),
    'add_6_weeks': format(addWeeks(today, 6), 'dd-MMM-yyyy'),
    'subtract_187_days_from_12-Jan-2019': format(subDays(new Date('2019-01-12'), 187), 'dd-MMM-yyyy')
  };

  res.end(JSON.stringify(response));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
