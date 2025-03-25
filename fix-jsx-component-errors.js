const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find files with Link JSX component errors
const findFilesWithLinkJSXComponentErrors = () => {
  try {
    // Look for files with Link JSX component errors
    const output = execSync('deno check --unstable-sloppy-imports **/*.{ts,tsx} | grep -i "Link.*cannot be used as a JSX component"')
      .toString()
      .trim();
    
    // Extract file paths from the output
    const filePathRegex = /file:\/\/\/([^:]+):/g;
    const filePaths = new Set();
    let match;
    while ((match = filePathRegex.exec(output)) !== null) {
      const filePath = match[1].replace('/Users/luma/ghq/github.com/LumaKernel/blogkit-next/', '');
      filePaths.add(filePath);
    }
    
    return Array.from(filePaths);
  } catch (error) {
    console.error('Error finding files with Link JSX component errors:', error.message);
    return [];
  }
};

// Fix JSX component errors in a file
const fixJSXComponentErrors = (filePath) => {
  console.log(`Checking ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already has a React import
  const hasReactImport = content.match(/import\s+React\s+from\s+['"]react['"]/);
  
  if (!hasReactImport) {
    // Add React import at the top of the file
    content = `import React from "react";\n${content}`;
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`  Added React import to ${filePath}`);
  } else {
    console.log(`  File already has React import: ${filePath}`);
  }
};

// Main function
const main = () => {
  const files = findFilesWithLinkJSXComponentErrors();
  console.log(`Found ${files.length} files with Link JSX component errors`);
  
  files.forEach(file => {
    fixJSXComponentErrors(file);
  });
  
  console.log('Done!');
};

main();
