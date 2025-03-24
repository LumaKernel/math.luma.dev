const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files with @blogkit imports
const files = execSync('grep -l "@blogkit/" --include="*.ts" --include="*.tsx" -r src')
  .toString()
  .trim()
  .split('\n');

console.log(`Found ${files.length} files with @blogkit imports`);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace @blogkit/blog-components/src/lib/ with @/lib/
  content = content.replace(
    /from\s+['"]@blogkit\/blog-components\/src\/lib\/([^'"]+)['"]/g, 
    'from "@/lib/$1.ts"'
  );
  
  // Replace @blogkit/blog-components/src/ with @/components/
  content = content.replace(
    /from\s+['"]@blogkit\/blog-components\/src\/([^'"]+)['"]/g, 
    'from "@/components/$1.ts"'
  );
  
  // Replace @blogkit/react-component-ssr with @/types
  content = content.replace(
    /from\s+['"]@blogkit\/react-component-ssr['"]/g, 
    'from "@/types/index.ts"'
  );
  
  // Replace @blogkit/next-config/src/main/processor-option with @/types
  content = content.replace(
    /from\s+['"]@blogkit\/next-config\/src\/main\/processor-option['"]/g, 
    'from "@/types/index.ts"'
  );
  
  // Replace import of JSON files with empty array
  content = content.replace(
    /import\s+([^;]+)\s+from\s+['"]@blogkit\/blog-components\/pages-metadata\.json['"]/g, 
    '// $& - Commented for Deno compatibility\nconst $1: any[] = []'
  );
  
  fs.writeFileSync(file, content);
  console.log(`Updated imports in ${file}`);
});

console.log('All @blogkit imports have been updated!');
