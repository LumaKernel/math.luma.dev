const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Find files with duplicate React imports
const findDuplicateReactImports = () => {
  const output = execSync(
    'grep -l "import React" --include="*.tsx" -r src/contents/linear-algebra/basics/',
  )
    .toString()
    .trim()
    .split("\n");

  return output;
};

// Fix duplicate React imports in a file
const fixDuplicateReactImports = (filePath) => {
  console.log(`Checking ${filePath}...`);

  let content = fs.readFileSync(filePath, "utf8");

  // Count React imports
  const reactImportCount = (content.match(/import React/g) || []).length;

  if (reactImportCount > 1) {
    console.log(`  Found ${reactImportCount} React imports, fixing...`);

    // Keep only the first React import and remove others
    // First, find all import statements with React
    const reactImports = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("import React")) {
        reactImports.push({ line: i, text: lines[i] });
      }
    }

    // Keep the first import that has React from "react"
    let keptImport = null;
    for (const imp of reactImports) {
      if (
        imp.text.includes('from "react"') || imp.text.includes("from 'react'")
      ) {
        keptImport = imp;
        break;
      }
    }

    // If no import with from "react" found, keep the first one
    if (!keptImport && reactImports.length > 0) {
      keptImport = reactImports[0];
    }

    // Remove all other React imports
    if (keptImport) {
      for (let i = reactImports.length - 1; i >= 0; i--) {
        const imp = reactImports[i];
        if (imp.line !== keptImport.line) {
          lines.splice(imp.line, 1);
        }
      }

      // Write the updated content back to the file
      fs.writeFileSync(filePath, lines.join("\n"));
      console.log(`  Fixed duplicate React imports in ${filePath}`);
    }
  } else {
    console.log(`  No duplicate React imports found in ${filePath}`);
  }
};

// Main function
const main = () => {
  const files = findDuplicateReactImports();
  console.log(`Found ${files.length} files with React imports`);

  files.forEach((file) => {
    fixDuplicateReactImports(file);
  });

  console.log("Done!");
};

main();
