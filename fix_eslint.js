const fs = require('fs');

let p = 'src/app/dashboard/page.tsx';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/La empresa "Acme Corp"/g, 'La empresa &quot;Acme Corp&quot;');
c = c.replace(/\/\/ Código enviado por el desarrollador/g, '{/* Código enviado por el desarrollador */}');
c = c.replace(/\/\/ TODO: Implement 2FA next sprint/g, '{/* TODO: Implement 2FA next sprint */}');
c = c.replace(/Settings, Users, /g, '');
fs.writeFileSync(p, c);

p = 'src/app/page.tsx';
c = fs.readFileSync(p, 'utf8');
c = c.replace(/su "Match Score"/g, 'su &quot;Match Score&quot;');
c = c.replace(/const \[isSearching, setIsSearching\] = useState\(false\);/g, '');
c = c.replace(/onClick=\{.. => setIsSearching\(true\)\}/g, '');
c = c.replace(/ShieldCheck, /g, '');
fs.writeFileSync(p, c);

p = 'src/app/how-it-works/page.tsx';
c = fs.readFileSync(p, 'utf8');
c = c.replace(/ShieldCheck, /g, '');
c = c.replace(/, ArrowRight/g, '');
fs.writeFileSync(p, c);

p = 'src/app/pricing/page.tsx';
c = fs.readFileSync(p, 'utf8');
c = c.replace(/Shield, /g, '');
c = c.replace(/const \[isAnnual, setIsAnnual\] = useState\(true\);/g, '');
fs.writeFileSync(p, c);

p = 'src/app/academy/page.tsx';
c = fs.readFileSync(p, 'utf8');
c = c.replace(/Award, /g, '');
fs.writeFileSync(p, c);

console.log("ESLint fixes applied");
