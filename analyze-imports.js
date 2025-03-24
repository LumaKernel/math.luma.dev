const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all TypeScript files excluding .gen.ts(x) files
const files = execSync('find src -type f -name "*.ts" -o -name "*.tsx" | grep -v "\\.gen\\.ts" | grep -v "\\.gen\\.tsx"')
  .toString()
  .trim()
  .split('\n');

const results = {
  needsExtension: [],
  needsReactImport: []
};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  // Check for imports without extensions
  const importsWithoutExtension = lines.filter(line => {
    // Match import statements with relative paths but without extensions
    return line.match(/^import .+ from ['"](\.|@\/)[^'"]*['"]/i) && 
           !line.match(/^import .+ from ['"](\.|@\/)[^'"]*\.(ts|tsx|js|jsx)['"]/i);
  });
  
  if (importsWithoutExtension.length > 0) {
    results.needsExtension.push({
      file,
      imports: importsWithoutExtension
    });
  }
  
  // Check for .tsx files without React import
  if (file.endsWith('.tsx') && !content.includes('import React from "react"') && !content.includes("import React from 'react'")) {
    results.needsReactImport.push(file);
  }
});

console.log(`Files needing extension updates: ${results.needsExtension.length}`);
console.log(`Files needing React import: ${results.needsReactImport.length}`);

// Output detailed results to a file
fs.writeFileSync('import-analysis.json', JSON.stringify(results, null, 2));

console.log('Detailed results written to import-analysis.json');
