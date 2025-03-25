// Script to rewrite TSX files that use FC<any> to use React.ComponentProps<"div"> instead
const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx files in a directory
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to process a file and rewrite FC<any> to React.ComponentProps<"div">
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Test if the file contains FC<any>
  if (content.includes('FC<any>')) {
    console.log(`Processing ${filePath}`);
    
    // Regular expression to match component declarations using FC<any>
    const fcAnyRegex = /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()/g;
    
    // Replace with the new format
    const newContent = content.replace(fcAnyRegex, '$1$2 = (props: React.ComponentProps<"div">) => (');
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      modified = true;
      console.log(`  Modified ${filePath}`);
    }
  }
  
  return modified;
}

// Main function
function main() {
  const srcDir = path.join(__dirname, 'src');
  const tsxFiles = findTsxFiles(srcDir);
  
  console.log(`Found ${tsxFiles.length} TSX files`);
  
  let modifiedCount = 0;
  
  tsxFiles.forEach(file => {
    if (processFile(file)) {
      modifiedCount++;
    }
  });
  
  console.log(`Modified ${modifiedCount} files`);
}

// Run tests
function runTests() {
  // Test case 1: Basic FC<any> component
  const testCase1 = `
const Badge: FC<any> = (props) => (
  <>
    {props.children}
  </>
);`;
  
  const expected1 = `
const Badge = (props: React.ComponentProps<"div">) => (
  <>
    {props.children}
  </>
);`;
  
  const result1 = testCase1.replace(
    /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()/g, 
    '$1$2 = (props: React.ComponentProps<"div">) => ('
  );
  
  console.log('Test 1 passed:', result1 === expected1);
  
  // Test case 2: Component with different variable name
  const testCase2 = `
const CustomComponent: FC<any> = (props) => (
  <div>
    {props.children}
  </div>
);`;
  
  const expected2 = `
const CustomComponent = (props: React.ComponentProps<"div">) => (
  <div>
    {props.children}
  </div>
);`;
  
  const result2 = testCase2.replace(
    /(const\s+)(\w+)(\s*:\s*FC<any>\s*=\s*\(props\)\s*=>\s*\()/g, 
    '$1$2 = (props: React.ComponentProps<"div">) => ('
  );
  
  console.log('Test 2 passed:', result2 === expected2);
}

// Run tests first
console.log('Running tests:');
runTests();

// Then run the main function
console.log('\nStarting file processing:');
main();
