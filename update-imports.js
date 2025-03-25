const fs = require("fs");
const path = require("path");

// Load the analysis results
const analysisResults = JSON.parse(
  fs.readFileSync("import-analysis.json", "utf8"),
);

// Function to determine the file extension for a given import path
function determineExtension(importPath, currentFile) {
  // Extract the import path without quotes
  const cleanPath = importPath.replace(/['"](.+)['"]/, "$1");

  // Handle absolute imports starting with @/
  if (cleanPath.startsWith("@/")) {
    const absolutePath = cleanPath.substring(2); // Remove @/

    // Check if the file exists with .ts or .tsx extension
    const possibleExtensions = [".ts", ".tsx"];
    for (const ext of possibleExtensions) {
      const fullPath = path.join("src", absolutePath + ext);
      if (fs.existsSync(fullPath)) {
        return ext;
      }
    }

    // Default to .ts if file not found
    return ".ts";
  }

  // Handle relative imports
  const currentDir = path.dirname(currentFile);
  const relativePath = cleanPath.startsWith("./")
    ? cleanPath.substring(2)
    : cleanPath;

  // Check if the file exists with .ts or .tsx extension
  const possibleExtensions = [".ts", ".tsx"];
  for (const ext of possibleExtensions) {
    const fullPath = path.resolve(currentDir, relativePath + ext);
    if (fs.existsSync(fullPath)) {
      return ext;
    }
  }

  // Default to .ts if file not found
  return ".ts";
}

// Process files that need extension updates
console.log("Updating imports with file extensions...");
analysisResults.needsExtension.forEach((item) => {
  const { file, imports } = item;
  let content = fs.readFileSync(file, "utf8");

  imports.forEach((importLine) => {
    // Skip imports that already have extensions
    if (importLine.match(/\.(ts|tsx|js|jsx)['"]/)) {
      return;
    }

    // Extract the import path
    const importPathMatch = importLine.match(/from\s+['"]([^'"]+)['"]/);
    if (!importPathMatch) return;

    const importPath = importPathMatch[1];

    // Skip external package imports
    if (
      !importPath.startsWith("./") && !importPath.startsWith("../") &&
      !importPath.startsWith("@/")
    ) {
      return;
    }

    // Determine the extension
    const extension = determineExtension(importPath, file);

    // Create the new import line with extension
    const newImportLine = importLine.replace(
      /from\s+(['"])([^'"]+)(['"])/,
      (match, quote1, path, quote2) =>
        `from ${quote1}${path}${extension}${quote2}`,
    );

    // Replace the import line in the content
    content = content.replace(importLine, newImportLine);
  });

  // Write the updated content back to the file
  fs.writeFileSync(file, content);
  console.log(`Updated imports in ${file}`);
});

// Process files that need React import
console.log("\nAdding React import to .tsx files...");
analysisResults.needsReactImport.forEach((file) => {
  // Skip if file doesn't exist
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, "utf8");

  // Skip if already has React import
  if (
    content.includes('import React from "react"') ||
    content.includes("import React from 'react'")
  ) {
    return;
  }

  // Find the position to insert the React import
  // We'll insert it after any "use client" directive and before other imports
  let insertPosition = 0;

  // Check for "use client" directive
  const useClientMatch = content.match(/"use client";?\r?\n/);
  if (useClientMatch) {
    insertPosition = useClientMatch.index + useClientMatch[0].length;
  }

  // Insert the React import
  const reactImport = 'import React from "react";\n';
  content = content.slice(0, insertPosition) + reactImport +
    content.slice(insertPosition);

  // Write the updated content back to the file
  fs.writeFileSync(file, content);
  console.log(`Added React import to ${file}`);
});

console.log("\nAll updates completed!");
