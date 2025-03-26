#!/usr/bin/env -S deno run --allow-read --allow-write

// Script to fix import paths in the codebase
// This script fixes import paths based on the following rules:
// 1. Some should be .ts -> .tsx
// 2. Some should omit /components/ part
// 3. Files like "./graphs/linear-algebra/remember-row-column-svg.ts" are moved to src/contents/linear-algebra/basics/*

import { walk } from "https://deno.land/std@0.220.1/fs/walk.ts";
import { join } from "https://deno.land/std@0.220.1/path/mod.ts";

// Function to process a file and fix import paths
async function processFile(filePath: string): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(filePath);
    let modified = false;
    let newContent = content;
    
    // Fix import paths for specific files
    if (filePath.includes("src/components/encyclopedia-of-math.tsx")) {
      newContent = newContent.replace(
        /from ["']\.\/lib\/colors\.ts["']/g,
        'from "@/lib/colors.ts"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import path in ${filePath}: ./lib/colors.ts -> @/lib/colors.ts`);
      }
    }
    
    if (filePath.includes("src/components/layouts.0/article-layout.tsx")) {
      newContent = newContent.replace(
        /from ["']@\/components\/types\.ts["']/g,
        'from "@/types/article.ts"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import path in ${filePath}: @/components/types.ts -> @/types/article.ts`);
      }
    }
    
    if (filePath.includes("src/components/Qed.tsx")) {
      newContent = newContent.replace(
        /from ["']\.\/lib\/fonts\.ts["']/g,
        'from "@/lib/fonts.ts"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import path in ${filePath}: ./lib/fonts.ts -> @/lib/fonts.ts`);
      }
    }
    
    if (filePath.includes("src/components/layouts.0/article-layout.tsx")) {
      newContent = newContent.replace(
        /from ["']\.\.\/types\.ts["']/g,
        'from "@/types/article.ts"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import path in ${filePath}: ../types.ts -> @/types/article.ts`);
      }
    }
    
    if (filePath.includes("src/components/series/series-nav-button.tsx")) {
      newContent = newContent.replace(
        /from ["']\.\/button\.ts["']/g,
        'from "@/components/button.tsx"'
      );
      newContent = newContent.replace(
        /from ["']\.\/types\.ts["']/g,
        'from "@/types/article.ts"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import paths in ${filePath}`);
      }
    }
    
    if (filePath.includes("src/components/layouts.0/def-layout.tsx")) {
      newContent = newContent.replace(
        /from ["']@\/components\/src\/path-breadcrumbs\.tsx["']/g,
        'from "@/components/PathBreadcrumbs.tsx"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import path in ${filePath}: @/components/src/path-breadcrumbs.tsx -> @/components/PathBreadcrumbs.tsx`);
      }
    }
    
    if (filePath.includes("src/components/LinkToPath.tsx")) {
      newContent = newContent.replace(
        /from ["']@\/types\/index\.ts["']/g,
        'from "@/types/article.ts"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import path in ${filePath}: @/types/index.ts -> @/types/article.ts`);
      }
    }
    
    if (filePath.includes("src/components/md-graph.tsx")) {
      newContent = newContent.replace(
        /from ["']\.\/graphs\/linear-algebra\/remember-row-column-svg\.ts["']/g,
        'from "@/contents/linear-algebra/basics/RememberRowColumnSvg.tsx"'
      );
      newContent = newContent.replace(
        /from ["']\.\/graphs\/linear-algebra\/is-row-ech-mat\.ts["']/g,
        'from "@/contents/linear-algebra/basics/IsRowEchMat.tsx"'
      );
      newContent = newContent.replace(
        /from ["']\.\/graphs\/linear-algebra\/is-red-row-ech-mat\.ts["']/g,
        'from "@/contents/linear-algebra/basics/IsRedRowEchMat.tsx"'
      );
      newContent = newContent.replace(
        /from ["']\.\/graphs\/linear-algebra\/gauss-elim\.ts["']/g,
        'from "@/contents/linear-algebra/basics/GaussElim.tsx"'
      );
      if (newContent !== content) {
        modified = true;
        console.log(`  Fixed import paths in ${filePath}`);
      }
    }
    
    // Write the modified content back to the file
    if (modified) {
      await Deno.writeTextFile(filePath, newContent);
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

// Run the main function
console.log("Starting file processing:");
main();
