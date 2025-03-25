#!/usr/bin/env -S deno run --allow-read --allow-write

// Script to rewrite TSX files that use FC<any> to use React.ComponentProps<"appropriate-element-type"> instead
// This improved version analyzes the component's JSX to determine the appropriate element type

import { walk } from "@std/fs/walk";
import { join } from "@std/path";
import { assertEquals } from "@std/assert";

// Function to find the root element type in a component
function findRootElementType(componentBody: string): string {
  // Default to "div" if we can't determine the element type
  let elementType = "div";
  
  // Remove any leading whitespace and newlines
  const trimmedBody = componentBody.trim();
  
  // Check for JSX fragments
  if (trimmedBody.startsWith("<>")) {
    return "div"; // Use div as a fallback for fragments
  }
  
  // Regular expression to match the opening tag of the root element
  // This handles both self-closing tags and regular tags
  const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)\s*[^>]*?(?:\/?>|\/>)/;
  const match = trimmedBody.match(tagRegex);
  
  if (match && match[1]) {
    elementType = match[1].toLowerCase();
    
    // Handle special cases
    if (elementType === "input") {
      return "input";
    } else if (elementType === "button") {
      return "button";
    } else if (elementType === "a") {
      return "a";
    } else if (elementType === "span") {
      return "span";
    } else if (elementType === "p") {
      return "p";
    } else if (elementType === "ul" || elementType === "ol") {
      return elementType;
    } else if (elementType === "li") {
      return "li";
    } else if (elementType === "table") {
      return "table";
    } else if (elementType === "tr") {
      return "tr";
    } else if (elementType === "td") {
      return "td";
    } else if (elementType === "th") {
      return "th";
    } else if (elementType === "form") {
      return "form";
    } else if (elementType === "label") {
      return "label";
    } else if (elementType === "select") {
      return "select";
    } else if (elementType === "option") {
      return "option";
    } else if (elementType === "textarea") {
      return "textarea";
    } else if (elementType === "img") {
      return "img";
    } else if (elementType === "h1" || elementType === "h2" || elementType === "h3" || 
               elementType === "h4" || elementType === "h5" || elementType === "h6") {
      return elementType;
    }
    
    // If it's a custom component (starts with uppercase), use div as fallback
    if (/^[A-Z]/.test(elementType)) {
      return "div";
    }
    
    return elementType;
  }
  
  return elementType;
}

// Function to process a file and rewrite FC<any> to React.ComponentProps<"appropriate-element-type">
async function processFile(filePath: string): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(filePath);
    let modified = false;
    
    // Test if the file contains FC<any>
    if (content.includes("FC<any>")) {
      console.log(`Processing ${filePath}`);
      
      // Regular expression to match component declarations using FC<any>
      // This captures the component name and the component body
      const fcAnyRegex = /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()([^)]*)\)/g;
      
      // Replace with the new format
      const newContent = content.replace(fcAnyRegex, (match, constPart, componentName, propsDecl, componentBody) => {
        const elementType = findRootElementType(componentBody);
        return `${constPart}${componentName} = (props: React.ComponentProps<"${elementType}">) => (${componentBody})`;
      });
      
      if (newContent !== content) {
        await Deno.writeTextFile(filePath, newContent);
        modified = true;
        console.log(`  Modified ${filePath}`);
      }
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
  
  // Test case 1: Component with div element
  const testCase1 = `
const Badge: FC<any> = (props) => (
  <div>
    {props.children}
  </div>
);`;
  
  const expected1 = `
const Badge = (props: React.ComponentProps<"div">) => (
  <div>
    {props.children}
  </div>
);`;
  
  const result1 = testCase1.replace(
    /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()([^)]*)\)/g,
    (match, constPart, componentName, propsDecl, componentBody) => {
      const elementType = findRootElementType(componentBody);
      return `${constPart}${componentName} = (props: React.ComponentProps<"${elementType}">) => (${componentBody})`;
    }
  );
  
  assertEquals(result1, expected1);
  console.log("Test 1 passed: Component with div element");
  
  // Test case 2: Component with a element
  const testCase2 = `
const Link: FC<any> = (props) => (
  <a href={props.href}>
    {props.children}
  </a>
);`;
  
  const expected2 = `
const Link = (props: React.ComponentProps<"a">) => (
  <a href={props.href}>
    {props.children}
  </a>
);`;
  
  const result2 = testCase2.replace(
    /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()([^)]*)\)/g,
    (match, constPart, componentName, propsDecl, componentBody) => {
      const elementType = findRootElementType(componentBody);
      return `${constPart}${componentName} = (props: React.ComponentProps<"${elementType}">) => (${componentBody})`;
    }
  );
  
  assertEquals(result2, expected2);
  console.log("Test 2 passed: Component with a element");
  
  // Test case 3: Component with fragment
  const testCase3 = `
const Fragment: FC<any> = (props) => (
  <>
    {props.children}
  </>
);`;
  
  const expected3 = `
const Fragment = (props: React.ComponentProps<"div">) => (
  <>
    {props.children}
  </>
);`;
  
  const result3 = testCase3.replace(
    /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()([^)]*)\)/g,
    (match, constPart, componentName, propsDecl, componentBody) => {
      const elementType = findRootElementType(componentBody);
      return `${constPart}${componentName} = (props: React.ComponentProps<"${elementType}">) => (${componentBody})`;
    }
  );
  
  assertEquals(result3, expected3);
  console.log("Test 3 passed: Component with fragment");
  
  // Test case 4: Component with input element
  const testCase4 = `
const Input: FC<any> = (props) => (
  <input type="text" {...props} />
);`;
  
  const expected4 = `
const Input = (props: React.ComponentProps<"input">) => (
  <input type="text" {...props} />
);`;
  
  const result4 = testCase4.replace(
    /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()([^)]*)\)/g,
    (match, constPart, componentName, propsDecl, componentBody) => {
      const elementType = findRootElementType(componentBody);
      return `${constPart}${componentName} = (props: React.ComponentProps<"${elementType}">) => (${componentBody})`;
    }
  );
  
  assertEquals(result4, expected4);
  console.log("Test 4 passed: Component with input element");
  
  // Test case 5: Component with custom component (should default to div)
  const testCase5 = `
const CustomWrapper: FC<any> = (props) => (
  <CustomComponent>
    {props.children}
  </CustomComponent>
);`;
  
  const expected5 = `
const CustomWrapper = (props: React.ComponentProps<"div">) => (
  <CustomComponent>
    {props.children}
  </CustomComponent>
);`;
  
  const result5 = testCase5.replace(
    /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()([^)]*)\)/g,
    (match, constPart, componentName, propsDecl, componentBody) => {
      const elementType = findRootElementType(componentBody);
      return `${constPart}${componentName} = (props: React.ComponentProps<"${elementType}">) => (${componentBody})`;
    }
  );
  
  assertEquals(result5, expected5);
  console.log("Test 5 passed: Component with custom component");
}

// Run tests first
runTests();

// Then run the main function
console.log("\nStarting file processing:");
main();
