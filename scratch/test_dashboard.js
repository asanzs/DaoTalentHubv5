const http = require('http');

setTimeout(() => {
  http.get('http://localhost:3000/es/dashboard', (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      if (res.statusCode !== 200) {
        // Find the error text in Next.js error overlay
        const match = data.match(/<title>([^<]+)<\/title>/);
        console.log('Error Title:', match ? match[1] : 'No title found');
        
        // Find specific next.js error string
        const errorMatch = data.match(/"message":"([^"]+)"/);
        console.log('Error Message:', errorMatch ? errorMatch[1] : 'No error message found');
      } else {
        console.log('Dashboard loads fine locally with status 200.');
      }
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('Error fetching:', err);
    process.exit(1);
  });
}, 5000); // Wait 5 seconds for dev server to boot
