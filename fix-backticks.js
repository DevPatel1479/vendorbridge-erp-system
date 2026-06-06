const fs = require('fs');
const path = require('path');

const filesToFix = [
  'app/(main)/quotations/page.tsx',
  'app/(main)/quotations/comparison/page.tsx',
  'app/(main)/approvals/page.tsx',
  'app/(main)/po-invoice/page.tsx'
];

filesToFix.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Replace \` with `
    content = content.replace(/\\`/g, '`');
    // Replace \${ with ${
    content = content.replace(/\\\$\{/g, '${');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed', relPath);
  }
});
