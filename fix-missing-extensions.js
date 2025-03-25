const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const assert = require('assert');

// Tests
const runTests = () => {
  console.log('Running tests...');
  
  // Test 1: Detect imports without extensions
  const testImportWithoutExtension = `
import { foo } from "./foo";
import { bar } from "@/lib/bar";
import React from "react";
import { baz } from "external-lib";
import { qux } from "./qux.ts";
  `;
  
  const importsToFix = findImportsWithoutExtensions(testImportWithoutExtension);
  console.log('Test 1 imports to fix:', importsToFix);
  console.log('Expected:', ['./foo', '@/lib/bar']);
  assert.deepStrictEqual(importsToFix, ['./foo', '@/lib/bar'], 'Test 1 failed: Should detect imports without extensions');
  console.log('Test 1 passed: Correctly detected imports without extensions');
  
  // Test 2: Fix imports without extensions
  const fixedImports = fixImportsInContent(testImportWithoutExtension, {
    './foo': './foo.ts',
    '@/lib/bar': '@/lib/bar.ts'
  });
  
  const expectedFixedImports = `
import { foo } from "./foo.ts";
import { bar } from "@/lib/bar.ts";
import React from "react";
import { baz } from "external-lib";
import { qux } from "./qux.ts";
  `;
  
  assert.strictEqual(fixedImports, expectedFixedImports, 'Test 2 failed: Should fix imports without extensions');
  console.log('Test 2 passed: Correctly fixed imports without extensions');
  
  // Test 3: GaussElim.tsx specific test
  const gaussElimImport = `import {
  numberRational,
  numberToRational,
} from "@/lib/math-algebra/rational";`;
  
  const gaussElimImportsToFix = findImportsWithoutExtensions(gaussElimImport);
  assert.deepStrictEqual(gaussElimImportsToFix, ['@/lib/math-algebra/rational'], 'Test 3 failed: Should detect GaussElim.tsx imports');
  console.log('Test 3 passed: Correctly detected GaussElim.tsx imports');
  
  console.log('All tests passed!');
};

// Find imports without extensions in a string
const findImportsWithoutExtensions = (content) => {
  const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const imports = [];
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    console.log('Found import:', importPath);
    
    // Skip imports that already have extensions
    if (importPath.endsWith('.ts') || 
        importPath.endsWith('.tsx') || 
        importPath.endsWith('.js') || 
        importPath.endsWith('.jsx') || 
        importPath.endsWith('.css') || 
        importPath.endsWith('.json')) {
      console.log('  Skipping: Has extension');
      continue;
    }
    
    // Only include relative imports and @/ imports
    if (importPath.startsWith('./') || 
        importPath.startsWith('../') || 
        importPath.startsWith('@/')) {
      console.log('  Adding to fix list');
      imports.push(importPath);
    } else {
      console.log('  Skipping: External library or module');
      continue;
    }
  }
  
  return imports;
};

// Fix imports in content
const fixImportsInContent = (content, importMap) => {
  let result = content;
  
  for (const [importPath, newImportPath] of Object.entries(importMap)) {
    const importRegex = new RegExp(`(import\\s+(?:[\\w\\s{},*]+\\s+from\\s+)?['"])${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g');
    result = result.replace(importRegex, `$1${newImportPath}$2`);
  }
  
  return result;
};

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
  return findImportsWithoutExtensions(content).length > 0;
};

// Fix imports in a file
const fixImportsInFile = (filePath) => {
  console.log(`Checking ${filePath}...`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const importsToFix = findImportsWithoutExtensions(content);
  
  if (importsToFix.length === 0) {
    console.log(`  No changes needed for ${filePath}`);
    return;
  }
  
  const importMap = {};
  let modified = false;
  
  for (const importPath of importsToFix) {
    // Try to determine the correct extension
    const possibleExtensions = ['.ts', '.tsx'];
    let correctExtension = '';
    
    // For absolute imports, we need to resolve from the project root
    let importedFilePath;
    if (importPath.startsWith('@/')) {
      // For @/ imports, resolve from project root
      const relativePath = importPath.substring(2);
      importedFilePath = path.join(process.cwd(), 'src', relativePath);
    } else if (importPath.startsWith('/')) {
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
      // Add to import map
      importMap[importPath] = importPath + correctExtension;
      modified = true;
      console.log(`  Will add ${correctExtension} extension to import of ${importPath}`);
    }
  }
  
  if (modified) {
    // Fix imports
    const fixedContent = fixImportsInContent(content, importMap);
    fs.writeFileSync(filePath, fixedContent);
    console.log(`  Updated ${filePath}`);
  } else {
    console.log(`  No changes made to ${filePath}`);
  }
};

// Main function
const main = () => {
  // Run tests first
  try {
    runTests();
  } catch (error) {
    console.error('Tests failed:', error.message);
    process.exit(1);
  }
  
  const rootDir = process.cwd();
  console.log(`Searching for TypeScript files in ${rootDir}...`);
  
  const tsFiles = findTsFiles(rootDir);
  console.log(`Found ${tsFiles.length} TypeScript files`);
  
  const filesWithImportsToFix = tsFiles.filter(hasImportsToFix);
  console.log(`Found ${filesWithImportsToFix.length} files with imports to fix`);
  
  // Test with GaussElim.tsx
  const gaussElimPath = path.join(rootDir, 'src/contents/linear-algebra/basics/GaussElim.tsx');
  if (fs.existsSync(gaussElimPath)) {
    console.log('Testing with GaussElim.tsx...');
    const content = fs.readFileSync(gaussElimPath, 'utf8');
    const importsToFix = findImportsWithoutExtensions(content);
    console.log(`GaussElim.tsx has ${importsToFix.length} imports to fix:`, importsToFix);
  }
  
  for (const filePath of filesWithImportsToFix) {
    fixImportsInFile(filePath);
  }
  
  console.log('Done!');
};

main();
