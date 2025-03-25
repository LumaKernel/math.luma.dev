#!/usr/bin/env -S deno run --allow-read --allow-write

// Script to fix React.ComponentProps types to match the actual element being rendered
// This script finds components that use React.ComponentProps<"div"> but are actually rendering a different element

import { walk } from "https://deno.land/std@0.220.1/fs/walk.ts";
import { join } from "https://deno.land/std@0.220.1/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.220.1/assert/mod.ts";

// Function to find the actual element type being rendered in a component
function findActualElementType(componentBody: string): string | null {
  // Check for JSX fragments with an element inside
  const fragmentRegex = /<>\s*<([a-z][a-z0-9]*)\s/;
  const fragmentMatch = componentBody.match(fragmentRegex);
  if (fragmentMatch && fragmentMatch[1]) {
    return fragmentMatch[1];
  }
  
  // Check for direct element rendering
  const elementRegex = /^\s*<([a-z][a-z0-9]*)\s/;
  const elementMatch = componentBody.match(elementRegex);
  if (elementMatch && elementMatch[1]) {
    return elementMatch[1];
  }
  
  return null;
}

// Function to process a file and fix React.ComponentProps types
async function processFile(filePath: string): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(filePath);
    let modified = false;
    
    // Regular expression to match component declarations using React.ComponentProps<"div">
    // This captures the component name, props declaration, and component body
    const componentPropsRegex = /(const\s+)(\w+)(\s*=\s*\(props:\s*React\.ComponentProps<")([^"]+)(">)\s*\)\s*=>\s*\(([^)]*)\)/g;
    
    // Replace with the correct element type
    const newContent = content.replace(componentPropsRegex, (match, constPart, componentName, propsStart, elementType, propsEnd, componentBody) => {
      const actualElementType = findActualElementType(componentBody);
      
      // If we found an actual element type and it's different from the declared type
      if (actualElementType && actualElementType !== elementType) {
        console.log(`  In ${componentName}: Changing React.ComponentProps<"${elementType}"> to React.ComponentProps<"${actualElementType}">`);
        return `${constPart}${componentName}${propsStart}${actualElementType}${propsEnd}) => (${componentBody})`;
      }
      
      // Otherwise, keep the original
      return match;
    });
    
    if (newContent !== content) {
      await Deno.writeTextFile(filePath, newContent);
      modified = true;
      console.log(`  Modified ${filePath}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Main function
async function main() {
  const srcDir = join(Deno.cwd(), "src");
  let tsxFiles: string[] = [];
  
  // Find all .tsx files in the src directory
  for await (const entry of walk(srcDir, { exts: [".tsx"] })) {
    tsxFiles.push(entry.path);
  }
  
  console.log(`Found ${tsxFiles.length} TSX files`);
  
  let modifiedCount = 0;
  
  for (const file of tsxFiles) {
    if (await processFile(file)) {
      modifiedCount++;
    }
  }
  
  console.log(`Modified ${modifiedCount} files`);
}

// Run tests
function runTests() {
  console.log("Running tests:");
  
  // Test case 1: Component with div element (no change needed)
  const testCase1 = `
const Badge = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
  </>
);`;
  
  const expected1 = `
const Badge = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
  </>
);`;
  
  const result1 = testCase1.replace(
    /(const\s+)(\w+)(\s*=\s*\(props:\s*React\.ComponentProps<")([^"]+)(">)\s*\)\s*=>\s*\(([^)]*)\)/g,
    (match, constPart, componentName, propsStart, elementType, propsEnd, componentBody) => {
      const actualElementType = findActualElementType(componentBody);
      if (actualElementType && actualElementType !== elementType) {
        return `${constPart}${componentName}${propsStart}${actualElementType}${propsEnd}) => (${componentBody})`;
      }
      return match;
    }
  );
  
  assertEquals(result1, expected1);
  console.log("Test 1 passed: Component with div element (no change)");
  
  // Test case 2: Component with span element but using div type
  const testCase2 = `
const Badge = (props: React.ComponentProps<"div">) => (
  <>
    <span {...props} />
  </>
);`;
  
  const expected2 = `
const Badge = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
  </>
);`;
  
  const result2 = testCase2.replace(
    /(const\s+)(\w+)(\s*=\s*\(props:\s*React\.ComponentProps<")([^"]+)(">)\s*\)\s*=>\s*\(([^)]*)\)/g,
    (match, constPart, componentName, propsStart, elementType, propsEnd, componentBody) => {
      const actualElementType = findActualElementType(componentBody);
      if (actualElementType && actualElementType !== elementType) {
        return `${constPart}${componentName}${propsStart}${actualElementType}${propsEnd}) => (${componentBody})`;
      }
      return match;
    }
  );
  
  assertEquals(result2, expected2);
  console.log("Test 2 passed: Component with span element but using div type");
  
  // Test case 3: Component with pre element but using div type
  const testCase3 = `
const Pre = (props: React.ComponentProps<"div">) => (
  <>
    <pre {...props} />
  </>
);`;
  
  const expected3 = `
const Pre = (props: React.ComponentProps<"pre">) => (
  <>
    <pre {...props} />
  </>
);`;
  
  const result3 = testCase3.replace(
    /(const\s+)(\w+)(\s*=\s*\(props:\s*React\.ComponentProps<")([^"]+)(">)\s*\)\s*=>\s*\(([^)]*)\)/g,
    (match, constPart, componentName, propsStart, elementType, propsEnd, componentBody) => {
      const actualElementType = findActualElementType(componentBody);
      if (actualElementType && actualElementType !== elementType) {
        return `${constPart}${componentName}${propsStart}${actualElementType}${propsEnd}) => (${componentBody})`;
      }
      return match;
    }
  );
  
  assertEquals(result3, expected3);
  console.log("Test 3 passed: Component with pre element but using div type");
}

// Run tests first
runTests();

// Then run the main function
console.log("\nStarting file processing:");
main();
