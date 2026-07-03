import os
import glob
import re

mockups_dir = r"d:\justificadll\Mockups"

# Get all HTML files except gabungan_semua_mockup.html
html_files = [f for f in glob.glob(os.path.join(mockups_dir, "*.html")) 
              if os.path.basename(f) != "gabungan_semua_mockup.html"]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace href="#" with href="javascript:void(0)"
    new_content = content.replace('href="#"', 'href="javascript:void(0)"')
    
    # Also if there are any onclick that set location.href, we might want to disable them but let's stick to href="#" first
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed hrefs in: {os.path.basename(filepath)}")

print("Done fixing hrefs.")
