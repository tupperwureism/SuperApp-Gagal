import os
import glob
import html

# Directory containing mockups
mockup_dir = r"d:\justificadll\Mockups"
output_file = r"d:\justificadll\Mockups\gabungan_semua_mockup.html"

# Get all HTML files
all_html_files = glob.glob(os.path.join(mockup_dir, "*.html"))
# Filter out the output file itself to prevent recursive embedding (inception)
html_files = [f for f in all_html_files if os.path.basename(f) != "gabungan_semua_mockup.html"]
# Sort them roughly (wireframes first, then mockups, or alphabetically)
html_files.sort()

html_content = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Master Gabungan Mockup - Justifica</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #121212;
            color: #ffffff;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .mockup-container {
            margin-bottom: 60px;
            background: #1e1e1e;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .mockup-title {
            font-size: 24px;
            margin-top: 0;
            color: #4facfe;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .mockup-frame {
            width: 100%;
            height: 900px;
            border: 1px solid #333;
            border-radius: 8px;
            background: #fff; /* Reset background for iframe */
        }
    </style>
</head>
<body>
    <h1>Justifica 3-in-1: Master Visual UI/UX</h1>
"""

for filepath in html_files:
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Escape HTML for srcdoc
    escaped_content = html.escape(content, quote=True)
    
    html_content += f"""
    <div class="mockup-container" id="{filename}">
        <h2 class="mockup-title">{filename}</h2>
        <iframe class="mockup-frame" srcdoc="{escaped_content}"></iframe>
    </div>
"""

html_content += """
<script>
    // Memastikan seluruh dokumen, gambar, dan iframe selesai dimuat sempurna
    window.addEventListener('load', () => {
        // Beri jeda 2 detik untuk memastikan rendering selesai
        setTimeout(() => {
            console.log("Semua mockup siap dicetak.");
        }, 2000);
    });
</script>
</body>
</html>
"""

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Master file created at: {output_file}")
