#!/usr/bin/env -S deno run --allow-read --allow-write

import * as path from "@std/path";
import { assert, assertEquals } from "@std/assert";

// Types
type ImportMap = Record<string, string>;

// Tests
function runTests() {
  console.log("Running tests...");
  
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
  assertEquals(importsToFix, ['./foo', '@/lib/bar'], 'Test 1 failed: Should detect imports without extensions');
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
  
  assertEquals(fixedImports, expectedFixedImports, 'Test 2 failed: Should fix imports without extensions');
  console.log('Test 2 passed: Correctly fixed imports without extensions');
  
  // Test 3: Fix imports with incorrect extensions
  const testIncorrectExtension = `
import Term from "@/components/term/TermServer.tsx";
import TermServer from "@/components/term/TermServer.tsx";
  `;
  
  const incorrectImportsToFix = findIncorrectExtensions(testIncorrectExtension, {
    '@/components/term/Term.ts': '@/components/term/TermServer.tsx'
  });
  
  assertEquals(incorrectImportsToFix, ['@/components/term/Term.ts'], 'Test 3 failed: Should detect incorrect extensions');
  console.log('Test 3 passed: Correctly detected incorrect extensions');
  
  // Test 4: Fix imports with incorrect extensions
  const fixedIncorrectImports = fixImportsInContent(testIncorrectExtension, {
    '@/components/term/Term.ts': '@/components/term/TermServer.tsx'
  });
  
  const expectedFixedIncorrectImports = `
import Term from "@/components/term/TermServer.tsx";
import TermServer from "@/components/term/TermServer.tsx";
  `;
  
  assertEquals(fixedIncorrectImports, expectedFixedIncorrectImports, 'Test 4 failed: Should fix imports with incorrect extensions');
  console.log('Test 4 passed: Correctly fixed imports with incorrect extensions');
  
  console.log('All tests passed!');
}

// Find imports without extensions in a string
function findImportsWithoutExtensions(content: string): string[] {
  const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const imports: string[] = [];
  let match: RegExpExecArray | null;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Skip imports that already have extensions
    if (importPath.endsWith('.ts') || 
        importPath.endsWith('.tsx') || 
        importPath.endsWith('.js') || 
        importPath.endsWith('.jsx') || 
        importPath.endsWith('.css') || 
        importPath.endsWith('.json')) {
      continue;
    }
    
    // Only include relative imports and @/ imports
    if (importPath.startsWith('./') || 
        importPath.startsWith('../') || 
        importPath.startsWith('@/')) {
      imports.push(importPath);
    }
  }
  
  return imports;
}

// Find imports with incorrect extensions
function findIncorrectExtensions(content: string, correctPathMap: ImportMap): string[] {
  const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const incorrectImports: string[] = [];
  let match: RegExpExecArray | null;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Check if this import path is in our correction map
    if (correctPathMap[importPath]) {
      incorrectImports.push(importPath);
    }
  }
  
  return incorrectImports;
}

// Fix imports in content
function fixImportsInContent(content: string, importMap: ImportMap): string {
  let result = content;
  
  for (const [importPath, newImportPath] of Object.entries(importMap)) {
    const importRegex = new RegExp(`(import\\s+(?:[\\w\\s{},*]+\\s+from\\s+)?['"])${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g');
    result = result.replace(importRegex, `$1${newImportPath}$2`);
  }
  
  return result;
}

// Find all TypeScript files
async function findTsFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  
  for await (const entry of Deno.readDir(dir)) {
    const entryPath = path.join(dir, entry.name);
    
    if (entry.isDirectory) {
      // Skip node_modules and .git directories
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        results.push(...await findTsFiles(entryPath));
      }
    } else if (entry.isFile && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      // Skip .gen.ts files
      if (!entry.name.endsWith('.gen.ts') && !entry.name.endsWith('.gen.tsx')) {
        results.push(entryPath);
      }
    }
  }
  
  return results;
}

// Check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await Deno.stat(filePath);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}

// Fix imports in a file
async function fixImportsInFile(filePath: string, correctPathMap: ImportMap): Promise<void> {
  console.log(`Checking ${filePath}...`);
  
  const content = await Deno.readTextFile(filePath);
  const importsToFix = findImportsWithoutExtensions(content);
  const incorrectImportsToFix = findIncorrectExtensions(content, correctPathMap);
  
  if (importsToFix.length === 0 && incorrectImportsToFix.length === 0) {
    console.log(`  No changes needed for ${filePath}`);
    return;
  }
  
  const importMap: ImportMap = {};
  let modified = false;
  
  // Fix imports without extensions
  for (const importPath of importsToFix) {
    // Try to determine the correct extension
    const possibleExtensions = ['.ts', '.tsx'];
    let correctExtension = '';
    
    // For absolute imports, we need to resolve from the project root
    let importedFilePath: string;
    if (importPath.startsWith('@/')) {
      // For @/ imports, resolve from project root
      const relativePath = importPath.substring(2);
      importedFilePath = path.join(Deno.cwd(), 'src', relativePath);
    } else if (importPath.startsWith('/')) {
      importedFilePath = path.join(Deno.cwd(), importPath);
    } else {
      importedFilePath = path.resolve(path.dirname(filePath), importPath);
    }
    
    for (const ext of possibleExtensions) {
      if (await fileExists(importedFilePath + ext)) {
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
  
  // Fix imports with incorrect extensions
  for (const importPath of incorrectImportsToFix) {
    importMap[importPath] = correctPathMap[importPath];
    modified = true;
    console.log(`  Will change import of ${importPath} to ${correctPathMap[importPath]}`);
  }
  
  if (modified) {
    // Fix imports
    const fixedContent = fixImportsInContent(content, importMap);
    await Deno.writeTextFile(filePath, fixedContent);
    console.log(`  Updated ${filePath}`);
  } else {
    console.log(`  No changes made to ${filePath}`);
  }
}

// Main function
async function main() {
  // Run tests first
  runTests();
  
  const rootDir = Deno.cwd();
  console.log(`Searching for TypeScript files in ${rootDir}...`);
  
  const tsFiles = await findTsFiles(rootDir);
  console.log(`Found ${tsFiles.length} TypeScript files`);
  
  // Define a map of incorrect imports to their correct paths
  const correctPathMap: ImportMap = {
    '@/components/term/Term.ts': '@/components/term/TermServer.tsx',
    '@/components/term.ts': '@/components/term/TermServer.tsx',
    '@/components/h1.ts': '@/components/heading/H1.tsx',
    '@/components/path-breadcrumbs.ts': '@/components/PathBreadcrumbs.tsx',
    '@/components/series-nav.ts': '@/components/series/SeriesNav.tsx',
    '@/components/layouts/main-layout.ts': '@/components/layouts/MainLayout.tsx',
    '@/components/show-error.ts': '@/components/show-error.tsx',
    '@/components/button.ts': '@/components/button.tsx'
  };
  
  // Process each file
  for (const filePath of tsFiles) {
    await fixImportsInFile(filePath, correctPathMap);
  }
  
  console.log('Done!');
}

// Run the main function
main().catch(console.error);
