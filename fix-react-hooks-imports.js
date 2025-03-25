const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Find files with React hooks usage but missing imports
const findFilesWithHooksIssues = () => {
  // Look for files that use React hooks but don't import them
  const output = execSync(
    'grep -l "\\(useState\\|useMemo\\|useCallback\\|useEffect\\|useRef\\)" --include="*.tsx" -r src/contents/linear-algebra/basics/',
  )
    .toString()
    .trim()
    .split("\n");

  return output;
};

// Fix React hooks imports in a file
const fixReactHooksImports = (filePath) => {
  console.log(`Checking ${filePath}...`);

  let content = fs.readFileSync(filePath, "utf8");

  // Check if the file uses React hooks
  const usesUseState = content.includes("useState");
  const usesUseMemo = content.includes("useMemo");
  const usesUseCallback = content.includes("useCallback");
  const usesUseEffect = content.includes("useEffect");
  const usesUseRef = content.includes("useRef");

  // If any hooks are used, check if they're imported
  if (
    usesUseState || usesUseMemo || usesUseCallback || usesUseEffect ||
    usesUseRef
  ) {
    // Check if the hooks are already imported from 'react'
    const hasReactImport = content.match(/import React(,|\s+from)/);
    const hasHooksImport = content.match(
      /import\s+{[^}]*\b(useState|useMemo|useCallback|useEffect|useRef)\b[^}]*}\s+from\s+['"]react['"]/,
    );

    if (hasReactImport && !hasHooksImport) {
      // If React is imported but hooks aren't, add hooks to the import
      const hooksToImport = [];
      if (usesUseState) hooksToImport.push("useState");
      if (usesUseMemo) hooksToImport.push("useMemo");
      if (usesUseCallback) hooksToImport.push("useCallback");
      if (usesUseEffect) hooksToImport.push("useEffect");
      if (usesUseRef) hooksToImport.push("useRef");

      if (hooksToImport.length > 0) {
        // Replace the React import with one that includes hooks
        const newImport = `import React, { ${
          hooksToImport.join(", ")
        } } from "react";`;
        content = content.replace(
          /import React from ["']react["'];/,
          newImport,
        );

        // Write the updated content back to the file
        fs.writeFileSync(filePath, content);
        console.log(
          `  Added hooks imports to ${filePath}: ${hooksToImport.join(", ")}`,
        );
      }
    }
  }
};

// Main function
const main = () => {
  const files = findFilesWithHooksIssues();
  console.log(`Found ${files.length} files with React hooks issues`);

  files.forEach((file) => {
    fixReactHooksImports(file);
  });

  console.log("Done!");
};

main();
