const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all TypeScript files
const findTsFiles = (dir) => {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (file !== 'node_modules' && file !== '.git') {
        results.push(...findTsFiles(filePath));
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      // Skip .gen.ts files
      if (!file.endsWith('.gen.ts') && !file.endsWith('.gen.tsx')) {
        results.push(filePath);
      }
    }
  }
  
  return results;
};

// Check if a file has imports that need fixing
const hasImportsToFix = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for relative imports
  const relativeImportRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]\.\.?\/[^'"]+['"]/g;
  
  // Check for imports without .ts or .tsx extension
  const noExtensionImportRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([@\w\/.]+)(?!\.ts|\.tsx)['"]/g;
  
  return relativeImportRegex.test(content) || noExtensionImportRegex.test(content);
};

// Fix imports in a file
const fixImports = (filePath) => {
  console.log(`Checking ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let modified = false;
  
  // Fix relative imports
  const relativeImportRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"](\.\.\/?[^'"]+)['"]/g;
  let match;
  
  // Replace relative imports with extensions
  while ((match = relativeImportRegex.exec(originalContent)) !== null) {
    const importPath = match[1];
    
    // Check if the import path already has a .ts or .tsx extension
    if (!importPath.endsWith('.ts') && !importPath.endsWith('.tsx')) {
      // Try to determine the correct extension
      const possibleExtensions = ['.ts', '.tsx'];
      let correctExtension = '';
      
      // Get the absolute path of the imported file
      const importedFilePath = path.resolve(path.dirname(filePath), importPath);
      
      for (const ext of possibleExtensions) {
        if (fs.existsSync(importedFilePath + ext)) {
          correctExtension = ext;
          break;
        }
      }
      
      if (correctExtension) {
        // Replace the import statement with one that includes the extension
        const newImportPath = importPath + correctExtension;
        const newImport = match[0].replace(importPath, newImportPath);
        content = content.replace(match[0], newImport);
        modified = true;
        console.log(`  Added ${correctExtension} extension to import of ${importPath}`);
      }
    }
  }
  
  // Fix imports without extensions
  const noExtensionImportRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([@\w\/.]+)(?!\.ts|\.tsx)['"]/g;
  
  // Reset the regex
  noExtensionImportRegex.lastIndex = 0;
  
  // Replace imports without extensions
  while ((match = noExtensionImportRegex.exec(originalContent)) !== null) {
    const importPath = match[1];
    
    // Skip node_modules imports and imports that already have extensions
    if (importPath.startsWith('@') || importPath.includes('node_modules') || 
        importPath.endsWith('.js') || importPath.endsWith('.jsx') || 
        importPath.endsWith('.css') || importPath.endsWith('.json')) {
      continue;
    }
    
    // Try to determine the correct extension
    const possibleExtensions = ['.ts', '.tsx'];
    let correctExtension = '';
    
    // For absolute imports, we need to resolve from the project root
    let importedFilePath;
    if (importPath.startsWith('/')) {
      importedFilePath = path.join(process.cwd(), importPath);
    } else {
      importedFilePath = path.resolve(path.dirname(filePath), importPath);
    }
    
    for (const ext of possibleExtensions) {
      if (fs.existsSync(importedFilePath + ext)) {
        correctExtension = ext;
        break;
      }
    }
    
    if (correctExtension) {
      // Replace the import statement with one that includes the extension
      const newImportPath = importPath + correctExtension;
      const newImport = match[0].replace(importPath, newImportPath);
      content = content.replace(match[0], newImport);
      modified = true;
      console.log(`  Added ${correctExtension} extension to import of ${importPath}`);
    }
  }
  
  if (modified) {
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`  Updated ${filePath}`);
  } else {
    console.log(`  No changes made to ${filePath}`);
  }
};

// Main function
const main = () => {
  const rootDir = process.cwd();
  console.log(`Searching for TypeScript files in ${rootDir}...`);
  
  const tsFiles = findTsFiles(rootDir);
  console.log(`Found ${tsFiles.length} TypeScript files`);
  
  const filesWithImportsToFix = tsFiles.filter(hasImportsToFix);
  console.log(`Found ${filesWithImportsToFix.length} files with imports to fix`);
  
  for (const filePath of filesWithImportsToFix) {
    fixImports(filePath);
  }
  
  console.log('Done!');
};

main();
