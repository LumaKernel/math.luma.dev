const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find files with imports from components/lib
const findFilesWithLibImports = () => {
  try {
    // Look for files that import from components/lib
    const output = execSync('grep -l "@/components/lib" --include="*.ts*" -r src/')
      .toString()
      .trim()
      .split('\n')
      .filter(line => line.trim() !== '');
    
    return output;
  } catch (error) {
    console.error('Error finding files with lib imports:', error.message);
    return [];
  }
};

// Fix lib imports in a file
const fixLibImports = (filePath) => {
  console.log(`Checking ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace @/components/lib with @/lib
  const originalContent = content;
  content = content.replace(/@\/components\/lib\//g, '@/lib/');
  
  if (content !== originalContent) {
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`  Updated lib imports in ${filePath}`);
  } else {
    console.log(`  No lib imports to update in ${filePath}`);
  }
};

// Main function
const main = () => {
  const files = findFilesWithLibImports();
  console.log(`Found ${files.length} files with lib imports`);
  
  files.forEach(file => {
    fixLibImports(file);
  });
  
  console.log('Done!');
};

main();
