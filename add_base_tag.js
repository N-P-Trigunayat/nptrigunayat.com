const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Check if base tag already exists
      if (!content.includes('<base')) {
        // Add base tag after <head
        content = content.replace(
          /<head[^>]*>/i,
          match => match + '\n    <base href="/public/">'
        );
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✓ Updated ${filePath}`);
      }
    }
  });
}

walkDir('public');
console.log('Done! Base tags added to all HTML files.');
