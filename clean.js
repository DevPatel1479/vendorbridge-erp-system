const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'app', 'quotations');

if (fs.existsSync(dir)) {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log('Successfully deleted ' + dir);
} else {
  console.log('Directory not found: ' + dir);
}
