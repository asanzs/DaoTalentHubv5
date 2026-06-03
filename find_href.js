const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((line, i) => {
        if (line.includes('href="#"') || line.includes("href='#'") || line.includes('href={"#"}')) {
          console.log(`${p}:${i+1}: ${line.trim()}`);
        }
      });
    }
  });
}

walk('src');
