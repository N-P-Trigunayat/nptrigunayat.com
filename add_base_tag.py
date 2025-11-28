import os
import re

def add_base_tag(html_content):
    # Check if base tag already exists
    if '<base' in html_content:
        return html_content
    
    # Add base tag after <head
    return re.sub(
        r'(<head[^>]*>)',
        r'\1\n    <base href="/public/">',
        html_content,
        flags=re.IGNORECASE
    )

# Add base tag to all HTML files
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = add_base_tag(content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified)
            
            print(f"✓ Updated {filepath}")

print("Done! Base tags added to all HTML files.")
