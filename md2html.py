import markdown
import sys
import os

def convert_md_to_html(md_file, html_file):
    with open(md_file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Convert markdown to HTML (using extensions for tables, etc if available)
    try:
        html = markdown.markdown(text, extensions=['tables', 'fenced_code'])
    except:
        html = markdown.markdown(text)
        
    css = """
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; color: #333; }
        h1, h2, h3 { color: #000; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        a { color: #0366d6; text-decoration: none; }
        blockquote { border-left: 4px solid #dfe2e5; padding-left: 15px; color: #6a737d; }
    </style>
    """
    
    full_html = f"<!DOCTYPE html><html><head><meta charset='utf-8'>{css}</head><body>{html}</body></html>"
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print(f"Converted {md_file} to {html_file}")

if __name__ == "__main__":
    convert_md_to_html(sys.argv[1], sys.argv[2])
