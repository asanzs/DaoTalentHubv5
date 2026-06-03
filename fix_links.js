const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/[locale]/university/page.tsx',
  'src/app/[locale]/university/dashboard/page.tsx',
  'src/app/[locale]/university/marketplace/page.tsx',
  'src/app/[locale]/university/teach/page.tsx',
  'src/app/[locale]/university/teach/apply/page.tsx',
  'src/app/[locale]/university/teach/studio/page.tsx',
  'src/app/[locale]/university/course/[id]/page.tsx'
];

filesToUpdate.forEach(file => {
  const p = path.join(process.cwd(), file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  
  // Add useLocale import if not present
  if (!content.includes('useLocale')) {
    if (content.includes('next-intl')) {
      content = content.replace(/import\s+\{([^}]+)\}\s+from\s+["']next-intl["'];/, (match, p1) => {
        return `import { ${p1}, useLocale } from "next-intl";`;
      });
    } else {
      content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { useLocale } from "next-intl";');
    }
  }

  // Insert const locale = useLocale(); inside the component
  content = content.replace(/export default function ([a-zA-Z0-9_]+)\([^)]*\)\s*\{/, (match) => {
    if (content.includes('const locale = useLocale();')) return match;
    return match + '\n  const locale = useLocale();';
  });
  
  // Replace absolute links, but avoid already formatted ones like `/${locale}`
  content = content.replace(/href="\/(?!(\$|es|en|zh|ru|ko))([^"]*)"/g, 'href={`/${locale}/$2`}');
  
  fs.writeFileSync(p, content, 'utf8');
  console.log('Updated ' + file);
});
