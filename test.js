import { readFileSync } from 'fs';
const appCode = readFileSync('./src/App.jsx', 'utf8');
const rechartsMatch = appCode.match(/import\s+{([^}]+)}\s+from\s+'recharts'/);
console.log('recharts match:', rechartsMatch ? rechartsMatch[1] : null);
